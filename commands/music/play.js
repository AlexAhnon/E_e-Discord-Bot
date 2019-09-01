const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, isReady) => {
    if (!args[0]) {
        message.channel.send("Please provide a link.");
        return;
    }

    if (!message.member.voiceChannel) {
        console.log("ERROR: Not in a voice channel.");
        return;
    }

    let voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
        voiceChannel.join().then(connection => {
            let dispatcher = connection.playStream(ytdl(args[0], {filter:'audioonly'}));
            dispatcher.setVolume(5 / 100);
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
    } else {
        console.log("ERROR: No channel to join!");
    }
}

module.exports.help = {
    name: "play"
}