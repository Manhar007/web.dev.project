const express = require('express');
// const path = require('path');
const router = express.Router();
const User = require('../models/user');
const locationController = require('../controllers/locationController');
const taskController = require('../controllers/taskController')
const { addOrUpdateTask, showAllTasks } = require('../controllers/taskController');
const { checkAuth } = require("../middlewares/auth");


// const user = await User.findById(req.userId);
router.get("/", async (req, res) => {
  try {
    const user = req.user; //using middleware to get user

    if (!user||!user._id) {
      return res.status(404).send("no id found");
    }
    const userInfo = {
      name: user.username,
      id: user._id
    };
   // const { tasks, message } = await taskController.showAllTasks(req.user._id);
    const { tasks, message } = await taskController.showAllTasks(req, res, true);
    // res.render('tes', {
    //   user: userInfo,
    //   tasks: tasks,
    //   message: tasks.length > 0 ? null : 'No tasks found'
    // });
    res.render('tes', {
      user: userInfo,
      tasks: tasks,
      message: message
    });
    console.log("Server received user:", userInfo);
    // console.log("Fetched tasks:", tasks);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Internal server error');
  }
});
//Route to post new tasks
router.post('/tasksadd', taskController.addOrUpdateTask);
//route to delete task
//router.delete('/tasksdelete', taskController.deleteTasks);


// Route to fetch the user's last known location
router.get('/location', locationController.showLocation);

// Route to update the user's location
router.post('/location', locationController.updateLocation);






module.exports = router;