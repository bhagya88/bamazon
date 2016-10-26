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

connection.query('SELECT * FROM PRODUCTS',function(err,results){
	results.forEach(function(row){
		console.log(row.itemID+' | '+row.productName+' | '+row.departmentName+' | '+row.price+' | '+row.stockQuantity);
	});
	getOrder();
});

function getOrder(){
	inquirer.prompt([{name:"product",message:"What product do you want?"},{name:"quantity",message:"Enter quantity: "}])
		.then(function(answer){
		console.log(answer);
		
	});

}
