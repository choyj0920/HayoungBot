const ytdl = require('ytdl-core')
const yts = require('yt-search')
const {
   AudioPlayerStatus,
   StreamType,
   createAudioPlayer,
    VoiceConnectionStatus ,
   createAudioResource,
   joinVoiceChannel,
    getVoiceConnection
} = require('@discordjs/voice');
const Discord = require('discord.js')
const Playlist = new Discord.Collection()

module.exports = {
    name: '노래',
    description: '유튜브에서 노래를 찾고 재생하는 기능을 실행시키는 명령어',
    async execute(message, args) {
        var PlaylistArray = new Array()
        const MGI = message.guild.id

        // 길드 컬렉션 가져오기
        if (!Playlist.has(MGI)) Playlist.set(MGI, new Discord.Collection())
        else PlaylistArray =  Playlist.get(MGI).get("musicplaylist")
        console.log("MGI-길드 컬렉션 생성")
        
        //길드 컬렉션에서 음악리스트 추출
        const MPL = await Playlist.get(MGI).get("musicplaylist")
        if (MPL == null)  Playlist.get(MGI).set("musicplaylist", PlaylistArray)
       

        //길드 컬렉션에서 반복여부 가져오기
        isLoop = Playlist.get(MGI).get("isloop")
        if(isLoop==null) {
            Playlist.get(MGI).set("isloop",false)
            isLoop=false
        }

        // 봇이 재생 중인지 여부 (같은 서버내 다른 채널에서 재생 중일 수 있으므로)
        curMusic=Playlist.get(MGI).get("curmusic")
        const isPlay= (!curMusic)?false:true

        // The voice channel to which the sender of the message belongs
        const voiceChannel = message.member.voice.channel
        // 봇이 voicechannel과 연결되어있는지 여부
        var status =false
        console.log("봇채널",message.client.voice.chanel)
        
        
        console.log(`isplay ${isPlay} status ${status}`)
        
        console.log(`MPL(${message.member.guild.name}) : ${Playlist.get(MGI).get("musicplaylist")}`)
        
        

        if (args[0]=="재생"){ //노래 재생
            const musictitle="".concat(args.slice(1))
            console.log(`노래 재생 : ${musictitle}`)
            
            if(!voiceChannel) return message.editReply("⛔오류 : 이명령어를 사용하기 위해서는 음성 채널에 들어가 있으셔야해요⛔")

            // if(!status && isPlay) return message.editReply("⛔오류 : 노래가 다른 채널에서 재생 중이거나 플레이리스트에 재생 곡이 남아있습니다.⛔")

            if(!args[1]){ 
                if(MPL[0] !=null){ //재생될 곡 존재
                    if(!status){ //현재 재생 중 아님
                        // 나중에 추가할 코드 노래의 재생상태를 일시정지 할 수 있게 되면...
                        return music_play(message,voiceChannel)
                    }else return message.editReply("⛔ 오류 : 노래가 이미 재생되고 있습니다.⛔")
                }else return message.editReply("⛔ 오류 : 유튜브에서 찾을 노래 제목이나 URL을 입력해주세요⛔")
            }
            // 음악 찾기
            const music=await search_youtube_music(musictitle)
            if(!music) return message.editReply("⛔ 오류 : 검색 결과가 없습니다.⛔")
            const data={title:music.title,url :music.url}

            // push playlist
            PlaylistArray.push(data)
            // Synchronize with the playlist to the server 
            Playlist.get(MGI).set("musicplaylist",PlaylistArray) 

            if (isPlay){// 현재 재생중이엿으면 
                message.editReply({embeds : [new Discord.MessageEmbed().setTitle("✅플레이 리스트에 노래를 추가했어요.✅").
                setDescription("🔘/노래 플레이리스트🔘 명령어로 현재 플레이리스트를 확인 할 수 있습니다.").
                setColor("#33ff73")]})
                message.editReply(`추가한 곡 : [${music.title}](${music.url})`)               
            }else { //현재 음성채널에 없었으면 -재생중이 아니엿으면 
                // 음성채널 연결 , 말하기 권한 확인
                const permission =voiceChannel.permissionsFor(message.client.user)
                if(!permission.has('CONNECT')) return message.editReply("⛔ 오류 : 음성 채널 연결 권한이 없습니다.⛔")
                if(!permission.has('SPEAK')) return message.editReply("⛔ 오류 : 음성 채널에 말하기 권한이 없습니다.⛔")
                
                message.editReply(music.url)
                // const connection=getVoiceConnection(voiceChannel.id)
                // 음악 틀기
                music_play(message,voiceChannel)
            }
        }else if(args[0] =='루프'){ // 루프 설정
            isLoop =!isLoop
            Playlist.get(MGI).set("isloop",isLoop)
            message.editReply({ embeds : [new Discord.MessageEmbed().setTitle("😁 /노래 루프!! 😁").
            setDescription(!isLoop?"➡반복 끌게여 ㅠㅠ ":"🔁반복할게여~").
            setColor("#33ff73")]})
        }else if(args[0] =='종료'){
            if(!voiceChannel) return message.editReply("⛔오류 : 이명령어를 사용하기 위해서는 음성 채널에 들어가 있으셔야해요⛔")
            if(!isPlay) return message.editReply("⛔오류 : 노래가 종료 되어있습니다.⛔")
            
            PlaylistArray = []
            Playlist.get(MGI).set("musicplaylist", PlaylistArray)
            Playlist.get(MGI).set("isloop", false)
            Playlist.get(MGI).set("curmusic", null)
            
            const connection = getVoiceConnection(voiceChannel.id);
            music_play(message,voiceChannel)
            await message.editReply("노래가 종료 되었습니다.👍")
        }else if(args[0] =="플레이리스트"){
            if (args[1] == "삭제" || args[1] == "확인" || !args[1]) {
                switch (args[1]) {
                    case "삭제":
                        PlaylistArray = Playlist.get(MGI).get("musicplaylist")
                        if (!args[2] || isNaN(args[2]) || args[2] > PlaylistArray.length || args[2] < 0) return message.editReply("오류 : 플레이리스트에서 삭제할 노래 번호를 입력해주세요.")
                        PlaylistArray.splice(--args[2], 1)
                        Playlist.get(MGI).set("musicplaylist", PlaylistArray)
                        message.editReply({ embeds : [new Discord.MessageEmbed().setTitle("⛔ 플레이 리스트의 항목을 삭제했어요⛔").setDescription("**/노래 플레이리스트 확인** 명령어로 현재 플레이리스트를 확인 할 수 있어요")]})
                        break
                    default:
                        const Embed = new Discord.MessageEmbed().setTitle("🎶 현재 플레이리스트입니다.🎶").setColor("#009dff")
                        if (!isPlay && (Playlist.get(MGI).get("musicplaylist") == null || Playlist.get(MGI).get("musicplaylist")[0] == null)) return message.editReply("표시 할 플레이리스트가 없습니다.")
                        PlaylistArray = Playlist.get(MGI).get("musicplaylist")
                        Embed.addField(`현재 재생곡 : ${curMusic.title}`, `[바로가기](${curMusic.url})\n`)
                        
                        for (var i = 0; i < PlaylistArray.length; i++) {
                            var number = i
                            Embed.addField(`${++number}. ${PlaylistArray[i].title}`, `[바로가기](${PlaylistArray[i].url})`)
                            
                        }
                        Embed.addField("LOOP : ",isLoop? "Loop on": "Loop off")
                        message.editReply({ embeds : [Embed]})
                        break
                }
            }else message.editReply("⛔ 오류 : 올바른 인수를 입력해주세요 (인수 : 삭제 , 확인)")
        }else if(args[0] == "건너뛰기"){
            if(!isPlay) return message.editReply("⛔ 오류 : 현재 음악이 재생중이 아닙니다.⛔") 
            return music_play(message,voiceChannel)
        }else{
            return message.editReply("⛔해당 명령어를 찾지 못했습니다⛔")
        }
    }


}
// 음악 재생
async function music_play(message, voiceChannel){
    const voice= joinVoiceChannel({
        channelId:voiceChannel.id,
        guildId:voiceChannel.guild.id,
        adapterCreator:voiceChannel.guild.voiceAdapterCreator
    })
    //변수 가져오기
    const MGI=message.guild.id
    isLoop= Playlist.get(MGI).get("isloop")

    if(!Playlist.get(MGI).get("musicplaylist")[0] && !isLoop){ // 재생할 노래가 없으면 종료
        message.channel.send({embeds:[new Discord.MessageEmbed().setTitle("✅플레이리스트의 끝이에요❎").
        setDescription("노래를 종료합니다.")]}).catch(console.error)
        return voice.destroy()
    }
    // 음악 플레이리스트
    var PlaylistArray = new Array()
    PlaylistArray=Playlist.get(MGI).get("musicplaylist")
    if (Playlist.get(MGI).get("isloop") ==true){
        const curMusic =Playlist.get(MGI).get("curmusic")
        if (curMusic != null)
            PlaylistArray.push(curMusic)
    }
    const music =Playlist.get(MGI).get("musicplaylist")[0]
    PlaylistArray.shift() 
    Playlist.get(MGI).set("musicplaylist",PlaylistArray)
    Playlist.get(MGI).set("curmusic",music)

    nexttitle="--마지막 곡입니다."

    if(PlaylistArray.length !=0 ){
        nexttitle=`--다음 재생곡 : [${Playlist.get(MGI).get("musicplaylist")[0].title}](${Playlist.get(MGI).get("musicplaylist")[0].url})`
    }else if(isLoop){
        nexttitle = `--다음 재생곡 : [${music.title}](${music.url})`
    }
   
    message.channel.send({ embeds: [new Discord.MessageEmbed().setURL(music.url).setTitle("✅ 유튜브에서 노래를 재생했어요 ✅").setDescription(`현재 재생곡 : [${music.title}](${music.url})\n${nexttitle}`).setColor("#33ff7e")]}).catch(console.error)
    const stream= ytdl(music.url,{filter : 'audioonly'})
    const resource = createAudioResource(stream, { inputType :StreamType.Arbitrary});
    let player=createAudioPlayer()

    player.play(resource)
    voice.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => music_play(message,voiceChannel));
    player.on("error", console.error);
    
    
}

async function search_youtube_music(music_name){
    const r =await yts(music_name)
    const videos= r.videos.slice(0,1)
    return videos[0]
}
