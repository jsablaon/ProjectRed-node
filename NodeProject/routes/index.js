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

module.exports = router;
