var express = require('express');
var router = express.Router();

giftArray = [
  {name: "flowers1", price: "11"},
  {name: "flowers2", price: "12"},
  {name: "flowers3", price: "13"},
  {name: "flowers4", price: "14"},
];

/* GET giftArray */
router.get('/gifts', function(req, res, next) {
  console.log(giftArray);
  res.status(200).json(giftArray);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



itemArray = [
  { id: 44, name: 'banana', price: 5.95, qty: 1 },
  { id: 65, name: 'bread', price: 7.90, qty: 2 },
  { id: 2, name: 'eggs', price: 8.00, qty: 1 },
  { id: 3, name: 'rye', price: 4.35, qty: 1 },
  { id: 4, name: 'broth', price: 2.00, qty: 3 }
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
    if(itemArray[i].id == req.params.id)
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
    if(itemArray[i].id == req.params.id)
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
      if( itemArray[i].id == req.params.id)
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
