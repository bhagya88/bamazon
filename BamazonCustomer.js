var inquirer = require('inquirer');
var connection = require('./connection.js');
require('console.table');


connection.connect(function(err){
	if(err) throw err;
	//console.log("Connected to database. Connection id :",connection.threadId);

});

connection.query('SELECT * FROM PRODUCTS',function(err,results){
	console.log("");

	console.table(results);
	getOrder();
});

function getOrder(){
	inquirer.prompt([{name:"productID",message:"Enter the itemID of the product you want to purchase: ", validate: naturalNumber},{name:"quantity",message:"Enter quantity: ",validate: naturalNumber}])
		.then(function(answer){

		processOrder(answer.productID,parseInt(answer.quantity));
		
	});

}

function processOrder(productID,quantity){
	//new available quantity after customer order
	var availableQuantity,price;
	connection.query('SELECT stockQuantity,price FROM products WHERE ?',{itemID:productID},function(err,results){
		if(err) throw err;
		availableQuantity = results[0].stockQuantity;
		price = parseInt(results[0].price);
				//check enough stock is available to place order
		if(availableQuantity < quantity){
			console.log("Insufficient quantity!")
		}else{

		var quantityRemaining = availableQuantity - quantity;
		
			

			connection.query('UPDATE products,departments SET products.stockQuantity = ? , departments.totalSales = departments.totalSales + ? WHERE products.itemID = ? AND products.departmentName = departments.departmentName',[quantityRemaining, price*quantity,productID],function(err){
				if(err) throw err;
			
				console.log('The total cost of purchase is $', price*quantity);
				connection.end()
			});
		}

	});


}

function naturalNumber(value){
	if(parseInt(value)>0){
		return true;
	}
}