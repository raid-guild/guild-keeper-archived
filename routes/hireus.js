const express = require("express");

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

    await req.DUPLICATE_RAIDS_BASE("Raids").create(
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

HIREUS_ROUTER.post("/backup", async (req, res) => {
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
    } = req.body;

    await req.HIREUS_BACKUP_BASE("HireUs").create(
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

module.exports = HIREUS_ROUTER;
