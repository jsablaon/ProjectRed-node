var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const UserModel = require('../userSchema');
const StoreModel = require('../storeSchema');
const CartModel = require('../cartSchema');
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



// create
router.get('/saveuser', function(req, res) {
    var newUser = new UserModel(
        {   
            UserId:1, 
            FName:"John", 
            LName:"Smith", 
            Email:"johnSmith@email.com", 
            Password:"password"
        }
    );

    newUser.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            console.log(`-----> record inserted: ${newUser}`)
            res.send("Data inserted");
        }
    });
});

router.get('/savestore', function(req, res) {
    var newStore = new StoreModel(
        {   
            StoreId:1, 
            StoreName:"Jettsy Store", 
            Items:["Headphones", "Wallet", "Flowers"] 
        }
    );

    newStore.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            console.log(`-----> record inserted: ${newStore}`)
            res.send("Data inserted");
        }
    });
});

router.get('/savecart', function(req, res) {
    var newCart = new CartModel(
        {   
            CartId:1, 
            UserId:1, 
            Items:["Wallet"] 
        }
    );

    newCart.save(function(err, data) {
        if(err) {
            console.log(error);
        }
        else {
            console.log(`-----> record inserted: ${newCart}`)
            res.send("Data inserted");
        }
    });
});

// get
router.get('/findalluser', function(req, res) {
    UserModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });

 router.get('/findallstore', function(req, res) {
    StoreModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });

 router.get('/findallcart', function(req, res) {
    CartModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
 });

// get 1 record
router.get('/findfirstuser', function(req, res) {
    UserModel.findOne({UserId:{$gt:0}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

router.get('/findfirststore', function(req, res) {
    StoreModel.findOne({StoreId:{$gt:0}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

router.get('/findfirstcart', function(req, res) {
    CartModel.findOne({CartId:{$gt:0}}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

// delete
router.get('/deleteuser', function(req, res) {
    UserModel.remove({UserId:1}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(`-----> record deleted.`)
            res.send(data);
        }
    });  
});

router.get('/deletestore', function(req, res) {
    StoreModel.remove({StoreId:1}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(`-----> record deleted. data: ${data}`)
            res.send(data);
        }
    });  
});

router.get('/deletecart', function(req, res) {
    CartModel.remove({CartId:1}, 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(`-----> record deleted. data: ${data}`)
            res.send(data);
        }
    });  
});

module.exports = router;