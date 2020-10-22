const express = require("express");

const PAYLOAD_ROUTER = express.Router();

PAYLOAD_ROUTER.post("/", (req, res) => {
    if (req.body.action === "labeled") {
        let issue = req.body.issue.html_url;
        let title = req.body.issue.title;
        // let desc = req.body.issue.body || "No description provided.";
        // let state = req.body.issue.state;
        let label = req.body.label.name;

        if (label === "apprentice-issue") {
            let Discord = req.DISCORD;
            let embed = new Discord.MessageEmbed()
            .setColor("#ff3864")
            .setTitle(title)
            .setURL(issue)
            .setTimestamp();

            req.CLIENT.guilds.cache
                .get(process.env.GUILD_ID)
                .channels.cache.get("724252185877282936")
                .send(embed);
        }
    }

    res.send("Received");
});

module.exports = PAYLOAD_ROUTER;
