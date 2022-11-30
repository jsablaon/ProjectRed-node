const express = require('express')
const router = express.Router()
const randomStoresObject = require('../randomSchema')
const randomItemsObject = require('../randomItemsSchema')
const request = require('request');
const url = require('url');
require('dotenv').config();

/////////////////////////
// target apis
////////////////////////

let storeJson
let storeString

let itemsJson
let itemsString

let dbItemsJson
let dbStoresJson

let returnDbItems = []
let returnDbStores = []

let storeArray = []
let itemsArray = []

let delay = 10

// # 1 - get nearby store data using zipcode to get store id
function getStoreDataApi(zip){
  let options = {
    method: 'GET',
    url: process.env.STORES_URL,
    qs: {place: zip, limit: '20', within: '100'},
    headers: {
      'X-RapidAPI-Key': process.env.TARGET_API_KEY,
      'X-RapidAPI-Host': process.env.TARGET_HOST,
      useQueryString: true
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      storeJson = JSON.parse(body) // string -> json objects
      // console.log(storeJson.data.nearby_stores.stores[0].location_name);
  });
}

// # 2 - search product items using store id and search keyword
function getItemsDataApi(storeId, keyword){
  options = {
    method: 'GET',
    url: process.env.SEARCH_URL,
    qs: {store_id: storeId, keyword: keyword, offset: '0', count: '25'},
    headers: {
      'X-RapidAPI-Key': process.env.TARGET_API_KEY,
      'X-RapidAPI-Host': process.env.TARGET_HOST,
      useQueryString: true
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    itemsJson = JSON.parse(body)
  });
}

/////////////////////////
// end target apis
////////////////////////


/////////////////////////
// mongoose apis
////////////////////////

// get all
router.get('/', (req, res) => {
    res.send('Hello World')
})

// get all stores
// console.log(storeJson.data.nearby_stores.stores[0].location_name);
router.get('/getstores', async (req, res) => {
  let pUserId = url.parse(req.url,true).query['userId']
  let pZip = url.parse(req.url,true).query['zip'] 

    // make a call to db to get all stores
    try {
      dbStoresJson = await randomStoresObject.find({userId: pUserId, zipcode: pZip}).exec()
      console.log("GET SUCCESS")
      setTimeout(function(){
        let sampleJson = JSON.parse(dbStoresJson[0].randomData)
        returnDbStores = [] // clear array for new items
        for (let i = 0; i < sampleJson.data.nearby_stores.stores.length; i++) {
          let storeObject = {}
          // push store objects into returnDbStores
          storeObject = {
            userId: pUserId,
            storeId: sampleJson.data.nearby_stores.stores[i].store_id,
            locationName: sampleJson.data.nearby_stores.stores[i].location_name,
            distance: sampleJson.data.nearby_stores.stores[i].distance,
            phoneNumber: sampleJson.data.nearby_stores.stores[i].main_voice_phone_number,
            address: sampleJson.data.nearby_stores.stores[i].mailing_address
          }
          returnDbStores.push(storeObject)
        }
        res.status(200).send(returnDbStores)
      }, 10)
    } catch(err){
      res.status(500).json({message: err.message})
    }
})

