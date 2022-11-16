var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//const UserModel = require('../userSchema');
const userSchema = require('../userSchema');


require('dotenv').config();


userArray = [
  {UserId: '', Name: '', Email: ''}
];

/* GET user */
router.get('/user/:id', function(req, res) {
  setTimeout(async function() {
    let filter = {UserId: req.params.id};
    console.log(filter);
    let currentUser = await userSchema.findOne(filter);
      
    console.log(currentUser)
    try{
      
      res.status(200).json(currentUser)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 10)

});

/* UPDATE user */
router.put('/user/:id', function(req, res) {
  var changedUser = req.body;
  updateId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {UserId: updateId};
    console.log(filter);
    let currentUser = await userSchema.findOneAndUpdate(filter, changedUser);
    console.log(currentUser)
    try{
      res.status(200).json(currentUser)
    } 
    catch(err) {
      res.status(400).json({ message: err.message })
    }   
  }, 10)

});

//delete user account
router.delete('/user/:id', function (req, res){

  var removedUser = req.body;
  var removeId = req.params.id;
  //console.log(req.params.id);
  let found = false;

  setTimeout(async function() {
    let filter = {UserId: removeId};
    console.log(filter);
    await userSchema.findOneAndDelete(filter, removedUser);
    try{
      res.status(500).json("user deleted")
    } 
    catch(err) {
      res.status(500).json("unable to delete user")
    }   
  }, 10)

});

//Add new user
router.post('/user', function(req,res) {
  var newUser = new userSchema(req.body);
  let found = false;

  setTimeout(async function() {
    userArray = await userSchema.find({});
  
    for(var i=0; i<userArray.length; i++){
      if(userArray[i].UserId == newUser.UserId)
      { 
        found = true;    
      }
    }
    if(!found){
      try{
        const newDocument = await newUser.save()
        res.status(201).json(newDocument)
      } catch(err) {
        res.status(400).json({ message: err.message })
      }
    }
    
  }, 10)
  
});

module.exports = router;
