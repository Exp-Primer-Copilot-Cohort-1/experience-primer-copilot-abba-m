// create web server
const express = require('express');
const app = express();
// connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
// create schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CommentSchema = new Schema({
  name: String,
  content: String,
  date: Date
});
// create model
const CommentModel = mongoose.model('Comment', CommentSchema);
// create router
const router = express.Router();
router.get('/', (req, res) => {
  CommentModel.find({}, (err, docs) => {
    res.send(docs);
  });
});
router.post('/', (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  const date = new Date();
  const comment = new CommentModel({
    name: name,
    content: content,
    date: date
  });
  comment.save((err, doc) => {
    res.send(doc);
  });
});
// use router
app.use('/comments', router);
// start server
app.listen(3000, () => {
  console.log('Server is running at port 3000.');
});