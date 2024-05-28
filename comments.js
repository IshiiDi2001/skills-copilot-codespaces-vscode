// Create web server

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const comments = require('./comments.json');
const users = require('./users.json');

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comment.createdAt = new Date();
  comments.push(comment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  res.status(201).json(comment);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
  res.status(201).json(user);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});

