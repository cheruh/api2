const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/tasksModel'); // Import the Task model

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection URI (replace <username>, <password>, and <dbname> with your actual credentials and database name)
const mongoURI = 'mongodb+srv://cheruh:xINzvEe07Ol71bAV@reddii.o3j7ger.mongodb.net/?retryWrites=true&w=majority&appName=reddii';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define routes

// Route to get all tasks
app.get('/models/tasksModel', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get tasks by Id
app.get('/models/tasksModel/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const tasks = await Task.findById(id);
    res.json(tasks);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to add a new task
app.post('/models/tasksModel', async (req, res) => {
    try{
      const task = await Task.create(req.body)
      res.status(200).json(task);

    }catch (error) {
      console.log(message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Route to update a task
app.put('/models/tasksModel/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a task
app.delete('/models/tasksModel/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port on port 8080")
});
