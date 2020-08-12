module.exports = {
    name: "help",
    description: "Returns the list of available commands for use.",
    execute(message, args) {
        const CRYPT = `🗡 To crypt one, navigate to the channel you wanna crypt and use **!keeper crypt**.`;
        const ROLE_STATS = `🗡 Returns the total number of members assigned to each role.`;
        const TREASURY = `🗡 To record a direct transfer into the DAO bank, use **!keeper treasury "brief description" etherscan-link**.\n_Note: Quotation marks "" are required enclosing the "description"._`;
        const GAS_INFO = `🗡 Returns the live gas price stats.`;

        if (args.length < 3)
            return message.channel.send("Missing command! Help with what?");

        switch (args[2]) {
            case "crypt":
                return message.channel.send(CRYPT);
            case "role-stats":
                return message.channel.send(ROLE_STATS);
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
