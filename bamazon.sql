DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

CREATE TABLE products(
item_id INT PRIMARY KEY auto_increment,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(5,2),
stock_quantity INT
);

INSERT INTO bamazon_db.products(product_name,department_name,price,stock_quantity)
VALUES
("Wireless Earbuds","Electronics",28.99,8),
("Wireless Home Security Camera","Electronics",125.36,4),
("Echo Dot","Electronics",33.99,99),
("HP Pavilion Laptop","Computers",518.82,3),
("D-LINK Wi-Fi Router","Computers",199.99,5),
("Fire HD 8 Case","Computers",9.99,35),
("iPhone screen protectors","Cell Phones",7.99,26),
("Dual USB Car iPhone Charger","Cell Phones",5.77,18),
("Bosch Metal Drill Bit", "Set Power & Hand Tools",14.99,12);

INSERT INTO bamazon_db.products(product_name,department_name,price,stock_quantity)
VALUES ("Bissell Steam Mop","Home",69.99,15);

UPDATE bamazon_db.products
SET department_name = "Power & Hand Tools", product_name = "Bosch Metal Drill Bit Set"
WHERE item_id = 9;


SELECT * FROM bamazon_db.products