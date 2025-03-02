const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { handleUserLogin, handleUserSignup } = require('../controllers/userController');
// Serve the signup and login pages
router.get("/", async (req, res) => {
  res.render('login')
  });
  
router.get('/signup', (req, res) => {
    res.render('sign'); 
});

router.post("/signup",handleUserSignup);
router.post("/login", handleUserLogin);




module.exports = router;
