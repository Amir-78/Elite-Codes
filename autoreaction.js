const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {

console.log(`${client.user.tag} is online!`);

});


/*
Confing
*/

let channelID = "CHANNEL_ID";
let reactions = ["👍", "👎"];

client.on("message", async message => {

if(message.author.bot || message.author.system)return;
if(message.channel.id != channelID)return;

reactions.forEach(async (r) => {

await message.react(r);

})

});

client.login("BOT_TOKEN");