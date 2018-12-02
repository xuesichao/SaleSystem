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

router.get('/', (req, res) => {
  res.send('Welcome!');
});

// addManager() POST /managers
router.post('/managers', (req, res) => {
  let sql = 'INSERT INTO salespersons SET ?';
  //body里的内容付给对象
  let body = {
    address: req.body.address,
    email: req.body.email,
    job_title: req.body.job_title,
    name: req.body.name,
    salary: req.body.salary,
    store_id: req.body.store_id
  }
  let query = db.query(sql, body, (err, results) => {
    if (err) throw err;
    res.send('Manager added...');
  });
});

// showManager() GET /manager/mid
router.get('/managers', (req, res) => {
  let sql = 'SELECT * FROM salespersons';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// deleteManager() DELETE /managers/mid
// 如何决定manager的id？
router.delete('/managers/:mid', (req, res) => {
  let sql = 'DELETE from salespersons WHERE salepersons_id = ' + req.params.mid;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('Manager deleted...');
  })
});

// addStore() POST /stores
router.post('/stores', (req, res) => {
  let sql = 'INSERT INTO store SET ?';
  let body = {
    address: req.body.address,
    manager: req.body.manager,
    region_id: req.body.region_id,
    salesperson_num: req.body.salesperson_num
  }
  let query = db.query(sql, body, (err, results) => {
    if (err) throw err;
    res.send('Store added...');
  });
});

// showStore() GET /store/stid
router.get('/stores', (req, res) => {
  let sql = 'SELECT * FROM store';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// deleteStore() DELETE /store/stid
router.delete('/stores/:stid', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = 'DELETE from store WHERE store_id =' + req.params.stid;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('Store deleted...');
  });
});

// changeStoreManager() PUT/PATCH /store/stid
// 数据库设计 cascade
// 修改store.manager
// salespers.title也变化

// addProduct() POST /products
router.post('/products', (req, res) => {
  let sql = 'INSERT INTO product SET ?';
  //body里的内容付给对象
  let body = {
    amount: req.body.amount,
    cost: req.body.cost,
    kind: req.body.kind,
    price: req.body.price,
    product_name: req.body.product_name
  }
  let query = db.query(sql, body, (err, results) => {
    if (err) throw err;
    res.send('Product added...');
  });
});

// deleteProduct() DELETE /product/pid
router.delete('/products/:pid', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = 'DELETE from product WHERE product_id =' + req.params.pid;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('Product deleted...');
  });
});

// showProduct() GET /product/pid
router.get('/products', (req, res) => {
  let sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// modifyProduct('type',parameter) PUT/PATCH /product/pid
router.patch('/products/:pid', (req, res) => {
  let sql = 'UPDATE product SET ? WHERE product_id = ' + req.params.pid;
  let body = {
    amount: req.body.amount,
    cost: req.body.cost,
    kind: req.body.kind,
    price: req.body.price,
    product_name: req.body.product_name
  }
  let query = db.query(sql, boday, (err, results) => {
    if (err) throw err;
    res.send('Products updated...');
  })
});