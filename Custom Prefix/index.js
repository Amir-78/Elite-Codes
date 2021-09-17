const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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


client.on('ready', () => {

    console.log(`${client.user.tag} online!`);

});

let defaultPrefix = "!!" // Default Prefix;
let DeveloperID = "ID" //Developer ID;

client.on('messageCreate', async (message) => {

    if (message.member.bot || message.member.system) return;

    let guildConfig = await Config.findOne({ serverID: message.guild.id });

    if (message.content.startsWith(defaultPrefix + "setPrefix")) {

        if (message.author.id != message.guild.ownerId && message.author.id != DeveloperID) return;

        let newPrefix = message.content.split(' ')[1].join(" ");

        if (!newPrefix) {
            message.reply(':x: Write the new prefix!');
        }

        if (guildConfig) {
            guildConfig.prefix = newPrefix;
            guildConfig.save()
        } else {
            //Create data if you want!
        }

    }

    if (guildConfig) {


        if (message.content.startsWith(guildConfig.prefix + "command")) {

            // Your code...

        }

    } else {

        //Create data if you want!

    }

});

client.login("BOT_TOKEN");