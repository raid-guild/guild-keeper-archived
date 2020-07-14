const express = require("express");
const Clients = require("../models/clients_schema");

const DAOSHOP_ROUTER = express.Router();

DAOSHOP_ROUTER.post("/airtable", async (req, res) => {
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

    await req.DAOSHOP_BASE("Clients").create(
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

DAOSHOP_ROUTER.post("/mongo", async (req, res) => {
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
    } = req.body;

    const client = new Clients({
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
    });

    client
        .save()
        .then((data) => {
            console.log("Success - Mongo");
            res.send("Success - Mongo");
        })
        .catch((err) => {
            console.log(err);
            res.send("Error - Mongo");
        });
});

DAOSHOP_ROUTER.post("/support", async (req, res) => {
    let response = {
        fulfillmentMessages: [
            {
                card: {
                    title: "Create a ticket",
                    subtitle: "Please create a support ticket below",
                    imageUri: "https://example.com/images/example.png",
                    buttons: [
                        {
                            text: "Create ticket",
                            postback: "https://airtable.com/shr3rxdFMBeihuFXY",
                        },
                    ],
                },
            },
        ],
    };
    res.send(response);
});

module.exports = DAOSHOP_ROUTER;
