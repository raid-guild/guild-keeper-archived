const express = require("express");

const RAIDS_ROUTER = express.Router();

RAIDS_ROUTER.post("/validate", async (req, res) => {
    if (req.body.ID == "") return res.json("NOT_FOUND");
    await req
        .DUPLICATE_RAIDS_BASE("Raids")
        .find(req.body.ID, function (err, record) {
            if (err) {
                if (err.error === "NOT_FOUND") {
                    res.json(err.error);
                }
                return;
            }
            console.log("Retrieved", record.id);
            res.json(record.fields);
        });
});

RAIDS_ROUTER.post("/update", async (req, res) => {
    let { ID, Hash, Index } = req.body;

    await req.DUPLICATE_RAIDS_BASE("Raids").update(
        [
            {
                id: ID,
                fields: {
                    "Locker Hash": Hash,
                    "Escrow Index": Index,
                },
            },
        ],
        function (err, records) {
            if (err) {
                console.error(err);
                res.json("ERROR");
                return;
            }
            records.forEach(function (record) {
                res.json("SUCCESS");
            });
        }
    );
});

module.exports = RAIDS_ROUTER;
