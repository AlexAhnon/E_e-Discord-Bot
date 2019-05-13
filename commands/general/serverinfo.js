const Discord = require("discord.js");

module.exports.run = async (client, message, args, isReady) => {
    isReady = false;

    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("FF0000")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined At", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverEmbed);

    isReady = true;
}

module.exports.help = {
    name: "serverinfo"
}