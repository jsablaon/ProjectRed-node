const express = require('express')
const router = express.Router()
const randomObject = require('../randomSchema')
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
router.get('/getstores', (req, res) => {
  res.send('Hello World')
})

// get all items
router.get('/getitems', async (req, res) => {
  let pStoreId = url.parse(req.url,true).query['storeId']
  let pUserId = url.parse(req.url,true).query['userId'] 
  // make a call to db to get all items
  try {
    dbItemsJson = await randomItemsObject.find({userId: pUserId, storeId: pStoreId}).exec()
    console.log("GET SUCCESS")
    setTimeout(function(){
      let sampleJson = JSON.parse(dbItemsJson[0].randomItemsData)
      returnDbItems = [] // clear array for new items
      for (let i = 0; i < sampleJson.data.search.products.length; i++) {
        let itemObject = {}
        let testBoolean = (typeof(sampleJson.data.search.products[i].item.enrichment.videos)  != "undefined")
        // push item objects into returnDbItems
        itemObject = {
          userId: pUserId,
          storeId: pStoreId,
          itemName: sampleJson.data.search.products[i].item.product_description.title,
          itemPrice: sampleJson.data.search.products[i].parent.price.formatted_current_price,
          itemImage: sampleJson.data.search.products[i].item.enrichment.images.primary_image_url,
          itemVideo: testBoolean ? sampleJson.data.search.products[i].item.enrichment.videos[0].video_files[0].video_url : "No Video Link"
        }
        returnDbItems.push(itemObject)
      }
      // return returnDbItems
      res.status(200).send(returnDbItems)
    }, 2000)
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
  getStoreDataApi(zipCode)
  setTimeout(async function() {
      // console.log(storeJson.data.nearby_stores.stores[0].location_name)
      storeString = JSON.stringify(storeJson) // json obj -> string

      const doc = new randomObject({
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

  }, 5000)

});

// insert random record to mongo to cache items data
router.post('/savetargetitems', async (req, res) => {
  let storeId = url.parse(req.url,true).query['storeId']
  let keyword = url.parse(req.url,true).query['keyword']
  let userId = url.parse(req.url,true).query['userId']
  // console.log(`storeid = ${storeId}`)
  // console.log(`keyword = ${keyword}`)
  getItemsDataApi(storeId, keyword) 
  setTimeout(async function() {
    // console.log(storeJson.data.nearby_stores.stores[0].location_name)
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
  }, 5000)
});

// update one
router.patch('/:id', (req, res) => {

})
// delete one
router.delete('/:id', (req, res) => {

})

/////////////////////////
// end mongoose apis
////////////////////////

module.exports = router;