// Create web server
// Run server
// Create a new comment
// Read comments
// Update a comment
// Delete a comment

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const commentsPath = 'comments.json';

app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    comment.id = comments.length + 1;
    comments.push(comment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Comment created');
    });
  });
});

app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = req.body;
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
      res.status(404).send('Comment not found');
      return;
    }
    comments[index] = comment;
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Comment updated');
    });
  });
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500));