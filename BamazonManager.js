// inquirer is used to get user inputs from console
// console.table takes an array of objects  and prints it in table form
// connection gives a connection object to the mysql database

var inquirer = require('inquirer');
var connection = require('./connection.js');
require('console.table');


// connect to the database
connection.connect(function(err){
	if(err) throw err;
	//console.log("Connected to database. Connection id :",connection.threadId);

	//get user option the user selected
	getOption();
});

// gives a list of options to choose for user and gets the option choosen
function getOption(){
	inquirer.prompt([{name:"action",message:"Options Available.",type: "list",choices :["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]}])
		.then(function(answer){
		
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


// shows contents of the products table
function viewProducts(){
	connection.query('SELECT * FROM PRODUCTS',function(err,results){
		console.log('');
		console.table(results);
		connection.end();
	});

}

// show contents of the products table where the stock quantity is less than 50
function viewLowInventory(){
	connection.query('SELECT * FROM PRODUCTS WHERE stockQuantity < ?',50,function(err,results){
	console.log('');
	console.table(results);
	connection.end();
	});


}

// adds more items of an existing product in the products table
function addToInventory(){
	inquirer.prompt([{name:"productID",message:"Enter the id of the product?",validate: naturalNumber},{name:"quantity",message:"Enter quantity: ", validate: naturalNumber}])
		.then(function(answer){
				
		connection.query('UPDATE products SET StockQuantity = StockQuantity + ?  WHERE ?',[parseInt(answer.quantity),{ItemID:answer.productID}],function(err,results){
				if(err) throw err;

				console.log('');
				console.log('Updated inventory.');
				console.log('Rows affected :',results.affectedRows);
				connection.end();
			});
	

	});
}


// adds a new product in the products table
function addNewProduct(){
		inquirer.prompt([{name:"product",message:"Enter product name: "},
						{name:"quantity",message:"Enter quantity: ",validate: naturalNumber},
						{name:"dept",message:"Enter department name: "},
						{name:"price",message:"Enter price: ",validate: function(value){
							if(parseFloat(value)>=0){
								return true;
							}
						}
					}])
		.then(function(answer){
		
				connection.query('INSERT INTO products SET ?',{ProductName: answer.product, StockQuantity: answer.quantity, DepartmentName: answer.dept, Price: answer.price},function(err,results){
				if(err) throw err;

				console.log('');
				console.log('Added product.'); 
				console.log('Rows affected :',results.affectedRows);
				connection.end();	
			});


	});

}

// checks if value is a natural number
function naturalNumber(value){
	if(parseInt(value)>0){
		return true;
	}
}