const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const TodoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.render('todo', { todos: todos });
});

app.post('/todos', (req, res) => {
    const newTodo = new Todo({ text: req.body.text, completed: false });
    newTodo.save().then(() => res.redirect('/todos'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});