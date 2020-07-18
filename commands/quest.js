module.exports = {
    name: "quest",
    description: "Used to register quests.",
    execute(message, args, quests_base) {
        let quest_collection = ["tweet", "article", "issue"];

        if (args.length < 4)
            return message.channel.send(
                `Invalid number of arguments. Check **!keeper help quest**`
            );
        if (!quest_collection.includes(args[2]))
            return message.channel.send(
                "Quest type is either wrong or not formatted properly. Check **!keeper help quest**"
            );

        var pattern = new RegExp(
            "^" +
                // protocol identifier (optional)
                // short syntax // still required
                "(?:(?:(?:https?|ftp):)?\\/\\/)" +
                // user:pass BasicAuth (optional)
                "(?:\\S+(?::\\S*)?@)?" +
                "(?:" +
                // IP address exclusion
                // private & local networks
                "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broadcast addresses
                // (first & last IP address of each class)
                "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                "|" +
                // host & domain names, may end with dot
                // can be replaced by a shortest alternative
                // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
                "(?:" +
                "(?:" +
                "[a-z0-9\\u00a1-\\uffff]" +
                "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
                ")?" +
                "[a-z0-9\\u00a1-\\uffff]\\." +
                ")+" +
                // TLD identifier name, may end with dot
                "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
                ")" +
                // port number (optional)
                "(?::\\d{2,5})?" +
                // resource path (optional)
                "(?:[/?#]\\S*)?" +
                "$",
            "i"
        );

        if (!pattern.test(args[3]))
            return message.channel.send(`That doesn't seem like a valid link!`);

        let name = message.author.username;
        let quest_type = args[2].charAt(0).toUpperCase() + args[2].slice(1);
        let link = args[3];
        let submission_from = "";

        if (
            message.member.roles.member._roles.includes(
                process.env.MEMBER_ROLE_ID
            )
        ) {
            submission_from = "RaidGuild Member";
        } else if (
            message.member.roles.member._roles.includes(
                process.env.APPRENTICE_ROLE_ID
            )
        ) {
            submission_from = "Apprentice";
        } else {
            return message.channel.send(
                "Quests are available for only apprentice and raid guild members."
            );
        }

        quests_base("Quests").create(
            [
                {
                    fields: {
                        Name: name,
                        Link: link,
                        "Quest Type": quest_type,
                        "Submission From": submission_from,
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                    return message.channel.send(
                        "Your submission is successful. Thanks!"
                    );
                });
            }
        );
    },
};
