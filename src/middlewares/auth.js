const { getUser } = require("../service/auth"); 

async function checkAuth(req, res, next) {
  const sessionId = req.cookies.uid; // Extract the user session ID (uid/named by me not using special uuid) from cookies

  if (!sessionId) {
    return res.redirect("/"); // Redirect to login if no session ID is found
  }

  try {
    // Retrieve the user from the session using the getUser function
    const user  = await getUser(sessionId); 

    if (!user) {
      return res.redirect("/");
    }

    // Attach the user object to the request so it can be used in the route
    req.user = user;
    next();
  } catch (err) {
    console.error("Error validating user:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { checkAuth };

