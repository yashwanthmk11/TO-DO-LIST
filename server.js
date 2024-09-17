const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express
const app = express();
app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Task Schema and Model
const TaskSchema = new mongoose.Schema({
    description: String
});
const Task = mongoose.model('Task', TaskSchema);

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const newTask = new Task({
        description: req.body.description
    });
    await newTask.save();
    res.json(newTask);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