// get all items
router.get('/getitems', async (req, res) => {
  let pStoreId = url.parse(req.url,true).query['storeId']
  let pUserId = url.parse(req.url,true).query['userId'] 
  let pKeyword = url.parse(req.url,true).query['keyword']

  console.log(`storeid = ${pStoreId} | userid = ${pUserId} | keyword = ${pKeyword}`)
  
  // make a call to db to get all items
  try {
    dbItemsJson = await randomItemsObject.find({userId: pUserId, storeId: pStoreId, keyword: pKeyword}).exec()
    console.log("GET SUCCESS")
    console.log(`delay=${delay}`)
    setTimeout(function(){
      let sampleJson = JSON.parse(dbItemsJson[0].randomItemsData)

      // test
      // console.log(sampleJson.data.search.products[0])

      returnDbItems = [] // clear array for new items
      for (let i = 0; i < sampleJson.data.search.products.length; i++) {
        let itemObject = {}
        let testBoolean = (typeof(sampleJson.data.search.products[i].item.enrichment.videos)  != "undefined")

        // test
        // console.log(`=========================price: ${sampleJson.data.search.products[i].price.formatted_current_price}`)

        // push item objects into returnDbItems
        itemObject = {
          userId: pUserId,
          storeId: pStoreId,
          itemId: sampleJson.data.search.products[i].tcin,
          itemName: sampleJson.data.search.products[i].item.product_description.title,
          // itemPrice: sampleJson.data.search.products[i].parent.price.formatted_current_price,
          itemPrice: sampleJson.data.search.products[i].price.formatted_current_price,
          itemImage: sampleJson.data.search.products[i].item.enrichment.images.primary_image_url,
          itemVideo: testBoolean ? sampleJson.data.search.products[i].item.enrichment.videos[0].video_files[0].video_url : "No Video Link"
        }
        returnDbItems.push(itemObject)
      }
      res.status(200).send(returnDbItems)
    }, delay)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

// get one
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})
// create one
router.post('/', (req, res) => {

})

// insert random record to mongo to cache store data
router.post('/savetargetstore', async (req, res) => {
  let zipCode = url.parse(req.url,true).query['zip']
  let userId = url.parse(req.url,true).query['userId']

  console.log(`zipcode=${zipCode} | useriD=${userId}`)

  // check if zipcode and user comco already exist in db
  let found = false;
  storeArray = await randomStoresObject.find({});

  for(let i = 0; i < storeArray.length; i++){
    if(storeArray[i].userId == userId && storeArray[i].zipcode == zipCode){
      found = true;
    }
  }

  if(!found){
    console.log(`no existing user and zipcode combination in db. Adding userId=${userId} & zipcode=${zipCode} to db`)
    getStoreDataApi(zipCode)
    setTimeout(async function() {
        // console.log(storeJson.data.nearby_stores.stores[0].location_name)
        storeString = JSON.stringify(storeJson) // json obj -> string
  
        const doc = new randomStoresObject({
          userId: userId,
          zipcode: zipCode,
          randomData: storeString
        })
      
        try{
          const newDocument = await doc.save()
          res.status(201).json(newDocument)
        } catch(err) {
          res.status(400).json({ message: err.message })
        }
    }, 500)
  } else {
    console.log(`found existing user and zipcode in db. userId=${userId} & zipcode=${zipCode}`)
  }
});

// insert random record to mongo to cache items data
router.post('/savetargetitems', async (req, res) => {
  let storeId = url.parse(req.url,true).query['storeId']
  let keyword = url.parse(req.url,true).query['keyword']
  let userId = url.parse(req.url,true).query['userId']
  // console.log(`storeid = ${storeId}`)
  // console.log(`keyword = ${keyword}`)

  // reset delay to 10
  delay = 10

  // check if userid, storeid and keyword combo already exist in db
  let found = false;
  itemsArray = await randomItemsObject.find({});

  for(let i = 0; i < itemsArray.length; i++){
    if(itemsArray[i].userId == userId && itemsArray[i].storeId == storeId && itemsArray[i].keyword == keyword){
      found = true;
    }
  }

  if(!found){
    delay = 3000
    console.log(`no existing user and zipcode combination in db. Adding userId=${userId} & storeId=${storeId} | keyword=${keyword} to db`)
    getItemsDataApi(storeId, keyword) 
    setTimeout(async function() {
      itemsString = JSON.stringify(itemsJson) // json obj -> string
  
      const doc = new randomItemsObject({
        userId: userId,
        storeId: storeId,
        keyword: keyword,
        randomItemsData: itemsString
      })
    
      try{
        const newDocument = await doc.save()
        res.status(201).json(newDocument)
      } catch(err) {
        res.status(400).json({ message: err.message })
      }
    }, 1000)
  } else {
    console.log(`found existing user, storeid and keyword in db. userId=${userId} & storeId=${storeId} & keyword=${keyword}`)
  }
});

// update one
router.patch('/:id', (req, res) => {

})
// TODO: delete randomitemsobjects table after user session
// TODO: delete randomobjects table after user session
router.delete('/:id', (req, res) => {

})

/////////////////////////
// end mongoose apis
////////////////////////

module.exports = router;