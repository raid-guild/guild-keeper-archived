// Package imports
const Discord = require("discord.js");
const client = new Discord.Client();
const Airtable = require("airtable");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

require("dotenv").config();

// Constant imports
const constants = require("./utils/constants");
const { PREFIX, HELP_MESSAGE } = constants;

// Route imports
const PAYLOAD_ROUTER = require("./routes/payload");
const DAOSHOP_ROUTER = require("./routes/daoshop");

// Airtable Configuration
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.API_KEY,
});

let daoshop_base = Airtable.base(process.env.DAOSHOP_BASE_ID);
var registry_base = Airtable.base(process.env.REGISTRY_BASE_ID);
var treasury_base = Airtable.base(process.env.TREASURY_BASE_ID);

// Express server section
const app = express();
app.use(express.json());
app.use(cors());
app.use(
    "/payload",
    (req, res, next) => {
        req.CLIENT = client;
        next();
    },
    PAYLOAD_ROUTER
);
app.use(
    "/daoshop",
    (req, res, next) => {
        req.DAOSHOP_BASE = daoshop_base;
        next();
    },
    DAOSHOP_ROUTER
);
app.get("/", (req, res) => {
    res.send("Hi");
});

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
    app.listen(process.env.PORT || 5000, () => console.log("Listening.."));
    mongoose.connect(
        process.env.MONGODB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log("Connected to database..");
        }
    );
});

// Bot on message
client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    if (
        !message.member.roles.member._roles.includes(process.env.MEMBER_ROLE_ID)
    )
        return message.channel.send("Only Members can command me!");

    let args = message.content.slice(PREFIX.length).split(/ +/);
    let command = args[1];

    if (
        args.length == 2 &&
        message.content.startsWith(PREFIX) &&
        args[1] === "help"
    )
        return message.channel.send(HELP_MESSAGE);

    if (
        args.length <= 3 &&
        message.content.startsWith(PREFIX) &&
        args[1] === "how-to"
    )
        return client.commands.get("how-to").execute(message, args);

    switch (command) {
        case "help":
            return client.commands.get("help").execute(message, args);
        case "create-raid":
            return client.commands
                .get("create-raid-rip")
                .execute(
                    message,
                    args,
                    process.env.BOT_ID,
                    process.env.MEMBER_ROLE_ID
                );
        case "create-rip":
            return client.commands
                .get("create-raid-rip")
                .execute(
                    message,
                    args,
                    process.env.BOT_ID,
                    process.env.MEMBER_ROLE_ID
                );
        case "crypt":
            return client.commands
                .get("crypt-raid-rip")
                .execute(message, process.env.MEMBER_ROLE_ID);
        case "role-stats":
            return client.commands.get("role-stats").execute(message);
        case "registry":
            return client.commands
                .get("registry")
                .execute(message, args, registry_base);
        case "treasury":
            return client.commands
                .get("treasury")
                .execute(message, treasury_base);
        case "gas-info":
            return client.commands.get("gas-info").execute(message, axios);
        default:
            return message.channel.send(
                "Invalid command! Check **!keeper help**."
            );
    }
});

client.login(process.env.TOKEN);
