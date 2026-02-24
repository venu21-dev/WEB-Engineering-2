const express = require('express');
const router = express.Router();
const fs = require('fs');

const getTodos = () => {
  const data = fs.readFileSync('todos.json');
  return JSON.parse(data);
};

const saveTodos = (todos) => {
  fs.writeFileSync('todos.json', JSON.stringify(todos));
};

router.get('/', (req, res) => {
  const todos = getTodos().todos;
  res.send(todos);
});

router.post('/', (req, res) => {
  const todos = getTodos();
  const todo = {
    id: todos.id++,
    content: req.body.content,
    completed: false,
    created_at: new Date().toLocaleString()
  };
  todos.todos.push(todo);
  saveTodos(todos);
  res.send(todo);
});

router.put('/:id', (req, res) => {
  const todos = getTodos();
  const todo = todos.todos.find(todo => todo.id == req.params.id);
  Object.assign(todo, { content: req.body.content, completed: req.body.completed });
  saveTodos(todos);
  res.send(todo);
});

router.delete('/:id', (req, res) => {
  const todos = getTodos();
  const index = todos.todos.findIndex(todo => todo.id == req.params.id);
  todos.todos.splice(index, 1);
  saveTodos(todos);
  res.sendStatus(200);
});

module.exports = router;