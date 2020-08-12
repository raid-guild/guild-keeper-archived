module.exports = {
    name: "crypt",
    description: "Crypts any channel.",
    execute(message) {
        let category = message.guild.channels.cache.find(
            (c) => c.name == "crypt-090120" && c.type == "category"
        );

        if (message.channel.parentID == process.env.CRYPT_CHANNEL_ID) {
            message.channel.send("This is already crypted!");
            return;
        }

        message.channel.setParent(category.id);
        message.channel.send("Command executed & crypted.");
    },
};
