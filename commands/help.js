module.exports = {
    name: "help",
    description: "Returns the list of available commands for use.",
    execute(message, args) {
        const CREATE_RAID = `To create a raid channel, use **!keeper create-raid [the-project-name (no spaces)] [link to the project proposal (must be a link)] [mention party member1] [mention party member2] [mention if anyone else is involved]**. By default, if no party members are mentioned, the person who sends this commands will be included without an explicit mention.`;
        const CREATE_RIP = `To create a rip channel, use **!keeper create-rip [the-project-name (no spaces)] [link to the project proposal (must be a link)] [mention party member1] [mention party member2] [mention if anyone else is involved]**. By default, if no party members are mentioned, the person who sends this commands will be included without an explicit mention.`;
        const CRYPT = `To crypt one, navigate to the raid/rip/client channel you wanna crypt and use **!keeper crypt**.`;
        const CHECK_RAIDS = `To view all raids registered in Airtable, use **!keeper check-raids**.`;
        const CHECK_STATUS = `To check the status of a particular raid from Airtable, use **!keeper check-status [raid-name]**.`;
        const SET_STATUS = `To set/update the status of particular raid, use **!keeper set-status [raid-name] [STATUS_CODE]**. Below are the available status codes.\n\t**0** -- High Signal\n\t**1** -- Prepping for Battle\n\t**2** -- Yes\n\t**3** -- Active Raids\n\t**4** -- Completed\n\t**5** -- Failed\n\t**6** -- Declined.\n_NOTE: Only members can use this command. If a non-member uses it, other RG members will be alerted._`;
        const ROLE_STATS = `Returns the total number of members assigned to each role.`;

        if (args.length < 3)
            return message.channel.send("Missing command! Help with what?");

        switch (args[2]) {
            case "create-raid":
                return message.channel.send(CREATE_RAID);
            case "create-rip":
                return message.channel.send(CREATE_RIP);
            case "crypt":
                return message.channel.send(CRYPT);
            case "check-status":
                return message.channel.send(CHECK_STATUS);
            case "check-raids":
                return message.channel.send(CHECK_RAIDS);
            case "set-status":
                return message.channel.send(SET_STATUS);
            case "role-stats":
                return message.channel.send(ROLE_STATS);
            default:
                return message.channel.send(
                    "Hmm.. I don't know what that command does. Do you know?"
                );
        }
    },
};
