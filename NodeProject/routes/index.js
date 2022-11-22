var express = require('express');
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
  { UserId: '123456789', StoreId: 'storestringnumbers', ItemId: '09876389', ItemQty: 1, ItemName: 'banana', ItemPrice: 5.95, ItemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', ItemVideo: '' },
  { UserId: '102125659489827524664', StoreId: '5668556', ItemId: '098763', ItemQty: 1, ItemName: 'bread', ItemPrice: 60.32, ItemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', ItemVideo: '' },
  { UserId: '123456789', StoreId: '348674356845465', ItemId: '5369465526', ItemQty: 1, ItemName: 'rum', ItemPrice: 21.95, ItemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', ItemVideo: '' }
];


/* GET items. */
router.get('/items', function(req, res) {
  console.log(itemArray);
  res.status(200).json(itemArray);
});

/* GET item */
router.get('/items/:id', function(req, res) {
  let found = false;
  for(var i=0; i < itemArray.length; i++)
  {
    if(itemArray[i].ItemId == req.params.id)
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
  var changedItem = req.body;
  console.log(req.params.id);
  let found = false;
  for(var i=0; i < itemArray.length; i++)
  {
    if(itemArray[i].ItemId == req.params.id)
    {
      itemArray[i] = changedItem;
      found = true;
      res.status(200).json(itemArray[i]);
    }
  }
  if(!found){
    res.status(500).send("no such item");
  }
});

router.delete('/items/:id', function (req, res){

    let found = false;
    for(var i=0; i < itemArray.length; i++)
    {
      if( itemArray[i].ItemId == req.params.id)
      {
        console.log(itemArray[i]);
        found = true;
        itemArray.splice(i,1);
        res.status(200).send("delete successful");
      }
    }
    if (found === false)
    {
      res.status(500).send("no such item");
    }
});

router.post('/items', function(req,res){
  var newItem = new cartItemSchema(req.body);
  itemArray.push(newItem);
  res.status(201).json(newItem);

});

hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

module.exports = router;
