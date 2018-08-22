#!/usr/bin/env node
console.log("starting");

import clCommands = require("command-line-commands");
import clArgs = require("command-line-args");
import * as clData from "./data/cliData";

class CLI
{
    public static run()
    {
        /*
         * Parse CLI,
         * Get the amwebs command and arguments
         */
        /* Get command */
        try {
            let parsedCmd = clCommands(clData.commands);
            var argv = parsedCmd.argv;
            var command = parsedCmd.command || "help";
        }
        catch (e) {
            // console.log(clData.usage.amwebs);
            return;
        }
        /* Get args */
        try {
            var args = clArgs(clData.options, { argv: argv, partial: true, camelCase: true });
            var commandArgs = args[command];
        }
        catch (e) {
            // console.log(clData.usage[command]);
            return;
        }

        /* Help messages */
        if (args._all.help) {
            if (command) {
                // console.log(clData.usage[command] || "There is no help for this command.");
            }
            else {
                console.log(clData.commands)
            }
            return;
        }

        console.log(commandArgs);
    }
}
CLI.run();
