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
    let sql = 'INSERT INTO customers SET ?';
  
    let post = {
        name: req.body.name,
        address: req.body.address,
        kind: req.body.kind
    }

    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('add new customer success');
    });
  });
  
  //searchCustomer
  //search name
  router.get('/customers',(req,res) => {
    let sql = 'SELECT * FROM customers WHERE name=?';
    let get = {
        name: req.body.name
    }
    db.query(sql,get,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('search customer success');
    });
  });
  
  //deleteCustomer
  router.delete('/customers/:cid',(req,res) => {
    let sql = 'DELETE FROM customers WHERE customer_id='+req.param.cid;
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
    let post = {
        //这些项里应该有通过登陆自动获取的部分
        order_date: req.body.order_date,
        product_id: req.body.product_id,
        salesperson_id: req.body.salesperson_id,
        customer_id: req.body.customer_id,
        quantity: req.body.quantity,
        store_id: req.body.store_id
    }
    db.query(sql,post,(err,result) => {
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
  router.patch('/order/:oid',(req,res) => {
    let sql = 'UPDATE transactions SET ? WHERE order_id = '+req.param.oid;
    //是否可以选择modify一部分，或者是将所有数据导过来，但部分数据维持原状
    db.query(sql,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('modify order success');
    });
  });
  
  //deleteOrder
  //登录
  router.delete('/order/:oid',(req,res) => {
    let sql = 'DELETE FROM transactions WHERE order_id='+req.param.oid;
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
    let sql = 'SELECT * FROM product WHERE product_name=?';
    let get = {
        product_name: req.body.product_name
    }
    db.query(sql,get,(err,result) => {
      if(err){
        throw err;
      }
      console.log(result);
      res.send('search product success');
    });
  });
  