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

//Index
router.get('/', (req, res) => {
  res.send('Welcome');
});

//Create DB
router.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Database created...');
  });
});

//Create table
router.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts( id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  })
});

//Insert post 1
router.get('/addpost1', (req, res) => {
  let post = {
    title: 'Post One',
    body: 'This is post number one'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts 1 added...');
  })
});

//Insert post 2
router.get('/addpost2', (req, res) => {
  let post = {
    title: 'Post Two',
    body: 'This is post number one'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts 2 added...');
  })
});

//Select single posts
router.get('/getpost/:id', (req, res) => {
  let sql = 'SELECT * FROM posts WHERE id =' + req.params.id;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
    // res.send('Post fetched...');
  })
});

//Select posts
router.get('/getposts', (req, res) => {
  let sql = 'Select * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
    // res.send('Posts fetched...');
  })
});

//Update post
router.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = 'UPDATE posts SET title =' + "'" + newTitle + "'" + ' WHERE id =' + req.params.id;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Post updated...');
  })
});

//Delete post
router.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = 'DELETE from posts WHERE id =' + req.params.id;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Post deleted...');
  })
});

//Post 
router.post('/addpost', (req, res) => {
  // console.log(req.body);
  let sql = 'INSERT INTO posts SET ?';
  
  //body里的内容付给对象
  
  let post = {
    title: req.body.create_title,
    body: req.body.create_body
  }

  let query = db.query(sql, post, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts 2 added...');
  })
});