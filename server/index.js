const express = require('express');
const cors = require('cors');
const pool = require('./db.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Get all todos

app.get('/todos', async (req, res) => {
    
  try {
    const allTodos = await pool.query('SELECT * FROM todo;');
    res.json(allTodos.rows);
  } catch (err) {
      console.error(err.message);
  }
})

// Get a todo

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;

  try {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1;', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
})

// Create a todo

app.post('/todos', async (req, res) => {
  const { description } = req.body;

  try {
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *;', [description]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a todo 

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2;', [description, id]);
        res.json(updateTodo);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
   const { id } = req.params;

    try {
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1;', [id]);
        res.json(deleteTodo);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));