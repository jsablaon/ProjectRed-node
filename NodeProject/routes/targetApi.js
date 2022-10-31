const express = require('express')
const router = express.Router()
const randomObject = require('../randomSchema')
const request = require('request');
const url = require('url');
require('dotenv').config();

/////////////////////////
// target apis
////////////////////////

let storeJson
let storeString

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
// options = {
//   method: 'GET',
//   url: process.env.SEARCH_URL,
//   qs: {store_id: '1122', keyword: 'womens shoes', offset: '0', count: '25'},
//   headers: {
//     'X-RapidAPI-Key': process.env.TARGET_API_KEY,
//     'X-RapidAPI-Host': process.env.TARGET_HOST,
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });

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
  getStoreDataApi(zipCode)
  setTimeout(function() {
    // console.log(storeJson.data.nearby_stores.stores[0].location_name)
    storeString = JSON.stringify(storeJson) // json obj -> string
  
    const doc = new randomObject({
      randomData : storeString
    })
  
    try{
      const newDocument = doc.save()
      setTimeout(function() {
        // console.log(newDocument)
      }, 5000)
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