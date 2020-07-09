const PREFIX = "!keeper";
const HELP_MESSAGE =
    "WELCOME! HOW MAY I HELP?\n\n" +
    // "\t1. check-raids -- Lists the raids from Airtable.\n" +
    // "\t2. check-status -- Gets the status of a raid from Airtable.\n" +
    // "\t3. set-status -- Sets the status of a raid from Airtable.\n" +
    "**ACTIONABLE COMMANDS**\n" +
    "\t📍 `create-raid` -- Creates a raid channel and initializes it.\n" +
    "\t📍 `create-rip` -- Creates a rip channel and initializes it.\n" +
    "\t📍 `crypt` -- Crypts an raid/rip/client channel under the battlefield and client chat category.\n" +
    "\t📍 `role-stats` -- Returns number of people assigned to each role.\n" +
    "\t📍 `registry` -- Used to add or update your info in the registry.\n" +
    "\t📍 `treasury` -- Used to record a direct fund transfer to the guild.\n" +
    "\n**MORE HELP WITH ACTIONABLE COMMANDS**\n" +
    "_For help with a specific actionable command type `!keeper help <command>`\n" +
    "Example: for help with creating a raid channel, type `!keeper help create-raid`_\n" +
    "\n**HOW TO COMMANDS**\n" +
    "\t📍 `apprentice-issue` -- Provides information on how to set a repo for apprentice issues to be posted on _#apprentice-issue-alerts_.\n" +
    "\n**USING HOW TO COMMANDS**\n" +
    "There is no help for _how to commands_ as they are not actionable, so directly use `!keeper how-to <command>`. _Note_ commands, the prefix `how-to` should be added before the actual command.";

const STATUS_CODES = {
    0: "High Signal",
    1: "Prepping for Battle",
    2: "Yes",
    3: "Active Raids",
    4: "Completed",
    5: "Failed",
    6: "Declined",
};

exports.PREFIX = PREFIX;
exports.HELP_MESSAGE = HELP_MESSAGE;
exports.STATUS_CODES = STATUS_CODES;
