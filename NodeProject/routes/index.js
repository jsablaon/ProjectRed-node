var express = require('express');
const cartItemSchema = require('../cartItemSchema');
var router = express.Router();

const cartSchema = require('../cartSchema');

// giftArray = [
//   {name: "flowers1", price: "11"},
//   {name: "flowers2", price: "12"},
//   {name: "flowers3", price: "13"},
//   {name: "flowers4", price: "14"},
// ];

// /* GET giftArray */
// router.get('/gifts', function(req, res, next) {
//   console.log(giftArray);
//   res.status(200).json(giftArray);
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



itemArray = [
  { userId: '123456789', storeId: 'storestringnumbers', itemId: '09876389', itemQty: 1, itemName: 'banana', itemPrice: 5.95, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' },
  { userId: '102125659489827524664', storeId: '5668556', itemId: '098763', itemQty: 1, itemName: 'bread', itemPrice: 60.32, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' },
  { userId: '123456789', storeId: '348674356845465', itemId: '5369465526', itemQty: 1, itemName: 'rum', itemPrice: 21.95, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' }
];


/* GET items. */
router.get('/items', function(req, res) {
  //console.log(itemArray);
  cartItemSchema.find({}, (err, AllCartItems) => {
    if(err){
      res.status(500).send(err);
    }
    res.status(200).json(AllCartItems);
  });
  //res.status(200).json(itemArray);
});

/* GET item */
router.get('/items/:id', function(req, res) {
  let found = false;
  for(var i=0; i < itemArray.length; i++)
  {
    if(itemArray[i].itemId == req.params.id)
    {
      console.log(itemArray[i]);
      found = true;
      res.status(200).json(itemArray[i]);
    }
  }
  if(!found){
    res.status(500).send("no such item");
  }

});

/* UPDATE item */
router.put('/items/:id', function(req, res) {
  var changedItem = new cartItemSchema(req.body);
  updateId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {itemId: updateId};
    console.log(filter);
    let currentItem = await cartItemSchema.findOneAndUpdate(filter, changedItem);
    console.log(currentItem)
    try{
      res.status(200).json(currentItem)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 10)
  // var changedItem = new cartItemSchema(req.body);
  // console.log(req.params.id);
  // let found = false;
  // for(var i=0; i < itemArray.length; i++)
  // {
  //   if(itemArray[i].itemId == req.params.id)
  //   {
  //     itemArray[i] = changedItem;
  //     found = true;
  //     res.status(200).json(itemArray[i]);
  //   }
  // }
  // if(!found){
  //   res.status(500).send("no such item");
  // }
});

router.delete('/items/:id', function (req, res){


  var removedItem = new cartItemSchema(req.body);
  var removeId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {itemId: removeId};
    console.log(filter);
    await cartItemSchema.findOneAndDelete(filter, removedItem);
    try{
      res.status(500).json("user deleted")
    } 
    catch(err) {
      res.status(500).json("unable to delete user")
    }   
  }, 10)
    // let found = false;
    // for(var i=0; i < itemArray.length; i++)
    // {
    //   if( itemArray[i].itemId == req.params.id)
    //   {
    //     console.log(itemArray[i]);
    //     found = true;
    //     itemArray.splice(i,1);
    //     res.status(200).send("delete successful");
    //   }
    // }
    // if (found === false)
    // {
    //   res.status(500).send("no such item");
    // }
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

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

module.exports = router;
