const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require("fs");

//import stats from ('./json/stats.json');

const prefix = "+";

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

// To prevent overloading bot.
let isReady = true;

// Add all general commands.
fs.readdir("./commands/", (err, folders) => {

    if (err) console.log(err);

    folders.forEach((folder, i) => {
        fs.readdir("./commands/" + folder, (err, files) => {
            let jsfile = files.filter(f => f.split(".").pop() === "js");
            if (jsfile.length <= 0) {
                console.log("Couldn't find any commands.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/${folder}/${f}`);
                console.log(`${f} loaded!`);
                client.commands.set(props.help.name, props);
            });
        });
    });
});

client.on('ready', () => {
    console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
    client.user.setActivity("with your waifu.")
});

client.on("message", async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content.indexOf(prefix) !== 0) {
        return;
    }

    /*if (!stats[message.author.id]) {
        stats[message.author.id] = {
            coins: 0,
            experience: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 1) + 1;
    let baseAmt = Math.floor(Math.random() * 1) + 1;
    console.log(coinAmt + " : " + baseAmt);

    if (coinAmt === baseAmt) {
        stats[message.author.id] = {
            coins: stats[message.author.id].coins + coinAmt
        };

        fs.writeFile("./json/stats.json", JSON.stringify(stats), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }*/

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //const command = args.shift().toLowerCase();
    const command = args.shift();

    let commandfile = client.commands.get(command);
    if (commandfile && isReady) {
        commandfile.run(client, message, args, isReady);
    }
});

client.login(auth.token);