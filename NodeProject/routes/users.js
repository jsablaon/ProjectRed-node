var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//const UserModel = require('../userSchema');
const userSchema = require('../userSchema');
const { post } = require('request');
const request = require('request');
const url = require('url');

require('dotenv').config();


userArray = [
  {UserId: '', Name: '', Email: ''}
];

//tempUser = {UserId: '', Name: '', Email: ''};

// // Connecting to database
// const userName = process.env.MONGODB_USER;
// const password = process.env.MONGODB_PW;
// const database = process.env.MONGODB;

// const connectionString = `mongodb+srv://${userName}:${password}@projectredcluster0.31rilke.mongodb.net/${database}?retryWrites=true&w=majority`;

// const db = (connectionString);
// mongoose.Promise = global.Promise;

// mongoose.connect(db, { useNewUrlParser : true,
// useUnifiedTopology: true }, function(error, database) {
// 	if (error) {
// 		console.log("Error!" + error);
// 	} else {
//         console.log("Connected to DB.");
//     }
// });

/* GET user */
router.get('/user/:id', function(req, res) {

  let found = false;
  //insert code that checks the mongo db for the req.params.id
  //console.log(req.params.id);
  //if it's there return the user. if not return an error
  for(var i=0; i<userArray.length; i++){
    if(userArray[i].UserId == req.params.id)
    {
      found = true;
      res.status(200).json(userArray[i]);
    }
  }

  if(!found){
    res.status(500).send("no such user");
  }

});

/* UPDATE user */
router.put('/user/:id', function(req, res) {
  var changedUser = req.body;
  console.log(req.params.id);
  let found = false;

  //checks for user ID
  for(var i=0; i<userArray.length; i++){
    if(userArray[i].UserId == req.params.id)
    {
      found = true;
      userArray[i] = changedUser;
      res.status(200).json(changedUser);

    }
  }

  //update the mongo user with the req.body


  /* TEMPORARY */
  //updates user on node
  // tempUser = changedUser;
  // found = true;
  // res.status(200).json(tempUser);


  
  if(!found){
    res.status(500).send("no such user");
  }
});

//delete user account
router.delete('/user/:id', function (req, res){

  let found = false;
  //splice the req.params.id from the mongo collection
  for(var i=0; i<userArray.length; i++){
    if(userArray[i].userId == req.params.id){
      found = true;
      userArray.splice(i,1);
      res.status(500).send("user deleted");
    }
  }



  if (found === false)
  {
    res.status(500).send("no such user");
  }

});

//Add new user
router.post('/user', function(req,res) {
  var newUser = new userSchema(req.body);
  let found = false;

  let email = url.parse(req.url,true).query['Email'];
  let userId = url.parse(req.url,true).query['UserId'];
  let name = url.parse(req.url,true).query['Name'];
  console.log(name);
  setTimeout(async function() {
  
    try{
      const newDocument = await newUser.save()
      res.status(201).json(newDocument)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  }, 5000)
  // let oneNewUser = new userSchema(req.body);
  // oneNewUser.save((err, user) => {
  //   if(err) {
  //     res.status(500).send(err);
  //   }
  //   else{
  //     res.status(201).json(user);
  //   }
  // })

  /* TEMPORARY */
  //send newUser to mongo if it doesn't exsist already
  for(var i=0; i<userArray.length; i++){
    if(userArray[i].UserId == newUser.UserId)
    { 
      found = true;    
    }
  }
  if (!found){
    //tempUser = newUser;
    userArray.push(newUser)
    //console.log(tempUser.Name);
    res.status(201).json(newUser);
  }
  
  
  
});

module.exports = router;
