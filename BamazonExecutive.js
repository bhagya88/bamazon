// inquirer is used to get user inputs from console
// console.table takes an array of objects  and prints it in table form
// connection gives a connection object to the mysql database
var inquirer = require('inquirer');
var connection = require('./connection.js');
require('console.table');


// connect to the database
connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to database. Connection id :",connection.threadId);

	//gets user inputs
	getOption();
});


// gets user inputs
function getOption(){
	inquirer.prompt([{name:"action",message:"Choose an option.",type: "list",choices :["View Product Sales by Department","Create New Department"]}])
		.then(function(answer){
		console.log(answer);

			switch(answer.action){
				case 'View Product Sales by Department':
					viewProductSales();
					break;
				case 'Create New Department':
					createNewDept();
					break;
			}
		});
}

// shows department table contents and totalProfit (TotalSales- OverHeadCosts) for each dept. 
function viewProductSales(){ 
	connection.query('SELECT departmentID,departmentName,overHeadCosts,totalSales,totalSales - OverHeadCosts as totalProfit FROM departments',function(err,results){
		console.table(results);
		connection.end();

	});

}


// Adds a record in the departments table. Fields that are set departmentName and overHeadCosts. 
// Total Sales gets default value of zero. Department ID is auto generated. 
function createNewDept(){
	inquirer.prompt([{name:"dept",message:"Enter Department name: "},
					{name:"costs",message:"Enter OverHeadCosts: ",validate: function(value){
							if(parseFloat(value)>=0){
								return true;
							}
						}
					}])
		.then(function(answer){
	
				connection.query('INSERT INTO departments SET ?',{departmentName: answer.dept, OverHeadCosts: answer.costs},function(err,results){
				if(err) throw err;
				console.log('Added dept in the table.'); 
				connection.end();
				
			});

	});

}

