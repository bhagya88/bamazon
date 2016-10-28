#Bmazon 
Amazon like storefront where customers can purchase products bulit using Node Js, MySQL, Inquirer module, and console.table module. 

### Overview

The app will take in orders from customers and deplete stock from the store's inventory. It also trackx product sales across your store's departments and then provide a summary of the highest-grossing departments in the store. 



### Demo

The demo of how this app works is provided here, [click to find demo on github](https://github.com/bhagya88/bamazon/blob/master/BamazonDemo.mp4)

#### Instructions:

### Customer view - BamazonCustomer.js


 * Running this  will file will display all of the items available for sale. Include the ids, names, and prices of products for sale.

 * Then app prompts users with two messages. 
	* The first asks them the ID of the product they would like to buy. 
	* The second message asks them how many units of the product they would like to buy.

* Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request. 
	* If not, the app logs the phrase `Insufficient quantity!`, and then prevents the order from going through.

* However, if the store *does* have enough of the product, application fulfills the customer's order. 
	* This means updating the SQL database to reflect the remaining quantity.
	* Once the update goes through, it shows the customer the total cost of their purchase.



### Manager View - BamazonManager.js

* Running this application will:

	* List a set of menu options: 
		* View Products for Sale 
		* View Low Inventory
		* Add to Inventory
		* Add New Product

	* If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

	* If a manager selects `View Low Inventory`, then it lists all items with a inventory count lower than five.

	* If a manager selects `Add to Inventory`, your app displays a prompt that will let the manager "add more" of any item currently in the store. 

	* If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.



### Executive View - BamazonExecutive.js


* Running this application will list a set of menu options: 
	* View Product Sales by Department 
	* Create New Department

* When an executive selects `View Product Sales by Department`, the app displays a summarized table in their terminal/bash window. Use the table below as a guide. 

	 departmentID  departmentName  overHeadCosts   totalSales    totalProfit  
	-------------- --------------- --------------- ------------- --------------
	 01             Electronics     10000          20000         10000       
	 02             Produce         60000          100000        40000       


* The `totalProfit` is calculated on the fly using the difference between `overheadCosts` and `totalSales`. `TotalProfit` should is not stored in the database. totalProfit is a custom alias for (totalSales-overHeadCosts). 


#### Developed by Bhagya