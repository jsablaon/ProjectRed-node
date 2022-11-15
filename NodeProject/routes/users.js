var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const UserModel = require('../userSchema');
const userSchema = require('../userSchema');
const { post } = require('request');

require('dotenv').config();

tempUser = {UserId: '', Name: '', Email: ''}

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
  console.log(req.params.id);
  //if it's there return the user. if not return an error
  if( tempUser.UserId == req.params.id){
    found = true;
    res.status(200).json(tempUser);
  }
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

  //updates user on node
  tempUser = changedUser;
  found = true;
  res.status(200).json(tempUser);


  
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
  if(newUser.UserId != tempUser.UserId){
    tempUser = newUser;
    console.log(tempUser.Name);
    res.status(201).json(newUser)
  }
  
});




module.exports = router;
