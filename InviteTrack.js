// Code By Amir! <3
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_INVITES,
  ]
});

// Config

let LogChannelID = "ID";
let wlcMessage = "{member}, {tag}, {inviter}, {uses}, {code}"
//{member}, {tag}, {inviter}, {uses}, {code};

//;

client.once('ready', () => {

  //create Collection
  const gInvites = new Discord.Collection();

  client.invites = gInvites;

  console.log(`${client.user.tag} is online!`);

  //get All bot guilds
  for (let guild of client.guilds.cache.values()) {

//https://discord.gg/mQyRTdN9 << JOIN <<<

    //fetch for guild invites
    guild.invites.fetch().then(invite => {

      // set Guild Invites
      client.invites.set(guild.id, invite);

    }).catch(error => {

      console.log(error);

    })

  }

})

// on InviteCreate Event;
client.on('inviteCreate', async (invite) => {

  // add new invites to guild collection;
  client.invites.set(invite.guild.id, await invite.guild.invites.fetch());

});

//on Member Add Event;

client.on('guildMemberAdd', async (member) => {

  let guild = member.guild;

  if (member.user.bot) return;

  //get Cached invites for member guild;
  const cInvites = client.invites.get(guild.id);

  //get new Invites;
  let nInvites = await guild.invites.fetch();

//get the invite code;
  const theInvite = await nInvites.find(invite =>{
 return cInvites.get(invite.code).uses == invite.uses;

  });

  //set new Invites;
  await client.invites.set(guild.id, nInvites);

//invite Info

const {code, uses, inviter} = theInvite; 


//get Log Channel;
let serverLog = guild.channels.cache.get(LogChannelID);

//if log ex!
if(serverLog){
  serverLog.send({content: wlcMessage
  .replace(/{member}/, `${member}`)
  .replace(/{tag}/, `${member.user.tag}`)
  .replace(/{code}/, `${code}`)
  .replace(/{inviter}/, `${inviter}`)
  .replace(/{uses}/, `${uses}`)
  })
}

});

client.login('TOKEN');


// Code By Amir! <3