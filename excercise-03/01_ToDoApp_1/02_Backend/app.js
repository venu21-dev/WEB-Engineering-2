const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});