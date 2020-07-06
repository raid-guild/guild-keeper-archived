const PREFIX = "!keeper";
const HELP_MESSAGE =
    "Hi! Am the Guild Keeper here. Here's my list of commands.\n\n" +
    // "\t1. check-raids -- Lists the raids from Airtable.\n" +
    // "\t2. check-status -- Gets the status of a raid from Airtable.\n" +
    // "\t3. set-status -- Sets the status of a raid from Airtable.\n" +
    "\t1. `create-raid` -- Creates a raid channel and initializes it.\n" +
    "\t2. `create-rip` -- Creates a rip channel and initializes it.\n" +
    "\t3. `crypt` -- Crypts an raid/rip/client channel under the battlefield and client chat category.\n" +
    "\t4. `role-stats` -- Returns number of people assigned to each role.\n" +
    "\t5. `registry` -- Used to add or update your info in the registry.\n" +
    "\t6. `treasury` -- Used to record a direct fund transfer to the guild.\n" +
    "\nI can also send in apprentice issues from any of the raidguild's repo to discord." +
    " If you want more info please see the **GuildKeeper docs:** https://hackmd.io/@saimano/guild-keeper\n" +
    "\nFor help with a specific command type `!keeper help <command>`\n" +
    "\nExample: for help with creating a raid channel, type `!keeper help create-raid`";

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
