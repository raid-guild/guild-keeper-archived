module.exports = {
    name: "role-stats",
    description: "Returns total members in each role",
    execute(message) {
        let returnMessage = "";
        let filterRoles = [
            "@everyone",
            "nodered",
            "1up",
            "Nurevam",
            "RaidGuild",
            "Fantastic12",
            "Simple Poll",
        ];
        message.guild.roles.cache.forEach((role) => {
            if (!filterRoles.includes(role.name)) {
                let count = message.guild.roles.cache.get(role.id).members.size;
                returnMessage =
                    returnMessage +
                    `${role.name} -- _**(${count} people)**_` +
                    "\n";
            }
        });

        message.channel.send(returnMessage);
    },
};
