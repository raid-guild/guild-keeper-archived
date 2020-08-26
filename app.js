// Package imports
const Discord = require("discord.js");
const client = new Discord.Client();
const Airtable = require("airtable");
const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

// Constant imports
const constants = require("./utils/constants");
const { PREFIX, HELP_MESSAGE } = constants;

// Airtable Configuration
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.API_KEY,
});

let treasury_base = Airtable.base(process.env.TREASURY_BASE_ID);

// Command files configuration
client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Bot on ready
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    require("./server");
});

// Bot on message
client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    if (
        !message.member.roles.member._roles.includes(process.env.MEMBER_ROLE_ID)
    )
        return message.channel.send("Access restricted to members.");

    let args = message.content.slice(PREFIX.length).split(/ +/);
    let command = args[1];

    if (
        args.length == 2 &&
        message.content.startsWith(PREFIX) &&
        args[1] === "help"
    ) {
        let embed = new Discord.MessageEmbed()

            .setDescription(
                "Welcome Guilder. I do a lot of automation for the guild and below are some of my visible executable commands that you can use."
            )
            .setColor("#ff3864")

            .addFields(HELP_MESSAGE)
            .setFooter(
                "For more information about a command, use !keeper help <command>"
            );
        return message.channel.send(embed);
    }

    switch (command) {
        case "help":
            return client.commands.get("help").execute(Discord, message, args);
        case "crypt":
            return client.commands.get("crypt").execute(message);
        case "role-stats":
            return client.commands.get("role-stats").execute(Discord, message);
        case "inactive-stats":
            return client.commands
                .get("inactive-stats")
                .execute(Discord, message);
        case "treasury":
            return client.commands
                .get("treasury")
                .execute(message, treasury_base);
        case "gas-info":
            return client.commands
                .get("gas-info")
                .execute(Discord, message, axios);
        default:
            return message.channel.send(
                "Invalid command! Check **!keeper help**."
            );
    }
});

client.login(process.env.TOKEN);
