module.exports = {
    name: "check-status",
    description: "Returns the status of a raid.",
    execute(message, args, data) {
        if (args.length != 3)
            return message.channel.send("Provide the name of the raid!");

        if (!(args[2].toLowerCase() in data))
            return message.channel.send(
                "Oops! I couldn't find a raid with that name!"
            );

        message.channel.send(
            `The status of raid - **${args[2].toLowerCase()}** is ${
                data[args[2].toLowerCase()].status === undefined
                    ? "not registered."
                    : `registered as **${data[args[2].toLowerCase()].status}**.`
            }`
        );
    },
};
