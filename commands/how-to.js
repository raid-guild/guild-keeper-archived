module.exports = {
    name: "how-to",
    description: "Provides information on a specific how to.",
    execute(message, args) {
        const HOW_TO_APPRENTICE_ISSUE =
            `📜 To enable the bot to pick up apprentice issues from a raidguild’s repository,\n\n\t📍 Go to _settings_ of the repository.\n\t📍 Under _webhooks_, click on _add webhook_.\n\t📍 In the _payload URL_ field, enter ` +
            "`https://guild-keeper.herokuapp.com/payload`." +
            `\n\t📍 For _content type_, choose ` +
            "`application/json`." +
            `\n\t📍 Leave the _secret_ blank.\n\t📍 For _events_, choose ` +
            "`let me select individual events`" +
            ` and check **only** ` +
            "`Issues`" +
            ` checkbox.\n\t 📍 Check the _Active_ checkbox if not checked and click on _Add webhook_.\n\nNow, the repository is all set to send in updated to the guild keeper bot.\n\nTo add an _apprentice issue_, select the ` +
            "`apprentice-issue`" +
            ` label for the issue you want an apprentice to work on.\n\n_Note: Do not share or use the payload URL for any of the purposes apart from raidguild._`;

        if (args.length < 3)
            return message.channel.send("Missing command! How to with what?");

        switch (args[2]) {
            case "apprentice-issue":
                return message.channel.send(HOW_TO_APPRENTICE_ISSUE);
            default:
                return message.channel.send(
                    "Hmm.. I don't know what that how to does. Check `!keeper help`"
                );
        }
    },
};
