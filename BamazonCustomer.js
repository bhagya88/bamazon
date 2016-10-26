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
	inquirer.prompt([{name:"productID",message:"What product do you want?"},{name:"quantity",message:"Enter quantity: "}])
		.then(function(answer){
		console.log(answer);
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
		console.log('new quantity',quantityRemaining);
			

			connection.query('UPDATE products SET ? WHERE ?',[{stockQuantity:quantityRemaining},{itemID:productID}],function(err){
				if(err) throw err;
				console.log('updated products table');
				console.log('The total cost of purchase is $', price*quantity);
			});
		}

	});


}