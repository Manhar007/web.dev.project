const mongoose = require('mongoose');

//  schema for users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
},
{timestamps: true}
);


module.exports = mongoose.model('User', userSchema,'users');
//module.exports = mongoose.model('User', userSchema, 'customCollectionName');
