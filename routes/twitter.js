const express = require("express");

const TWITTER_ROUTER = express.Router();

TWITTER_ROUTER.post("/", (req, res) => {
    req.CLIENT.guilds.cache
        .get(process.env.GUILD_ID)
        .channels.cache.get("685230036332445696")
        .send(req.body.content);

    res.send("Received");
});

module.exports = TWITTER_ROUTER;
