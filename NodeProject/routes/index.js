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
  // let found = false;
  // for(var i=0; i < itemArray.length; i++)
  // {
  //   if(itemArray[i].itemId == req.params.id)
  //   {
  //     console.log(itemArray[i]);
  //     found = true;
  //     res.status(200).json(itemArray[i]);
  //   }
  // }
  // if(!found){
  //   res.status(500).send("no such item");
  // }

});

/* UPDATE item */
router.put('/items/:id', function(req, res) {
  var changedItem = new cartItemSchema(req.body);
  userId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {itemId: userId};
    //console.log(filter);
    //console.log(changedItem)
    let currentItem = await cartItemSchema.findOneAndUpdate({"userId": changedItem.userId, "itemId": changedItem.itemId}, changedItem);
    //console.log(currentItem)
    try{
      res.status(200).json(currentItem)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 1)
});


 router.delete('/deleteitems', async (req, res) => {
  let pUserId = url.parse(req.url,true).query['userId'];
  let pItemId = url.parse(req.url,true).query['itemId'];
  let pItemQty = url.parse(req.url,true).query['itemQty'];
  //console.log(pUserId);
  await cartItemSchema.findOneAndDelete({userId: pUserId, itemId: pItemId, itemQty: pItemQty}, function(err) {
    if(!err){
        res.status(500).json("item deleted")
    }
    else{
      res.status(500).json("unable to delete item")
    }
  });
 });

router.post('/items', function(req,res){
  var newItem = new cartItemSchema(req.body);
  console.log(newItem);

  let found = false;




  setTimeout(async function() {
    var items = await cartItemSchema.find({});
      console.log(items);

      const isFound = items.some(element => {
        if (element.userId == newItem.userId && element.itemId == newItem.itemId){
          return true;
        }
        return false;
      });
      //console.log(isFound)
      if(!isFound)
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
  //console.log(itemArray);
  cartSchema.find({}, (err, AllCarts) => {
    if(err){
      res.status(500).send(err);
    }
    res.status(200).json(AllCarts);
  });
});

module.exports = router;
