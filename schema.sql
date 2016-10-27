CREATE DATABASE bamazon;
USE DATABASE bamazon;

CREATE TABLE products(
itemID INTEGER(5) NOT NULL AUTO_INCREMENT,
productName VARCHAR(100),
departmentName VARCHAR(20),
price DECIMAL(10,2),
stockQuantity INT(5),
PRIMARY KEY(itemID)
);
CREATE TABLE departments(
departmentID INTEGER(5) NOT NULL AUTO_INCREMENT,
departmentName VARCHAR(20),
overHeadCosts DECIMAL(10,2),
totalSales DECIMAL(10,2),
PRIMARY KEY(departmentID)
);

INSERT INTO products(productName,departmentName,price,stockQuantity)
VALUES('Mango','Produce','2.00','80');

);

INSERT INTO departments(departmentName,overHeadCosts)
VALUES('Stationary','500');
INSERT INTO departments(departmentName,overHeadCosts)
VALUES('Produce','200');



