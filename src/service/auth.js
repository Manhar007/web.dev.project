const sessions = new Map();
const User = require("../models/user");
// Save a session
function setUser(sessionId, userId) {
  sessions.set(sessionId, userId);
}
// Retrieve a user by session ID
 async function getUser(sessionId) {
//   return sessions.get(sessionId);
  const userId = sessions.get(sessionId);
  if (!userId) return null;
  // fetching from database
  return await User.findById(userId);
}

//   //clear a session may implement on later stage
// function clearUser(sessionId) {
//   sessions.delete(sessionId);
// }

//module.exports = { setUser, getUser, clearUser };
module.exports = { setUser, getUser };
