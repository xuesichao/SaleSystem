const express = require('express');
const mysql = require('mysql');
const router = express.Router();

module.exports = router
//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hmy0115',
    database: 'database_project'
  });
  
  
  //sales  of the products
  router.get('/productssales',(req,res) => {
    let sql = 'SELECT product_name,sum(quantity) FROM transactions,product ' 
            +'WHERE transactions.product_id=product.product_id '
            +'GROUP BY transactions.product_id ';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(result);
    });
  });

  //profit of the products
  router.get('/productsprofit',(req,res) => {
    let sql = 'SELECT product_name,(price-cost) as profit FROM `product`';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(result);
    });
  });

  //top product categories
  router.get('/topproduct',(req,res) => {
    let sql = 'SELECT product_name,sum(quantity) FROM transactions,product '
            +'WHERE transactions.product_id=product.product_id '
            +'GROUP BY transactions.product_id '
            +'ORDER BY sum(quantity) DESC limit 10 ';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(result);
    });
  });

  
  //various regions compare by sales volumn
  router.get('/regionsales',(req,res) => {
    let sql = 'SELECT region_name, sum(transactions.quantity) '
            +'FROM transactions,store,region '
            +'WHERE transactions.store_id=store.store_id '
            +'and store.region_id=region.region_id '
            +'GROUP BY region_name';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(result);
    });
  });


  //which business are buying given products the most
  router.get('/productbusiness',(req,res) => {
    let sql = 'SELECT business.category,sum(transactions.quantity) '
            +'FROM `transactions`,business '
            +'WHERE transactions.customer_id=business.customer_id '
            +'and transactions.product_id='+req.body.product_id
            +' GROUP BY business.category '
            +'order by sum(transactions.quantity) desc limit 1';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(result);
    });
  });