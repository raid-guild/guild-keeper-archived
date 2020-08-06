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
        `📍**Project Name**` +
        "\n" +
        `${project_name}` +
        "\n\n" +
        `📍**Project Type**` +
        "\n" +
        `${project_type}` +
        "\n\n" +
        `📍**Summary**` +
        "\n" +
        `${summary}` +
        "\n\n" +
        `📍**Specs**` +
        "\n" +
        `${specs}` +
        "\n\n" +
        `📍**Budget**` +
        "\n" +
        `${budget}` +
        "\n\n" +
        `📍**Client Name**` +
        "\n" +
        `${name}` +
        "\n\n" +
        `📍**Email**` +
        "\n" +
        `${email}` +
        "\n\n" +
        `📍**Social Handle**` +
        "\n" +
        `${handle}` +
        "\n\n" +
        `📍**Relevant Link**` +
        "\n" +
        `${link}` +
        "\n\n" +
        `📍**Desired Date of Completion**` +
        "\n" +
        `${completion_date}` +
        "\n\n" +
        `📍**How did you hear about the guild**` +
        "\n" +
        `${about_guild}` +
        "\n\n" +
        `📍**Anything else the guild should know**` +
        "\n" +
        `${to_know}` +
        "\n\n" +
        `📍**Transaction Hash**` +
        "\n" +
        `${transaction_hash}` +
        "\n\n" +
        `📍**Priorities**` +
        "\n" +
        `${priorities}` +
        "\n\n" +
        `📍**Skills Required**` +
        "\n" +
        `${skills_needed}`;

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
