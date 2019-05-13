const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args, isReady) => {
    let {body} = await superagent.get(`https://random.dog/woof.json`);

    let dogEmbed = new Discord.RichEmbed()
        .setColor("FF0000")
        .setTitle("Doggo :dog:")
        .setImage(body.url);

    message.channel.send(dogEmbed);
}

module.exports.help = {
    name: "doggo"
}