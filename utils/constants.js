const PREFIX = "!keeper";
const HELP_MESSAGE = [
    {
        name: "crypt",
        value: "Crypts any channel.",
    },
    {
        name: "treasury",
        value: "Used to record a direct fund transfer to the guild.",
    },
    {
        name: "role-stats",
        value: "Returns number of people assigned to each role.",
    },
    {
        name: "inactive-stats",
        value: "Returns total inactive members & their usernames.",
    },
    {
        name: "gas-info",
        value: "Returns live gas prices.",
    },
];

exports.PREFIX = PREFIX;
exports.HELP_MESSAGE = HELP_MESSAGE;
