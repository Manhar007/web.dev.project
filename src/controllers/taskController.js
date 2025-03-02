const Task = require('../models/task');
const User = require('../models/user');

// Add or Update Task
exports.addOrUpdateTask = async (req, res) => {
  const { title, description, completionDate, completionTime, location } = req.body;

  if (!title || !completionDate) {
    return res.status(400).json({ error: 'Title and Completion Date are required.' });
  }

  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingTask = await Task.findOne({
      userId,
      title,
      setDate: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    let task, message;
    if (existingTask) {
      existingTask.set(req.body);
      task = await existingTask.save();
      message = 'Task updated successfully!';
    } else {
      // Create a new task
      task = new Task({
        userId,
        title,
        description,
        completionDate,
        completionTime,
        setDate: new Date(),
        location,
      });
      await task.save();
      message = 'Task created successfully!';
    }

    return res.status(200).json({ message, task });
    //return res.redirect('/');
  } catch (error) {
    console.error('Error adding or updating the task:', error);
    res.status(500).json({ error: 'Failed to add or update the task' });
  }
};

// Show all Task    
exports.showAllTasks = async (req, res, returnAsObject = false) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      // if (returnAsObject) return null;
      if (returnAsObject) return { tasks: [], message: 'User not authenticated' };
      return res.status(401).json({ error: 'User not authenticated' });
    }

    //taking tasks from mongodb related to loggedin user
    const tasks = await Task.find({ userId }).sort({ setDate: -1 });
    
    // showing in console for clarity may comment later
    // console.log('Fetched Tasks:', tasks);
    if (tasks.length === 0) {
      return {
        tasks: [],
        message: 'No tasks found',
        userId: userId
      };
    }

    return {
      tasks: tasks,
      message: null,
      userId: userId
    };

   } catch (error) {
    console.error('Error fetching tasks:', error);
    if (returnAsObject) throw error;
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.deleteTasks= async () =>{};


