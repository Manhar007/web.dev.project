const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  // const { username , password } = req.body;
  // await User.create({
  //   username ,
  //   password,
  // });
  // return res.redirect("/main");
  const { username, password } = req.body;
  if (!username || !password) {
      return res.status(400).send('All fields are required!');
  }

  try {
     //if user already present
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).send('Username already exists!');
      }
      //if not a existing a neww user will be created ()
      const newUser = new User({ username, password });
      await newUser.save();
      //setting up the cookie with the user id
      const sessionId = newUser._id.toString();
      setUser(sessionId, newUser._id); // Save the session ID in memory
      res.cookie("uid", sessionId, { httpOnly: true, secure: false }); // Set cookie with MongoDB _id
      return res.redirect('/main');
  } catch (error) {
      console.error('Error saving user to MongoDB:', error);
      res.status(500).send('Internal Server Error');
  }
}

async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
      return res.status(400).send('All fields are required!');
  }
  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).send('Username not found!');
      }
      if (user.password !== password) {
          return res.status(400).send('Wrong password!');
      }
     // Use MongoDB's _id as session ID
    const sessionId = user._id.toString();
    // Save session ID and user ID in memory
    setUser(sessionId, user._id.toString()); 
    // Set cookie
    res.cookie("uid", sessionId, { httpOnly: true, secure: false });  

    return res.redirect("/main");
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
  }
}
module.exports = {handleUserSignup,handleUserLogin,};

