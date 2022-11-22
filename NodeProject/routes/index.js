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
  { userId: '123456789', storeId: 'storestringnumbers', itemId: '09876389', itemQty: 1, itemName: 'banana', itemPrice: 5.95, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' },
  { userId: '102125659489827524664', storeId: '5668556', itemId: '098763', itemQty: 1, itemName: 'bread', itemPrice: 60.32, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' },
  { userId: '123456789', storeId: '348674356845465', itemId: '5369465526', itemQty: 1, itemName: 'rum', itemPrice: 21.95, itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg', itemVideo: '' }
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
  var changedItem = req.body;
  console.log(req.params.id);
  let found = false;
  for(var i=0; i < itemArray.length; i++)
  {
    if(itemArray[i].itemId == req.params.id)
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
      if( itemArray[i].itemId == req.params.id)
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

module.exports = router;
