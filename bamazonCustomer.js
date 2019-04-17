var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProduct();
});

function displayProduct() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    var productIds = result.map(function (res) {
      console.log("Product: " + res.product_name + "\nProduct ID: "+res.item_id + "\nPrice: " + res.price+
      "\nDepartment: "+ res.department_name + "\nItems Left: "+res.stock_quantity+"\n------------\n");
    })
    askOrder();
  });
}

function askOrder() {
  inquirer
    .prompt([
      {
      name: "id",
      type: "input",
      message: "What is the ID of the Product you want to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },

    {
      name: "quantity",
      type: "input",
      message: "How much would you like to buy?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }
  
  ])
    .then(function(answer) {
      var id = parseInt(answer.id);
      var quantity = parseInt(answer.quantity)
      const query =  "SELECT * FROM products WHERE item_id = ?"

      connection.query(query, [id], function(err, res) {
        if(res.length === 0){
          console.log("Incorrect ID, please try again.")
         askOrder();
        }

        else {
            if(res[0].stock_quantity < quantity || quantity===0){
              console.log("Insufficient quantity! Please resubmit order.")
              //return;
              askOrder();
            }
        

            else{
              var name = res[0].product_name;
              var custCost = res[0].price * quantity;
              var stockUpdate = res[0].stock_quantity - quantity;
              var qry = "UPDATE products SET stock_quantity = ? WHERE item_id = ?"
              connection.query(qry, [stockUpdate,id], function(err, res) {
                console.log("\n------------\nYour order for " + quantity + " of the " + name + 
                " has been placed! \nTotal Cost: $" + custCost)
            })   
            }
          endConnection();
            
        }
 
    })
    
})
}

function endConnection(){
  connection.end();
}


  