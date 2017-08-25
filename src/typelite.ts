import * as clArgs from "command-line-args";
const clCommands = require("command-line-commands");
import * as constants from "./services/dataConstants.service";
import * as models from "./models/typelite.models";

export class Typelite
{
    constructor() { }

    // export function deploy(entities: )
}

/* CLI execution */
if (require.main === module) {
    /* Parse CLI */
    try {
        /* Get the typelite command and arguments */
        const { command, argv } = clCommands(constants.CLI.commands);
        /* Parse the CLI options that go with the current command */
        const args: any = clArgs(constants.CLI.options, { partial: true })[command];

        // console.log("command:   %s", command);
        // console.log("argv:      %s", JSON.stringify(argv));
        // console.log("args:      %s", JSON.stringify(args));

        switch (command) {
            case "deploy":
                cli.deploy({
                    xml: args.xml,
                    clean: args.clean,
                    schema: args.schema,
                    databases: args.databases
                });
                break;
            case "generate":
                cli.generate({

                });
                break;
        }
    }
    catch (e) {
        console.error((<Error>e).message);

    }
}

namespace cli
{
    export function deploy(params: models.ICliDeployParams): void
    {

    }

    export function generate(params: models.ICliGenerateParams): void
    {

    }
}