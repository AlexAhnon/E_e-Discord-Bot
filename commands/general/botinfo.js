const Discord = require("discord.js");

module.exports.run = async (client, message, args, isReady) => {
    isReady = false;

    let botIcon = client.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("FF0000")
        .setThumbnail(botIcon)
        .addField("Bot Name", client.user.username)
        .addField("Created On", client.user.createdAt);

    message.channel.send(botEmbed);

    isReady = true;
}

module.exports.help = {
    name: "botinfo"
}