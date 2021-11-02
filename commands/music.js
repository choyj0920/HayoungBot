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
    }
}