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
  
  //addCustomer
  router.post('/customers',(req,res) => {
    let sql;
    let body;

    // if(req.body.kind=="business"){
      sql = 'INSERT INTO customers SET ?';
  
      body = {
        name: req.body.name,
        address: req.body.address,
        kind: req.body.kind
      }
      console.log(body);
    let query = db.query(sql, body, (err, results) => {
        if (err) throw err;
        console.log(results);
        //res.send('add new customer success');
    });
      if(req.body.kind=='business'){
        sql= 'INSERT INTO business (customer_id,category,company_income) VALUES (LAST_INSERT_ID(),"'
        +req.body.category+'",'+req.body.company_income+')';
        let query = db.query(sql,(err, results) => {
          if (err) throw err;
          console.log(results);
          res.send('add new customer success');
      });
      }
      if(req.body.kind=='home'){
        sql= 'INSERT INTO home (customer_id,marry_status,gender,age,income) VALUES (LAST_INSERT_ID(),"'
        +req.body.marry_status+'","'+req.body.gender+'",'+req.body.age+','+req.body.income+')';
        let query = db.query(sql,(err, results) => {
          if (err) throw err;
          console.log(results);
          res.send('add new customer success');
      });
      }
  });
  
  //searchCustomer
  //search name
  router.get('/customers',(req,res) => {
    let sql = 'SELECT * FROM customers WHERE name='+req.body.name;
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('search customer success');
    });
  });
  
  //deleteCustomer
  router.delete('/customers/:cid',(req,res) => {
    let sql = 'DELETE FROM customers WHERE customer_id ='+req.params.cid;
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('delete new customer success');
    });
  });
  
  //addOrder
  //登录
  router.post('/orders',(req,res) => {
    let sql = 'INSERT INTO transactions SET ?';
    let body = {
        //这些项里应该有通过登陆自动获取的部分
        order_date: req.body.order_date,
        product_id: req.body.product_id,
        salesperson_id: req.body.salesperson_id,
        customer_id: req.body.customer_id,
        quantity: req.body.quantity,
        store_id: req.body.store_id
    }
    db.query(sql,body,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('add new order success');
    });
  });
  
  //searchOrder
  //登录
  router.get('/orders',(req,res) => {
    let sql = 'SELECT * FROM transactions';
    //自动获取salesperson的id，展示所有该id下的order
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('search order success');
    });
  });
  
  //modifyOrder
  //???????选择性的modify?
  //登录
  router.patch('/orders/:oid',(req,res) => {
    let sql = 'UPDATE transactions SET ? WHERE order_id = '+req.params.oid;
    let body = {
        order_date: req.body.order_date,
        product_id: req.body.product_id,
        salesperson_id: req.body.salesperson_id,
        customer_id: req.body.customer_id,
        quantity: req.body.quantity,
        store_id: req.body.store_id
    }
    //是否可以选择modify一部分，或者是将所有数据导过来，但部分数据维持原状
    //交给前端
    db.query(sql,body,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('modify order success');
    });
  });
  
  //deleteOrder
  //登录
  router.delete('/orders/:oid',(req,res) => {
    let sql = 'DELETE FROM transactions WHERE order_id='+req.params.oid;
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('delete order success');
    });
  });
  
  //searchProduct
  //product_name
  router.get('/products',(req,res) => {
    let sql = 'SELECT * FROM product WHERE product_name="'+req.body.product_name+'"';
   
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('search product success');
    });
  });
  