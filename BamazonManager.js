var inquirer = require('inquirer');
var connection = require('./connection.js');

connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to database. Connection id :",connection.threadId);
	getOption();
});


function getOption(){
	inquirer.prompt([{name:"action",message:"Choose an option.",type: "list",choices :["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]}])
		.then(function(answer){
		console.log(answer);

			switch(answer.action){
				case 'View Products for Sale':
					viewProducts();
					break;
				case 'View Low Inventory':
					viewLowInventory();
					break;
				case 'Add to Inventory':
					addToInventory();
					break;
				case 'Add New Product':
					addNewProduct();
					break;
			}
		});
		
	

}

function viewProducts(){

}

function viewLowInventory(){

}

function addToInventory(){

}

function addNewProduct(){

}