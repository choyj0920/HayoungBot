# ๐HayoungBot
####  ***Discord bot for streaming music and other funtion***






### development environment

- Node  version 17.0
- discord.js  v13  ( ๐ Requires node 16.6 or higher)
- Visual studio code & discord



### ๋ค์์ ๊ธฐ๋ฅ์ ๊ฐ์ง๋ ๋์ฝ๋ด

<img src="README.assets/image-20211102093937334.png" alt="image-20211102093937334" width="500" />



##  Contents


- [โCurriculum](#curriculum)
    - [21/10/29](#211029)
    - [21/11/ 1](#2111-1)
    - [21/11/ 2](#2111-2)
- [Description](#description)
  - [Discord /๋ช๋ น์ด ์๋ ๋ฐฉ์](#discord-๋ช๋ น์ด-์๋-๋ฐฉ์)
  - [deploy-commands.js](#deploy-commandsjs)
    - [โ js script to declare commands to the server](#-js-script-to-declare-commands-to-the-server)
  - [Discord bot init](#discord-bot-init)
  - [Discord command](#discord-command)
    - [js file inside "./command"](#js-file-inside-command)
  - [๐ฌDiscord bot  -send message](#discord-bot---send-message)
  - [๐คDiscord bot Embed Message](#discord-bot-embed-message)
  - [#๏ธโฃ Music command](#๏ธโฃ-music-command)
    - [Library](#library)
    - [Variable](#variable)
    - [function](#function)
      - [Check the voice channel to which the sender belongs](#check-the-voice-channel-to-which-the-sender-belongs)
      - [โฟ music search](#-music-search)
      - [โถ Play music in Voice Channel](#-play-music-in-voice-channel)
    - [๐ Execution according to command](#-execution-according-to-command)





# โCurriculum



### 21/10/29 

- #### Create discord bot - discord develop portal 

- #### Get bot token , Invite bot to server(guild)

- #### Install node libray for control discord bot

  - โโโ @discordjs/builders@0.7.0
  - โโโ @discordjs/opus@0.6.0
  - โโโ @discordjs/rest@0.1.0-canary.0
  - โโโ @discordjs/voice@0.6.0
  - โโโ discord-api-types@0.24.0
  - โโโ discord.js@13.2.0
  - โโโ events@3.3.0
  - โโโ ffmpeg-static@4.4.0
  - โโโ ffmpeg@0.0.4
  - โโโ libsodium-wrappers@0.7.9
  - โโโ yt-search@2.10.2
  - โโโ ytdl-core@4.9.1

- #### Design command 

  - /server , /ping, /user
  - /๋ธ๋ (์ฌ์,๋ฃจํ ํ๋ ์ด๋ฆฌ์คํธ,๊ฑด๋๋ฐ๊ธฐ,์ข๋ฃ)

- #### deploy-commands.js





### 21/11/ 1

- #### โถ/๋ธ๋ ์ฌ์ ๊ตฌํ[code](#-play-music-in-voice-channel)

- #### โน/๋ธ๋ ์ข๋ฃ

- #### โ/๋ธ๋ ํ๋ ์ด๋ฆฌ์คํธ (ํ์ธ)

- #### โ/๋ธ๋ ํ๋ ์ด๋ฆฌ์คํธ ์ญ์ 



### 21/11/ 2

- #### code optimization, Solve BUG

- #### markdown

- #### GIT





# Description

## Discord /๋ช๋ น์ด ์๋ ๋ฐฉ์

- ####  /command ๊ณผ ๊ฐ์ ์ฌ๋์ ์ปค๋งจ๋๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด ์์์ ๋ช๋ น์ด๋ค์ restํต์ ์ผ๋ก ์๋ฒ(๊ธธ๋)์ ๋ช๋ น์ด๋ฅผ ๋ฑ๋กํด๋๊ณ   ([deploy-commands.js](#deploy-commandsjs))

- #### Discord ์๋ฒ์์ ๊ทธ ๋ช๋ น์ด๋ฅผ ์๋ ฅ ํ  ์ ๋ด interaction์ ํด๋น ๋ช๋ น์ด ์ด๋ฆ๊ณผ ํจ๊ป ๋ฉ์์ง๊ฐ ๋ฐ์ ๋ ์ฑ๋ ,์ฌ์ฉ์๋ฑ์ ์ ๋ณด๊ฐ ์์ ๋๋ค.  

- #### Interaction ๋ด๋ถ์์ ๋ช๋ น์ด์ ๋ฐ๋ผ ๋ฐ๋ก ๋์ํ๊ฑฐ๋ command ๊ฐ์ฒด๋ฅผ ์ฐพ์ ํจ์ ์คํ [Define Interaction](define-interaction)





## deploy-commands.js

### โ js script to declare commands to the server

```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId,token } = require('./config.json'); //get data

const commands = [ // Slash commands ์ ์ธ   
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('๋์๋ง').setDescription('๋์๋ง ์๋ ค์ค'),
	
    // ๊ฐ์ ธ์ฌ๋ ๋ค๋ฅธ ๋ฐ์ดํฐ๋ ๊ฐ์ ธ์ค๊ธฐ ์ํ command option ์ถ๊ฐ
	new SlashCommandBuilder().setName('๋ธ๋').setDescription('์ ํ๋ธ์์ ๋ธ๋๋ฅผ ์ฐพ๊ณ  ์ฌ์ํ๋ ๊ธฐ๋ฅ์ ์คํ์ํค๋ ๋ช๋ น์ด')
	.addStringOption(option => option.setName("์ต์").setDescription("์๋ธ ๋ช๋ น์ด").setRequired(true))]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

// Declare commands to server
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
```



## Discord bot init

### discord bot ์คํ์ ์ฒ์ ๋ถ๋ถ

```javascript
const { Client, Intents, DiscordAPIError} = require('discord.js');
const {Collection}=require('discord.js')
const { token } = require('./config.json');
const Discord = require('discord.js')

//Permission settings allowed by the bot
//Only permissions allowed in the server (guild) can be set in advance
myIntents =new Intents() 
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);

// Client ๋ด ๊ฐ์ฒด
const client = new Client({ intents:myIntents });
client.commands=new Collection()

// Import the commands to be registered in the bot 
// -----a file stored in "./commands" as in the discord.js docu example
const fs=require('fs')
const commandFiles=fs.readdirSync('./commands').filter(file=>file.endsWith('.js'))
for(const file of commandFiles){
	console.log(file)
	const command=require(`./commands/${file}`)
	client.commands.set(command.name,command)
}

```

### Define Interaction

```javascript
// bot ready check
client.once('ready', () => {
	console.log('Ready!');
});

// Create bot interaction 
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction; //๋ช๋ น์ด ๋ช 
    // If the response takes a long time, an error occurs, so respond first
	await interaction.reply(`์ํ ์ค`);

	try {
		if (commandName === 'ping') { // ๋จ์ํ ๋ช๋ น์ด๋ ๋ฐ๋ก ์๋ต-
			await interaction.editReply('Pong!');
		}
        if(commandName ==='๋ธ๋'){  
            // commands์ ์ ์ธ๋์ด ์๋ ๋ช๋ น์ด๋ command๊ฐ์ฒด๋ฅผ ์ฐพ์ ๋๊ธฐ๊ธฐ
			const command = client.commands.get(interaction.commandName);
			await command.execute(interaction,interaction.options.get("์ต์").value.split(" "));
		}
    }catch (error) {// ์๋ฌ 
		console.error(error); 
		await interaction.editReply({ content: 'error', ephemeral: true });
	}
});
    
client.login(token); // bot ์คํ
```



## Discord command

### js file inside "./command" 

```javascript
const Discord = require('discord.js')
module.exports = {
    name: '๋ธ๋',
    description: '์ ํ๋ธ์์ ๋ธ๋๋ฅผ ์ฐพ๊ณ  ์ฌ์ํ๋ ๊ธฐ๋ฅ์ ์คํ์ํค๋ ๋ช๋ น์ด',
    async execute(message, args) {
        // define
    }
}
```





## ๐ฌDiscord bot  -send message

- #### Discord bot sends messages in two main ways. ( ์ฌ๋์ด ๋ณด๋ด๋๊ฒ๋ ๋์ผํ์ง๋ง)

- #### message send : ๋ฉ์์ง ์ฑ๋ -channel ๊ฐ์ฒด๋ฅผ ๊ฐ์ง๊ณ  ์์ด์ผ ํ๋ค.

  - ```javascript
    // channel๊ฐ์ฒด๋ฅผ ๊ฐ์ง๊ณ  ์์ ๋
    channel.send("๋ฉ์์ง ๋ณด๋ผ๊ฒ์!")
    // in interaction
    interaction.channel.send("๋ฉ์ธ์ง")
    ```

- #### message reply : ์๋ต ๋ฉ์์ง - ์์ ๋ ๋ฉ์์ง๊ฐ ์์ด์ผ ์ฌ์ฉ๊ฐ๋ฅํ๋ฉฐ ํ ๋ฒ๋ง ๋ณด๋ผ ์์์ด ๋๋ต์ ํ๊ณ  ์์ ํ๊ฑฐ๋ send message๋ฅด ์ฌ์ฉํ๋ ์, ๋ํ ๋ฉ์์ง ์์  15๋ถ ํ ํ ํฐ์ด ๋ง๋ฃ๋์ด ๋๋ต์ ํ๊ฑฐ๋ ์์ ํ  ์ ์์

  - ```javascript
    // There must be a received message first, and it can only be sent once
    //(modification is possible)
    //you cannot respond or modify the response 15 minutes after receiving the message.
    // in interaction
    
    interaction.reply("waiting answer")
    //Because a reply message can only be sent once
    interaction.editreply("sure")
    interaction.editreply("no")
    ```



## ๐คDiscord bot Embed Message 

๋ฐ์ค ํํ๋ก ์ฌ์ง, ๋์์ url๋ฑ์ผ๋ก ๋ฉํฐ๋ฏธ๋์ด ๋ฉ์์ง ๋๋? ์ ๊ธ์จ ํฌ๊ธฐ ๋ฑ๋ฑ ์ง์ ๊ฐ๋ฅ

As of Discord v13,  the message has been changed to contain multiple embeds.

```javascript
const myembed1=new Discord.MessageEmbed().
setTitle("embed1").setTitle("๐ ๋์๋ง ๐").
setDescription("๋์ ๋จ์ถํค๋ฅผ ์๋ ค์ฃผ๊ฒ ๋ฐ!๐").setColor("#33ff73")
const myembed2=new Discord.MessageEmbed().setTitle("embed2")
const myembed3=new Discord.MessageEmbed().setTitle("embed3")
                                                   
//before v12
channel.send(myembed1) // no longer working
//change v13
channel.send({ embeds : [myembed1,myembed2]})

```
### result

<img src="README.assets/image-20211102093937334.png" alt="image-20211102093937334" width="500" />



## #๏ธโฃ Music command

### Library 

```javascript
// A library that creates stream objects from YouTube URLs.
const ytdl = require('ytdl-core') 

// Extract search url and title from YouTube with specific keywords
const yts = require('yt-search') 

const {
   AudioPlayerStatus, 
   StreamType,
   createAudioPlayer,
    VoiceConnectionStatus ,
   createAudioResource,
   joinVoiceChannel,
    getVoiceConnection
} = require('@discordjs/voice'); // discord voice

const Discord = require('discord.js')

```

### Variable

```javascript
// ๋ด์์ ๊ณ์ ์ฌ์ฉํ  ๋ณ์ 
const Playlist = new Discord.Collection()
//Playlist[guildid] => Collection for each guild
//Playlist[guildid]["musicplaylist"] => musicplaylist for guild
//Playlist[guildid]["isloop"] => islook for guild

module.exports = { // command ์ ์
    name: '๋ธ๋',
    description: '์ ํ๋ธ์์ ๋ธ๋๋ฅผ ์ฐพ๊ณ  ์ฌ์ํ๋ ๊ธฐ๋ฅ์ ์คํ์ํค๋ ๋ช๋ น์ด',
    async execute(message, args) { // interaction ์ํ
        var PlaylistArray = new Array()
        const MGI = message.guild.id
        // ๊ธธ๋ ์ปฌ๋ ์ ๊ฐ์ ธ์ค๊ธฐ
        if (!Playlist.has(MGI)) Playlist.set(MGI, new Discord.Collection())
        else PlaylistArray =  Playlist.get(MGI).get("musicplaylist")
        console.log("MGI-๊ธธ๋ ์ปฌ๋ ์ ์์ฑ")
        
        //๊ธธ๋ ์ปฌ๋ ์์์ ์์๋ฆฌ์คํธ ์ถ์ถ
        const MPL = await Playlist.get(MGI).get("musicplaylist")
        if (MPL == null)  Playlist.get(MGI).set("musicplaylist", PlaylistArray)
        
        //๊ธธ๋ ์ปฌ๋ ์์์ ๋ฐ๋ณต์ฌ๋ถ ๊ฐ์ ธ์ค๊ธฐ
        isLoop = Playlist.get(MGI).get("isloop")
        if(isLoop==null) {
            Playlist.get(MGI).set("isloop",false)
            isLoop=false
        }
    }
}
```

### function

#### Check the voice channel to which the sender belongs

```javascript
// ๋ฉ์์ง๋ฅผ ๋ณด๋ธ ์ ์ ๊ฐ ์ํด์๋ ์์ฑ์ฑ๋ ๊ฐ์ ธ์ค๊ธฐ
const voiceChannel = <interaction>message.member.voice.channel
// ๋ฉ์์ง๋ฅผ ๋ณด๋ธ ์ ์ ๊ฐ ์์ฑ ์ฑ๋์ ๋ค์ด๊ฐ ์๋์ง ํ์ธ
if (!voicechannel) return message.editreply("์์ฑ์ฑ๋์ ๋ค์ด๊ฐ ์ฃผ์ธ์")


```

#### โฟ music search 

```javascript
const yts = require('yt-search')

async function search_youtube_music(music_name){
    const r =await yts(music_name)
    const videos= r.videos.slice(0,1)
    return videos[0] //๊ฐ์ฅ ์์ ๊ฐ์ฒด ๋ฆฌํด
}
```

#### โถ Play music in Voice Channel

```javascript
const ytdl = require('ytdl-core')

async function music_play(message, voiceChannel){
    // voice channel ์ ์๋ถ
    const voice= joinVoiceChannel({
        channelId:voiceChannel.id,
        guildId:voiceChannel.guild.id,
        adapterCreator:voiceChannel.guild.voiceAdapterCreator
    })
    // get music url
    const musicurl=search_youtube_music("title").url
    // convert stream
    const stream= ytdl(music.url,{filter : 'audioonly'})
    const resource = createAudioResource(stream,
              { inputType :StreamType.Arbitrary});
    const player=createAudioPlayer()

    player.play(resource)
    voice.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => 
  /* stream ์ข๋ฃ ์ ์คํ (ex . disconect voice channel , replay music, ...) */
             );
    player.on("error", console.error);
    
}
```



### ๐ Execution according to command

```javascript

if (args[0]=="์ฌ์"){ //Play music command= /๋ธ๋ ์ฌ์ title
    if(!args[1]){ //๋ธ๋ ์ฌ์ - ๋ฉ์ท์๋ ๋ธ๋ ์ฌ์ ๋ช๋ น์ด
        // error- blank title 
    }
    //  music search 
    const music=await search_youtube_music(musictitle)
    // push playlist
    PlaylistArray.push(data)
    // Synchronize with the playlist to the server 
    Playlist.get(MGI).set("musicplaylist",PlaylistArray) 

    if (isPlay){// playing
        //send message and return
    }else { // is not playing
        
        //  Play music in Voice Channel
    }
}else if(args[0] =='๋ฃจํ'){ // Set(off) repeat  command = /๋ธ๋ ๋ฃจํ
    // set the repeat
}else if(args[0] =='์ข๋ฃ'){ // Finish play command = /๋ธ๋ ์ข๋ฃ
    
    // playlist init & off player
    
}else if(args[0] =="ํ๋ ์ด๋ฆฌ์คํธ"){ 
    if (args[1] == "์ญ์ " || args[1] == "ํ์ธ" || !args[1]) {
        switch (args[1]) {
            case "์ญ์ ":  // Remove songs from playlist commands = /๋ธ๋ ํ๋ ์ด๋ฆฌ์คํธ ์ญ์  n
                // Remove song from playlist
                break
            default: // check the playlist commands =/๋ธ๋ ํ๋ ์ด๋ฆฌ์คํธ (ํ์ธ)
                // Write embed message from playlist
                // send message
                break
        }
    }
}else if(args[0] == "๊ฑด๋๋ฐ๊ธฐ"){
    // Play next song  - function(Play music in Voice Channel)  execution
}else{
    // can't find command
}

```

