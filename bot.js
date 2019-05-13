const Discord = require('discord.js');
const opus = require('opusscript');
const client = new Discord.Client();
const auth = require('./auth.json');

const prefix = "+";

// To prevent overloading bot.
let isReady = true;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);


client.on("message", async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.indexOf(prefix) !== 0) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //const command = args.shift().toLowerCase();
    const command = args.shift();

    if (command === "ping" && isReady) {
        isReady = false;

        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`);

        isReady = true;
    }

    if (command === "say" && isReady) {
        isReady = false;

        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");

        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o=>{}); 

        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);

        isReady = true;
    }

    if (command === "WHO?" && isReady) {
        isReady = false;

        let voiceChannel = message.member.voiceChannel;
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/WHO.mp3');
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
        } else {
            console.log("ERROR: No channel to join!");
        }

        isReady = true;
    }
});