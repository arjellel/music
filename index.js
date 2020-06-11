//npm uninstall discord.js || npm i discord.js@11.5.1
const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = "!" 
var c = require('colors');
const userInstagram = require("user-instagram");
const db = require("quick.db") 
const ytScraper = require("yt-scraper")

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



if(message.content === '!setChannelig'){
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
if(message.content.toLowerCase().startsWith('!addig')){
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
if(message.content === '!setChannelyt'){
  if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
db.set(`yt_channel_${message.guild.id}`, message.channel.id)
return message.channel.send('done');



}

////////////////////////////////
if(message.content.startsWith('!addyt')){
  if(!message.member.hasPermission('ADMINISTRATOR')){
    return;
   }
  
 let channelUrl = `https://www.youtube.com/channel/${args[1]}`
  ytScraper.channelInfo(channelUrl).then((response) => {
    let tag = message.mentions.users.first()
    let id = response.id
    let subs = response.approx.subscribers
    let viwes = response.approx.views	
    let username = response.name
    let joined = response.joined
message.channel.send(args[1])
    let embed = new  Discord.MessageEmbed()
  
.setDescription(`**Click [${escapeMarkdown(username)}](https://www.youtube.com/channel/${id}) for sub4sub**\n**${subs}** subcribers |  **${viwes} **views  |  **${tag}'s** channel  | \nCreated at ${joined}\n *If he does not subcribe <@717525159426392074> here.*\n*If you want ur channel to be shared here, check <#717462616716345446>*`)
 .setFooter(`Added by ${message.author.tag}`, message.guild.iconURL())
.setTimestamp()
.setThumbnail(message.guild.iconURL())
let i = db.get(`yt_channel_${message.guild.id}`)

message.guild.channels.cache.get(i).send(embed)
    })

}



if(message.content === '!help'){
  
if(!message.member.hasPermission('ADMINISTRATOR')){
 return;
}
  message.channel.send('```diff\n+!setChannelig <u need to be on the channel u want> , !addig <instagram name>\n+!setChannelyt <u need to be on the channel u want>\n!addyt <youtube channel name>\n```')
    
}
    if(message.content === '!members'){
        message.channel.send(message.guild.members.cache.size)
    }
})


bot.login(process.env.BOT_TOKEN)

