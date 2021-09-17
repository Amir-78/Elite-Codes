const Eris = require('eris');
const bot = new Eris("BOT_TOKEN");
const mongoose = require('mongoose');

const Config = require('./mongo.js');

mongoose.connect('mongodb://localhost/config', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dbb = mongoose.connection;

dbb.on('error', console.error.bind(console, 'connection error:'));

dbb.once('open', function () {
  console.log("Database connected!");
});

bot.on("ready", () => {
  console.log("Ready!");
});


bot.on("messageCreate", (msg) => {
  if(msg.content === "!ping") {
    bot.createMessage(msg.channel.id, "Pong!");
  }
});

bot.on("guildMemberAdd", async (guild, member) => {

    if(member.bot){

        let guildConfig = await Config.findOne({serverID: guild.id});

        if(guildConfig){
            if(guildConfig.antibot){
                member.kick('Anti-Bot');
            }
        }else{

            //Create Config if you want!
        }

    }

});

bot.connect();