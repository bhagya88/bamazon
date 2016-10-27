var inquirer = require('inquirer');
var connection = require('./connection.js');

connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to database. Connection id :",connection.threadId);
	getOption();
});



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


function viewProductSales(){
	connection.query('SELECT * FROM departments',function(err,results){
		console.log(results);

	});

}

function createNewDept(){
	inquirer.prompt([{name:"dept",message:"Enter Department name: "},
						{name:"costs",message:"Enter OverHeadCosts: "}])
		.then(function(answer){
		console.log(answer);
				connection.query('INSERT INTO departments SET ?',{departmentName: answer.dept, OverHeadCosts: answer.costs},function(err,results){
				if(err) throw err;
				console.log('Added dept in the table.'); 
				
			});

	});

