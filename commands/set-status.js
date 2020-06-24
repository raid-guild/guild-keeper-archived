module.exports = {
    name: "set-status",
    description: "Sets the status of a raid.",
    execute(message, args, data, MEMBER_ROLE_ID, STATUS_CODES) {
        if (message.author.id !== MEMBER_ROLE_ID)
            return message.channel.send(
                `You don't have the permissions. Only <@&${MEMBER_ROLE_ID}>! can do that ;)`
            );

        base("Raids").update(
            [
                {
                    id: data[args[2].toLowerCase()].id,
                    fields: {
                        Status: STATUS_CODES[args[3]],
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                return message.channel.send(
                    `The Status of **${args[2]}** is now **${
                        STATUS_CODES[args[3]]
                    }**.`
                );
            }
        );
    },
};
