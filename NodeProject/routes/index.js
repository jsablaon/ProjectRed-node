var express = require('express');
const cartItemSchema = require('../cartItemSchema');
var router = express.Router();
const url = require('url');
require('dotenv').config();

const cartSchema = require('../cartSchema');

/* GET items. */
router.get('/items', function(req, res) {
  //console.log(itemArray);
  cartItemSchema.find({}, (err, AllCartItems) => {
    if(err){
      res.status(500).send(err);
    }
    res.status(200).json(AllCartItems);
  });
});

/* GET item */
router.get('/items/:id', function(req, res) {
  

});

/* UPDATE item */
router.put('/items/:id', function(req, res) {
  var changedItem = new cartItemSchema(req.body);

  setTimeout(async function() {
    let currentItem = await cartItemSchema.findOneAndUpdate({"userId": changedItem.userId, "itemId": changedItem.itemId, "storeId": changedItem.storeId}, changedItem);
    try{
      res.status(200).json(currentItem)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 1)
});

//delete item
router.delete('/deleteitems', async (req, res) => {
  let pUserId = url.parse(req.url,true).query['userId'];
  let pItemId = url.parse(req.url,true).query['itemId'];
  let pStoreId = url.parse(req.url,true).query['storeId'];

  await cartItemSchema.findOneAndDelete({"userId": pUserId, "itemId": pItemId, "storeId": pStoreId});
});

 //Add item to cart
router.post('/items', function(req,res){
  var newItem = new cartItemSchema(req.body);

  setTimeout(async function() {
    var items = await cartItemSchema.find({"userId": newItem.userId, "itemId": newItem.itemId, "storeId": newItem.storeId});
      if(items.length == 0)
      {
        try{
          const newDocument = await newItem.save();
          res.status(201).json(newDocument);
        } catch(err) {
          res.status(400).json({ message: err.message })
        }
      }    
  }, 10)
});

//Add cart
router.post('/cart', function(req,res){
  var newCart = new cartSchema(req.body);

  setTimeout(async function() {
    try{
      const newDocument = await newCart.save();
      res.status(201).json(newDocument);
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  }, 10)
});

/* GET carts. */
router.get('/cart', function(req, res) {
  cartSchema.find({}, (err, AllCarts) => {
    if(err){
      res.status(500).send(err);
    }
    res.status(200).json(AllCarts);
  });
});

module.exports = router;
