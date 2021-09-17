const mongoose = require('mongoose');

const guildOptions = mongoose.Schema({

serverID : { type: String, required: true },
antibot : Boolean,
})

module.exports = mongoose.model("config",guildOptions);