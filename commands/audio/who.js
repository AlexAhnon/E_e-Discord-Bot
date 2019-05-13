const Discord = require("discord.js");

module.exports.run = async (client, message, args, isReady) => {
    isReady = false;

    let voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
        voiceChannel.join().then(connection => {
            const dispatcher = connection.playFile('./audio/WHO.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
    } else {
        console.log("ERROR: No channel to join!");
    }

    isReady = true;
}

module.exports.help = {
    name: "WHO?"
}