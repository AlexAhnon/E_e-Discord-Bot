const Discord = require("discord.js");

module.exports.run = async (bot, message, args, isReady) => {
    let textArray = [
        "Man, I've become really degenerate enough.",
        "I wish I could die.",
        "I don't really care too much about the real world.",
        "I wish I could play DotA alone.",
        "No amount of sleep in the world could cure the tiredness I feel.",
        "It's sad to know I'm done.",
        "You on the other hand, if you weren't depressed and suicidal, you'd still be really strange.",
        "I really don't have a best friend.",
        "Hm. I'm still really bad.",
        "It really is just suffering.",
        "I'm just gonna have chicken, hate it.",
        "Hey babe, I hate girls, want to talk?",
        "This is why I don't meme."
    ]

    let random = Math.floor(Math.random() * textArray.length);

    const attachment = new Discord.Attachment('./images/pathetic.PNG', 'pathetic.PNG');

    let embed = new Discord.RichEmbed()
        .setTitle(textArray[random])
        .attachFile(attachment)
        .setImage('attachment://pathetic.PNG');

    message.channel.send(embed);
}

module.exports.help = {
    name: "pathetic"
}