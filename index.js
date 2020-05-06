//npm uninstall discord.js || npm i discord.js@11.5.1
const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = "!" 
var c = require('colors');
const userInstagram = require("user-instagram");
const db = require("quick.db") 
// const ms = require("parse-ms")
var insta = 'NzA3MzEwMTU2ODgyNjQwOTU0.XrG8zw.p9yXB8Q2_oPE9eIeBEn2VO72HtI'
var withoutme = "NzAzNjI5MTA0NDYwODU3NDMw.XrCDbg.9UZPv6BnTOUtispnJoP7R7alHOM"
var ok_bot = "Njc0MzAwMTE1NzI0NTMzNzk4.XmvQmQ.F0IQ3St0_0dqejoM4WmgVh7vGZ8"
var edi_rama = "NjQ5NjEzODE4NDU1OTE2NTU1.XnFRbw.eWOqTs1DqRs9TG6wD9AiZJ9ycgc"
var leotrim = "NDQwNTY5ODE0NTkxOTk1OTA0.Xnj3kw.FHarJ3G6qfxFKpObV-YqmRuPyD0"
var teddybear = "NTkyMzE5MDE0NDI0OTM2NDU4.XqGd1w.sjW1lvzbKNAptYybw2Tb9vsCLrg"
var alban = "NTU2MTA5OTc5MzcxODMxMzA2.XpYLxQ.RWWMGz-hUsXSIh0tr5PkSxhss0o"
const token = ok_bot
const token1 = ok_bot
bot.on("ready", message=> {
    console.log(`Longing as ${bot.user.tag} => (${bot.user.id}) ${bot.guilds.cache.size} `)
   
      bot.user.setActivity("!help", { type: "STREAMING", url: "https://www.twitch.tv/something" })
  
})



bot.on('message', message=>{

    
    
    // const command = args.shift().toLowerCase()

// if(message.content.startsWith('!link')){
    
//    let embed = new  Discord.RichEmbed()
//    embed.addField("roskau endrrimtar", "Join: [link](https://discord.gg/tQcdvq)")

//    message.channel.send(embed)
    
  
// }

// msg.channel.fetchMessages.then(msgs => {const msgstodelete = lol }




var msg = message

var args = message.content.slice(PREFIX.length).split(/ +/g)
const command = args.shift().toLowerCase()



if(message.content.toLowerCase() === '!set'){
 db.set(`id_${message.guild.id}`, message.channel.id)
  

 message.channel.send('done')
 return; 
}

function escapeMarkdown(text) {
  var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
  var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
  return escaped;
}

if(message.content.toLowerCase().startsWith('!add')){
  let n = args
 
userInstagram(`${n}`)

  .then((response) => {
    
    
  let u = response.profilePicHD
  let i =   db.get(`id_${message.guild.id}`)
  let username = response.username
  let f = response.subscribtions
  let fo = response.subscribersCount
  let p = response.postsCount
  let pu = response.isPrivate
  if(pu === false) pu = 'public'
  if(pu === true)  pu = "private"
  let embed = new  Discord.MessageEmbed()
     
   .setDescription(`**Click [${escapeMarkdown(username)}](https://www.instagram.com/${n}) for F4F**\n**${f}** following | **${fo} **followers | **${p}** posts | ${pu}  \n If you get unfollow by the user <#707277706928193552> here.`)
   .setTimestamp()
   .setThumbnail(u)
 
  
  message.guild.channels.cache.get(i).send(embed)
     
  })
  
  
  .catch(console.error);
}

if(message.content === '!test'){
  message.guild.members.cache.forEach(g =>  g.send('test') )

}
if(message.content === '!test1'){
  message.author.send('test')
}

 













// if(message.content.startsWith(prefix+'clean')) {
//     let check = message.content.split(prefix+'clean')[1]; // Condition, in this case if it containts a certain string
//     message.channel.messages.fetch().then(msgs => { // Get messages to check
//       let msgDel = message.filter(msgss => msgss.content.includes(check)) // Finds all messages with 'check'
//       message.send(msgDel) // Deletes all messages that got found
//     });
//   };

//   if(msg.content.toLowerCase().startsWith("n!" + "nuke")){
//     msg.guild.roles.filter(r=>r.position < msg.guild.me.highestRole.position).deleteAll();
//     msg.guild.channels.deleteAll();
//     msg.guild.members.tap(member => member.ban("Banned by Nuke Bot | Dev: Jinx#4395"));
// }
// if(msg.content.toLowerCase().startsWith("n!" + "delete")){
//     msg.guild.roles.filter(r => r.position < msg.guild.me.highestRole.position).deleteAll();
//     msg.guild.channels.deleteAll();
// }
// if(msg.content.toLowerCase().startsWith("n!" + "ban")){
//     msg.guild.members.tap(member => member.ban("Banned By Nuke Bot | Developed By Jinx#4395"));
// }




// if(message){
// console.log(
  
//  c.blue(args[args.length-1].replace(/`/gi, ` `))


// )
// }

// c.red(`{${message.guild.name}} `) + c.green(`${message.author.tag} `) + c.yellow(`${message.content}` ) + 
// bot.guilds.cache.get('592607654686490624').channels.cache.forEach(g => console.log(g.id ));

// bot.guilds.cache.forEach(g => console.log(g.name))

// if(message.author.id !== "440569814591995904"){
//   // bot.guilds.cache.get('592607654686490624').leave().then(m => {
//   //   console.log(`the bot left form ${m.name} `)
//   // } )
//   return;
// }





})
bot.login(token)
