var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const UserModel = require('../userSchema');

require('dotenv').config();

// Connecting to database
const userName = process.env.MONGODB_USER
const password = process.env.MONGODB_PW
const database = process.env.MONGODB

const connectionString = `mongodb+srv://${userName}:${password}@projectredcluster0.31rilke.mongodb.net/${database}?retryWrites=true&w=majority`;

const db = (connectionString);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error, database) {
	if (error) {
		console.log("Error!" + error);
	} else {
        console.log("Connected to DB.")
    }
});

/* GET user */
router.get('/user/:id', function(req, res) {
  let found = false;
  //insert code that checks the mongo db for the req.params.id

  //if it's there return the user. if not return an error

  if(!found){
    res.status(500).send("no such item");
  }

});

/* UPDATE user */
router.put('/user/:id', function(req, res) {
  var changedUser = req.body;
  console.log(req.params.id);
  let found = false;

  //checks for user ID

  //update the mongo user with the req.body

  
  if(!found){
    res.status(500).send("no such user");
  }
});

router.delete('/user/:id', function (req, res){

  let found = false;
  //splice the req.params.id from the mongo collection

  if (found === false)
  {
    res.status(500).send("no such item");
  }

});

router.post('/user', function(req,res) {
  var newUser = (req.body);
  //send newUser to mongo

});




module.exports = router;
