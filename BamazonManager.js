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
	connection.query('SELECT * FROM PRODUCTS',function(err,results){
		results.forEach(function(row){
			console.log(row.itemID+' | '+row.productName+' | '+row.departmentName+' | '+row.price+' | '+row.stockQuantity);

		});
		connection.end();
	});

}

function viewLowInventory(){
	connection.query('SELECT * FROM PRODUCTS WHERE stockQuantity < ?',50,function(err,results){
	results.forEach(function(row){
		console.log(row.itemID+' | '+row.productName+' | '+row.departmentName+' | '+row.price+' | '+row.stockQuantity);
		
	});
	connection.end();
});


}

function addToInventory(){
	inquirer.prompt([{name:"productID",message:"Enter the id of the product?"},{name:"quantity",message:"Enter quantity: "}])
		.then(function(answer){
		console.log(answer);
		
		connection.query('UPDATE products SET stockQuantity = stockQuantity + ?  WHERE ?',[parseInt(answer.quantity),{itemID:answer.productID}],function(err,results){
				if(err) throw err;
				console.log('Updated products table');
				connection.end();
			});
	

	});
}

function addNewProduct(){
		inquirer.prompt([{name:"product",message:"Enter product name: "},
						{name:"quantity",message:"Enter quantity: "},
						{name:"dept",message:"Enter department name: "},
						{name:"price",message:"Enter price: "}])
		.then(function(answer){
		console.log(answer);
				connection.query('INSERT INTO products SET ?',{productName: answer.product, stockQuantity: answer.quantity, departmentName: answer.dept, price: answer.price},function(err,results){
				if(err) throw err;
				console.log('Added product in table.'); 
				connection.end();	
			});


	});

}