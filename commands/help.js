module.exports = {
    name: "help",
    description: "Returns the list of available commands for use.",
    execute(message, args) {
        const CREATE_RAID = `🗡 To create a raid channel, use **!keeper create-raid [the-project-name (no spaces)] [link to the project proposal (must be a link)] [mention party member1] [mention party member2] [mention if anyone else is involved]**. By default, the person who sends this commands will be included in the party without an explicit mention.`;
        const CREATE_RIP = `🗡 To create a rip channel, use **!keeper create-rip [the-project-name (no spaces)] [link to the project proposal (must be a link)] [mention party member1] [mention party member2] [mention if anyone else is involved]**. By default, the person who sends this commands will be included in the party without an explicit mention.`;
        const CRYPT = `🗡 To crypt one, navigate to the raid/rip/client channel you wanna crypt and use **!keeper crypt**.`;
        const CHECK_RAIDS = `🗡 To view all raids registered in Airtable, use **!keeper check-raids**.`;
        const CHECK_STATUS = `🗡 To check the status of a particular raid from Airtable, use **!keeper check-status [raid-name]**.`;
        const SET_STATUS = `🗡 To set/update the status of particular raid, use **!keeper set-status [raid-name] [STATUS_CODE]**. Below are the available status codes.\n\t**0** -- High Signal\n\t**1** -- Prepping for Battle\n\t**2** -- Yes\n\t**3** -- Active Raids\n\t**4** -- Completed\n\t**5** -- Failed\n\t**6** -- Declined.\n_NOTE: Only members can use this command. If a non-member uses it, other RG members will be alerted._`;
        const ROLE_STATS = `🗡 Returns the total number of members assigned to each role.`;
        const REGISTRY = `🗡 To add or update your information in the registry, use **!keeper registry [options]**. Options include \n1. email/[your email]\n2. eth/[your eth address]\n3. ens/[your ens address]\n4. telegram/[your telegram handle]\n5. twitter/[your twitter handle]\n6. github/[your github username]\n\nFor example, to add or update your eth address, use **!keeper registry eth/[address]** or if you want to add or update more than one info, chain options like **!keeper registry eth/[address] twitter/[handle]**`;
        const TREASURY = `🗡 To record a direct transfer into the DAO bank, use **!keeper treasury "brief description" etherscan-link**.\n_Note: Quotation marks "" are required enclosing the "description"._`;
        const GAS_INFO = `🗡 Returns the live gas price stats.`;

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
            case "registry":
                return message.channel.send(REGISTRY);
            case "treasury":
                return message.channel.send(TREASURY);
            case "gas-info":
                return message.channel.send(GAS_INFO);
            default:
                return message.channel.send(
                    "Hmm.. I don't know what that command does. Check `!keeper help`"
                );
        }
    },
};
