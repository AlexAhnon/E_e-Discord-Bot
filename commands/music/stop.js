const Discord = require("discord.js");
const YTDL = require("ytdl-core-discord");

module.exports.run = async (bot, message, args, isReady) => {
    if (!message.member.voiceChannel) {
        console.log("ERROR: Not in a voice channel.");
        return;
    }

    let voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
        voiceChannel.leave();
    } else {
        console.log("ERROR: No channel to join!");
    }
}

module.exports.help = {
    name: "stop"
}