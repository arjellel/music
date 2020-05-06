//npm uninstall discord.js || npm i discord.js@11.5.1
const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = "!" 
var c = require('colors');
const userInstagram = require("user-instagram");
const db = require("quick.db") 

bot.on("ready", message=> {
    console.log(`Longing as ${bot.user.tag} => (${bot.user.id}) ${bot.guilds.cache.size} `)
      
      bot.user.setActivity(`on Instagram`, { type: "STREAMING", url: "https://www.twitch.tv/something" })
  
})
bot.on("guildMemberAdd", (member) => {
let a = bot.guilds.cache.get('699372975496888400').members.cache.get(member.id)
a.kick()
console.log(a.tag)
});




bot.on('message', message=>{

    
    
    // const command = args.shift().toLowerCase()


var msg = message

var args = message.content.slice(PREFIX.length).split(/ +/g)
const command = args.shift().toLowerCase()


////////////////////////////////
if(message.content === '!setChannel'){
  if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
db.set(`id_${message.guild.id}`, message.channel.id)
return message.channel.send('done');



}
////////////////////////////////
function escapeMarkdown(text) {
var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
return escaped;
}
////////////////////////////////
if(message.content.toLowerCase().startsWith('!add')){
  if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
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
  
.setDescription(`**Click [${escapeMarkdown(username)}](https://www.instagram.com/${n}) for F4F**\n**${f}** following  |  **${fo} **followers  |  **${p}** posts  |  ${pu} \n If you get unfollow by the user <#707277706928193552> here.\nIf you want ur ig be shared here, check <#707277706647044138>`)
 .setFooter(`Added by ${message.author.tag}`)
.setTimestamp()
.setThumbnail(u)


message.guild.channels.cache.get(i).send(embed)
  
})


.catch(console.error);
}


////////////////////////////////
if(message.content.startsWith('!dmall')){
    
 if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
    let a = message.content.split('!dmall')
  message.guild.members.cache.forEach(g =>  g.send(a) )

  message.channel.send('Done!')

}
////////////////////////////////

if(message.content === '!help'){
  
if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
  message.channel.send('```diff\n+!setChannel <u need to be on the channel u want> , !add <instagram name>\n+!setStatus\n+!setdmall <the message>, !dmall <u need to be on the server u want>\n```')
    
}
})
bot.login(process.env.BOT_TOKEN)
