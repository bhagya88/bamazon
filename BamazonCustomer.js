var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'vidya999',
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to database. Connection id :",connection.threadId);

});

