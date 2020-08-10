const express = require("express");
const Raids = require("../models/raids_schema");

const HIREUS_ROUTER = express.Router();

HIREUS_ROUTER.post("/airtable", async (req, res) => {
    let {
        project_name,
        project_type,
        summary,
        specs,
        skills_needed,
        priorities,
        budget,
        name,
        email,
        handle,
        link,
        completion_date,
        about_guild,
        to_know,
        transaction_hash,
    } = req.body;

    await req.RAID_CENTRAL_V2_BASE("Raids").create(
        [
            {
                fields: {
                    Name: project_name,
                    "Project Type": project_type,
                    "Brief Summary": summary,
                    "Has Specs": specs,
                    "Skills Needed": skills_needed,
                    Priorities: priorities,
                    "Budget Allocated": budget,
                    "Your Name": name,
                    "Email Address": email,
                    "Telegram Handle": handle,
                    "Relevant Link": link,
                    "Desired date of completion": completion_date,
                    "How did you hear about the Guild?": about_guild,
                    "Anything else you'd like the Guild to know?": to_know,
                    "Consultation Hash": transaction_hash,
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

HIREUS_ROUTER.post("/mongo", async (req, res) => {
    let {
        project_name,
        project_type,
        summary,
        specs,
        skills_needed,
        priorities,
        budget,
        name,
        email,
        handle,
        link,
        completion_date,
        about_guild,
        to_know,
        transaction_hash,
    } = req.body;

    let discord_message =
        `**New Client Submission Received** - ${project_name} (https://etherscan.io/tx/${transaction_hash}) is a ${project_type} from ${name} with a budget of ${budget}. The client expects a delivery date of ${completion_date} and has provided the following information.` +
        "\n" +
        `**Summary** - ${summary}` +
        "\n" +
        `**Specs** - ${specs}` +
        "\n" +
        `**Skills Required** - ${skills_needed}` +
        "\n" +
        `**Priorities** - ${priorities}` +
        "\n" +
        `**Relevant Link** - ${link}` +
        "\n" +
        `**Contact** - [${email}][${handle}]`;

    req.CLIENT.guilds.cache
        .get(process.env.GUILD_ID)
        .channels.cache.get(process.env.CLIENT_SUBMISSION_CHANNEL_ID)
        .send(discord_message);

    const raid = new Raids({
        project_name,
        project_type,
        summary,
        specs,
        skills_needed,
        priorities,
        budget,
        name,
        email,
        handle,
        link,
        completion_date,
        about_guild,
        to_know,
        transaction_hash,
    });

    raid.save()
        .then((data) => {
            console.log("Success - Mongo");
            res.send("Success - Mongo");
        })
        .catch((err) => {
            console.log(err);
            res.send("Error - Mongo");
        });
});

module.exports = HIREUS_ROUTER;
