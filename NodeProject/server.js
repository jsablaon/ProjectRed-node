const express=require('express');
const bodyParser=require('body-parser');
const api = require('./routes/api');
const targetApi = require('./routes/targetApi')
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const port=3000;
const app=express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

// Parses the text as json
app.use(bodyParser.json());
app.use(express.json())

app.use('/api', api);
app.use('/targetApi', targetApi);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;