const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var cors = require("cors");

var Airtable = require("airtable");

const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.API_KEY,
});

// var raidcentral_base = new Airtable({ apiKey: process.env.API_KEY }).base(
//     process.env.RAID_CENTRAL_BASE_ID
// );

var daoshop_base = Airtable.base(process.env.DAOSHOP_BASE_ID);

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const PREFIX = "!keeper";
const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID;
const BOT_ID = process.env.BOT_ID;
const HELP_MESSAGE =
    "Hi! Am the Guild Keeper here. Here's my list of commands.\n\n" +
    // "\t1. check-raids -- Lists the raids from Airtable.\n" +
    // "\t2. check-status -- Gets the status of a raid from Airtable.\n" +
    // "\t3. set-status -- Sets the status of a raid from Airtable.\n" +
    "\t1. `create-raid` -- Creates a raid channel and initializes it.\n" +
    "\t2. `create-rip` -- Creates a rip channel and initializes it.\n" +
    "\t3. `crypt` -- Crypts an raid/rip/client channel under the battlefield and client chat category.\n" +
    "\t4. `role-stats` -- Returns number of people assigned to each role.\n" +
    "\nI can also send in apprentice issues from any of the raidguild's repo to discord." +
    "\tIf you want more info please see the **GuildKeeper docs:** https://hackmd.io/@saimano/guild-keeper\n" +
    "\nFor help with a specific command type `!keeper help <command>`\n" +
    "\nExample: for help with creating a raid channel, type `!keeper help create-raid`";

let STATUS_CODES = {
    0: "High Signal",
    1: "Prepping for Battle",
    2: "Yes",
    3: "Active Raids",
    4: "Completed",
    5: "Failed",
    6: "Declined",
};

let data = {};

// const fetchRaids = async () => {
//     await raidcentral_base("Raids")
//         .select({
//             fields: ["Name", "Status"],
//             view: "Grid view",
//         })
//         .eachPage(
//             function page(records, fetchNextPage) {
//                 records.forEach((record) => {
//                     data[record.fields.Name.toLowerCase()] = {
//                         id: record.id,
//                         status: record.fields.Status,
//                     };
//                 });
//                 fetchNextPage();
//             },
//             function done(err) {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }
//             }
//         );
// };

app.post("/payload", (req, res) => {
    if (req.body.action === "labeled") {
        let issue = req.body.issue.html_url;
        let title = req.body.issue.title;
        let desc = req.body.issue.body || "No description provided.";
        let state = req.body.issue.state;
        let label = req.body.label.name;

        let apprentice_issue =
            "👨‍🎓 New apprentice issue created!\n\n" +
            `**Title:** ${title}\n` +
            `**Description:** ${desc}\n` +
            `**State:** ${state}\n` +
            `**Issue:** ${issue}`;

        client.guilds.cache
            .get(process.env.GUILD_ID)
            .channels.cache.get("724252185877282936")
            .send(apprentice_issue);
    }

    res.send("Received");
});

app.post("/daoshop", async (req, res) => {
    let {
        project_name,
        summary,
        skills_needed,
        specs,
        name,
        email,
        handle,
        about_guild,
        to_know,
        slot_1,
        slot_2,
        slot_3,
        transaction_hash,
    } = req.body;
    await daoshop_base("Bookings").create(
        [
            {
                fields: {
                    "Project Name": project_name,
                    Summary: summary,
                    "Skills Needed": skills_needed,
                    "Do you have any specs?": specs,
                    Name: name,
                    Email: email,
                    Handle: handle,
                    "How did you hear about the guild?": about_guild,
                    "Anything else you would like the guild to know?": to_know,
                    "Booking Slot 1": slot_1,
                    "Booking Slot 2": slot_2,
                    "Booking Slot 3": slot_3,
                    "Transaction Hash": transaction_hash,
                },
            },
        ],
        function (err, records) {
            if (err) {
                console.error(err);
                return res.send("error");
            }
            records.forEach(function (record) {
                let id = record.getId();
                return res.send("success");
            });
        }
    );
});

app.get("/", (req, res) => {
    res.send("Hi");
});

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    app.listen(process.env.PORT || 5000, () => console.log("Listening.."));
    // fetchRaids();
});

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

    switch (command) {
        case "help":
            return client.commands.get("help").execute(message, args);
        // case "check-raids":
        //     return client.commands.get("check-raids").execute(message, raidcentral_raidcentral_base);
        // case "check-status":
        //     return client.commands
        //         .get("check-status")
        //         .execute(message, args, data);
        // case "set-status":
        //     return client.commands
        //         .get("set-status")
        //         .execute(message, args, data, MEMBER_ROLE_ID, STATUS_CODES);
        case "create-raid":
            return client.commands
                .get("create-raid-rip")
                .execute(message, args, BOT_ID, MEMBER_ROLE_ID);
        case "create-rip":
            return client.commands
                .get("create-raid-rip")
                .execute(message, args, BOT_ID, MEMBER_ROLE_ID);
        case "crypt":
            return client.commands
                .get("crypt-raid-rip")
                .execute(message, MEMBER_ROLE_ID);
        case "role-stats":
            return client.commands.get("role-stats").execute(message);
        default:
            return message.channel.send(
                "Invalid command! Check **!keeper help**."
            );
    }
});

client.login(process.env.TOKEN);
