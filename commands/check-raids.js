module.exports = {
    name: "check-raids",
    description: "Returns the list of raids from the Airtable.",
    async execute(message, base) {
        let raidName = [];
        let raidData = {};

        await base("Raids")
            .select({
                fields: ["Name", "Status"],
                view: "Grid view",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach((record) => {
                        raidName.push(record.fields.Name);
                        raidData[record.fields.Name.toLowerCase()] = {
                            id: record.id,
                            status: record.fields.Status,
                        };
                    });
                    fetchNextPage();
                    message.channel.send(
                        `Got the following list of Raids from Airtable. \n **------** \n${raidName
                            .toString()
                            .replace(
                                /,/g,
                                "\n"
                            )} \n **------** \n To know a raid's status, use **!keeper status [raid-name]**`
                    );
                },
                function done(err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                }
            );
    },
};
