module.exports = {
    name: "crypt-raid-rip",
    description: "Moves a raid/rip from battlefield to crypted raids.",
    execute(message, MEMBER_ROLE_ID) {
        let channel_name_split = message.channel.name.split("-");
        let category = message.guild.channels.cache.find(
            (c) => c.name == "crypt-closed-raids" && c.type == "category"
        );

        if (message.channel.parentID == process.env.CRYPT_CLOSED_RAID_ID) {
            message.channel.send("This is already crypted!");
            return;
        }

        if (
            message.channel.parentID == process.env.BATTLEFIELD_ID ||
            message.channel.parentID == process.env.CLIENT_CHAT_ID
        ) {
            message.channel.setParent(category.id);
            message.channel.send(
                `Attention! This **${channel_name_split[0].toUpperCase()}** is now crypted.`
                //<@&${MEMBER_ROLE_ID}>!
            );
        } else {
            message.channel.send(
                "Only **RAID**, **RIP** & **CLIENT CHAT** channels can be crypted!"
            );
        }
    },
};
