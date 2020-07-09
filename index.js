//npm uninstall discord.js || npm i discord.js@11.5.1
const Discord = require("discord.js");
const nameyt = require("vid_data");
const bot = new Discord.Client();
const PREFIX = "!" 

const userInstagram = require("user-instagram");

bot.on("ready", message=> {
    console.log(`Longing `)
      
      bot.user.setActivity(`with TeddyBear#7780 || dm for buissnes`, { type: "STREAMING", url: "https://www.twitch.tv/something" })
    
})
bot.on("guildMemberRemove", member => {
 member.ban()
 .then(m => {
   m.unban()
 })
})
 

bot.on('message',async message=>{

    
    
    // const command = args.shift().toLowerCase()


var msg = message

var args = message.content.slice(PREFIX.length).split(/ +/g)
const command = args.shift().toLowerCase()

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
let n = args[1]
let tag = message.mentions.users.first()



 
 
let embed = new  Discord.MessageEmbed()
  
.setDescription(`**Click [${escapeMarkdown(n)}](https://www.instagram.com/${n}) for F4F**\n **${tag}'s** account  | <#707277706928193552> here with in 24h.\nIf you want ur ig be shared here, check <#707277706647044138>`)
.setFooter(`Added by ${message.author.tag}`)
.setTimestamp()

message.guild.channels.cache.get('707704867476603010').send(embed)
  
}
////////////////////////////////

if(message.content.startsWith('!addyt')){
    if(!message.member.hasPermission('ADMINISTRATOR')){
   return;
  }
  let user = message.mentions.users.first()
  if(user === undefined) return message.channel.send('specify a user <mention>')
  
  let url = args[1].toString()
  if(url === null) return message.channel.send('specifu a channel id')
  nameyt.get_channel_id_and_name(url)
  .then(a => {
    let id = a.channel_id
    let name = a.channel_name
    if(name === null)return message.channel.send('channel name not found')
    let embed = new  Discord.MessageEmbed()
   .setDescription(`**Click [${escapeMarkdown(name)}](https://www.youtube.com/channel/${id}) to sub4sub guaranted.**\n ${user}'s channel **|** <#717525159426392074> here in 24h. \n Check <#717462616716345446> to get ur yt channel here.`)
   .setFooter(`Added by ${message.author.tag}`, message.guild.iconURL())
   .setTimestamp()
  
   message.guild.channels.cache.get('717465707503419404').send(embed)
  
  })
}

})

bot.login(process.env.BOT_TOKEN)

