const express = require("express");

const MEMBERS_ROUTER = express.Router();

MEMBERS_ROUTER.get("/", async (req, res) => {
    let address = [];
    await req
        .RAID_CENTRAL_V2_BASE("Member Registry")
        .select({
            view: "Grid view",
        })
        .eachPage(
            function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    address.push(record.get("Ethereum Address"));
                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    return res.json(address);
                }
            }
        );
});

module.exports = MEMBERS_ROUTER;
