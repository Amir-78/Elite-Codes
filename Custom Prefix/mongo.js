const mongoose = require('mongoose');

const guildOptions = mongoose.Schema({

serverID : { type: String, required: true },
prefix : String,
})

module.exports = mongoose.model("config",guildOptions);