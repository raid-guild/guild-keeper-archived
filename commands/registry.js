module.exports = {
    name: "registry",
    description: "Used to add and update contact info of members.",
    async execute(message, args, registry_base) {
        if (args.length <= 2) return;

        let data = {};
        // !keeper registry email/test eth/addr ens/addr telegram/test twitter/test
        const options = [
            "email",
            "eth",
            "ens",
            "telegram",
            "twitter",
            "github",
        ];
        let values = {};
        let name = message.author.username;
        let discord_handle = `@${name}#${message.author.discriminator}`;

        for (let i = 2; i < args.length; i++) {
            let option = args[i].split("/")[0];
            let value = args[i].split("/")[1];
            if (options.includes(option)) {
                values[option] = value;
            } else {
                return message.channel.send(
                    `Invalid field name - _${option}_. Check ` +
                        "`!keeper help registry`."
                );
            }
        }

        await registry_base("Social Info")
            .select({
                fields: ["Name"],
                view: "Grid view",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach((record) => {
                        data[record.fields.Name] = {
                            id: record.id,
                        };
                    });
                    fetchNextPage();
                },
                function done(err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    Entry(
                        name,
                        discord_handle,
                        data,
                        values,
                        message,
                        registry_base
                    );
                }
            );
    },
};

const Entry = (name, discord_handle, data, values, message, registry_base) => {
    if (name in data) {
        registry_base("Social Info").update(
            [
                {
                    id: data[name].id,
                    fields: {
                        Name: name,
                        "Ethereum Address": values["eth"],
                        "ENS Address": values["ens"],
                        "Discord Handle": discord_handle,
                        "Telegram Handle": values["telegram"],
                        "Twitter Handle": values["twitter"],
                        "Github Handle": values["github"],
                        "Email Address": values["email"],
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.get("Name"));
                    return message.channel.send("Registry updated!");
                });
            }
        );
    } else {
        registry_base("Social Info").create(
            [
                {
                    fields: {
                        Name: name,
                        "Ethereum Address": values["eth"],
                        "ENS Address": values["ens"],
                        "Discord Handle": discord_handle,
                        "Telegram Handle": values["telegram"],
                        "Twitter Handle": values["twitter"],
                        "Github Handle": values["github"],
                        "Email Address": values["email"],
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
                    return message.channel.send("Registry has a new record!");
                });
            }
        );
    }
};
