var express = require('express');
const cartItemSchema = require('../cartItemSchema');
var router = express.Router();

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

  // setTimeout(async function() {
  //   // let filter = {itemId: userId};
  //   // console.log(filter);
  //   await cartItemSchema.find({}, (err, AllCartItems) => {
  //   if(err){
  //     res.status(500).send(err);
  //   }
  //   res.status(200).json(AllCartItems);
  // });  
  // }, 50)


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
    console.log(currentItem)
    try{
      res.status(200).json(currentItem)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 1)
});

router.delete('/items/:id', function (req, res){


  //var removedItem = new cartItemSchema(req.body);
  var removeId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {itemId: removeId};
    console.log(filter);
    await cartItemSchema.findOneAndDelete(filter, function(err) {
      if(!err){
        res.status(500).json("item deleted")
      }
      else{
        res.status(500).json("unable to delete item")
      }
    });
  }, 1)
});

router.post('/items', function(req,res){
  var newItem = new cartItemSchema(req.body);
  console.log(newItem);

  let found = false;

  setTimeout(async function() {
      try{
        const newDocument = await newItem.save();
        res.status(201).json(newDocument);
      } catch(err) {
        res.status(400).json({ message: err.message })
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

router.post('/items', function(req,res){
  var newItem = new cartItemSchema(req.body);
  console.log(newItem);
  itemArray.push(newItem);

  
  let found = false;

  setTimeout(async function() {
      try{
        const newDocument = await newItem.save();
        res.status(201).json(newDocument);
      } catch(err) {
        res.status(400).json({ message: err.message })
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
  //res.status(200).json(itemArray);
});

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

module.exports = router;
