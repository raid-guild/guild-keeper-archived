const express = require("express");

const RAIDS_ROUTER = express.Router();

RAIDS_ROUTER.post("/", async (req, res) => {
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

module.exports = RAIDS_ROUTER;
