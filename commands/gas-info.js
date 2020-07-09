module.exports = {
    name: "gas-info",
    description: "Returns gas price stats.",
    execute(message, axios) {
        axios
            .get("https://ethgasstation.info/api/ethgasAPI.json")
            .then((res) => {
                let info = `🐆 Fast - ${res.data.fast / 10}\n🐇 Standard - ${
                    res.data.average / 10
                }\n🐌 Safelow - ${res.data.safeLow / 10}`;
                message.channel.send(info);
            })
            .catch((err) =>
                message.channel.send(`Something went wrong. Try again later!`)
            );
    },
};
