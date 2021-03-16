const Discord = require("discord.js");
const prefix = "!"
const ytdl = require("ytdl-core");

const client = new Discord.Client();
const client1 = new Discord.Client();
const queue = new Map();

client.on("message", message => {
  if(message.content.startsWith("!restart")){
    message.channel.send("restarting")
    queue.clear()
    creatMap(client)
    startTrying(client)
    startTrying(client1)
  }

});
client.once("ready", async () => {
  console.log("Ready! "+ client.user.tag);    
    creatMap(client)  
    startTrying(client)    
});
client1.once("ready", () => {
  console.log("Ready! "+ client1.user.tag);
  startTrying(client1)
});





async function extractmessages(client){
  let channel = client.guilds.cache.get("705431974051053578").channels.cache.get("817019889700438036")
  let message = await channel.messages.fetch({limit:100})
  .then(array => {
    let all = ""
    array.forEach(msg=>{      
      channel.send(msg.content)
      msg.delete({timeout: 10})
      all = all+msg.content      
    })
    return all;   
  });
  console.log(message.slice(301))
  return message;
}

async function creatMap(client){
  let get = await extractmessages(client)
  let object = JSON.parse(`[${get.replace(",", "")}]`)

  object.forEach(object => {
        
        const queueContruct = {
          clientID: object.client,  
          guildID: object.guild,  
          textChannelID:  object.textchannel,
          voiceChannelID: object.voicechannel,
          voiceChannel: null,
          connection: null,
          songs: object.songs,
          volume: 5,
          playing: true,
          i: 0
        };
        console.log(queue)
        queue.set(object.client, queueContruct);
        console.log(queue)
  })
  
}



function startTrying(client){

    const interval = setInterval(() => {
        
        if(!queue.get(client.user.id)){         
            let err = {
                clientTag: client.user.tag,
                clientID: client.user.id,
                message: `Cant find queue from get:${client.user.id}`,       
            }
            
            console.log(`------------\nERROR\n${JSON.stringify(err)}\n------------`)
        }else{
            execute(client)
            clearInterval(interval)
        }        
        // execute(queue.get(clientID), client)
    }, 1000)
    
}


async function execute(client) {
    
    let channelQueue = queue.get(client.user.id)
    
    const voiceChannel = client.guilds.cache.get(channelQueue.guildID).channels.cache.get(channelQueue.voiceChannelID);    
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return console.log(
        "I need the permissions to join and speak in your voice channel! || "+client.user.tag
      );
    }  
   
      try {
        console.log("trying to connect!")  
        connecting(client, channelQueue, 0)
      } catch (err) {
        console.log(err);        
      }
    
  }
  async function connecting(client, queue, i){
    let voiceChannel = client.guilds.cache.get(queue.guildID).channels.cache.get(queue.voiceChannelID); 
    try {
        var connection = await voiceChannel.join();
        queue.connection = connection;
        console.log("connecting!")
        play(client, queue, i);

      } catch (err) {
        console.log(err);        
      }
  }
  function play(client, queue, i) { 
    
    let song = queue.songs[i]
    if(i === queue.songs.length-1){
      console.log(0)
      client.leave()
      connecting(client, queue, 0)     
    }
    console.log(song)
    if (!song) {       
        client.guilds.cache.get(queue.guildID).channels.cache.get(queue.textChannelID).send(`No songs on queue to play {clientTag: ${client.user.tag}, clientID: ${client.user.id}}`)        
    }
  
    const dispatcher = queue.connection     
      .play(ytdl(song.url)) 
      .on("finish", () => {
          console.log("next music")
          console.log(i+1)
          if(queue.songs.length === i-1){
            connecting(client, queue, 0);
          }else
          {
            connecting(client, queue, i+1);
          }
        
      })
      .on("error", error => {
        console.log(error)
        
        if(i === queue.songs.length-1){
          connecting(client, queue, 0)
        }else{
          connecting(client, queue, i+1)
        }
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    client.guilds.cache.get(queue.guildID).channels.cache.get(queue.textChannelID).send(`Now playing: **${song.title}**`);
    console.log("playing!")
  }

client.login(process.env.Client);

client1.login(process.env.Client1);
