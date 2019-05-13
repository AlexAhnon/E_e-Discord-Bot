const Discord = require("discord.js");

module.exports.run = async (client, message, args, isReady) => {
    isReady = false;

    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Message took ${m.createdTimestamp - message.createdTimestamp}ms to edit. API Latency is ${Math.round(client.ping)}ms.`);

    isReady = true;
}

module.exports.help = {
    name: "ping"
}