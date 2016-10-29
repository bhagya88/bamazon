// inquirer is used to get user inputs from console
// console.table takes an array of objects  and prints it in table form
// connection gives a connection object to the mysql database
var inquirer = require('inquirer');
var connection = require('./connection.js');
require('console.table');


connection.connect(function(err){
	if(err) throw err;
	//console.log("Connected to database. Connection id :",connection.threadId);

});

//shows contents of the products table
connection.query('SELECT * FROM PRODUCTS',function(err,results){
	console.log("");

	console.table(results);
	getOrder();
});


// gets the information of a product from user
function getOrder(){
	inquirer.prompt([{name:"productID",message:"Enter the itemID of the product you want to purchase: ", validate: naturalNumber},{name:"quantity",message:"Enter quantity: ",validate: naturalNumber}])
		.then(function(answer){

		processOrder(answer.productID,parseInt(answer.quantity));
		
	});

}


// processes order. Gives purchase cost. Also adds to totalSales in departments table for that department.
function processOrder(productID,quantity){
	//new available quantity after customer order
	var availableQuantity,price;
	connection.query('SELECT stockQuantity,price FROM products WHERE ?',{itemID:productID},function(err,results){
		if(err) throw err;
		availableQuantity = results[0].stockQuantity;
		price = parseInt(results[0].price);

		//check enough stock is available to place order
		if(availableQuantity < quantity){
			console.log("Insufficient quantity!");
			connection.end();
		}else{

		var quantityRemaining = availableQuantity - quantity;

		// updates products table(stockQuantity column) and departments table(total Sales column)
				connection.query('UPDATE products,departments SET products.StockQuantity = ? , departments.TotalSales = departments.TotalSales + ? WHERE products.ItemID = ? AND products.DepartmentName = departments.DepartmentName',[quantityRemaining, price*quantity,productID],function(err){
				if(err) throw err;
			
				console.log('The total cost of purchase is $', price*quantity);
				connection.end()
			});
		}

	});
}


// checks if value is natural number
function naturalNumber(value){
	if(parseInt(value)>0){
		return true;
	}
}