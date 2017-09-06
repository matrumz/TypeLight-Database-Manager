import * as clArgs from "command-line-args";
import clCommands = require("command-line-commands");
import * as constants from "./services/dataConstants.service";
import * as models from "./models/typelite.models";
import * as fsio from "./fsio/fsio.grouping";
import * as path from "path";
import * as fs from "fs";
import { Memory } from "./services/dataStore.service";
import * as helperObjects from "./helpers/objects";

export class Typelite
{
    constructor(cliMode: boolean = false)
    {
        /* Load some initial values into session storage */
        Memory.cliMode = cliMode;
        try {
            /*
             * This one time, we are assuming the encoding of a file is UTF8.
             * That will be a noted requirement in the documentation.
             */
            Memory.config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../typeliteconfig.json")).toString());
        }
        catch (e) {
            throw new Error("Could not load configuration file: " + (<Error>e).message);
        }
    }

    // public deploy(entities: )

    public test(): void
    {
        var filesContents: helperObjects.ResultSummary<string[]> = fsio.read(fsio.find('../test', true, 'json', "good.*"));
    }
}

namespace CLI
{
    export function deploy(params: models.ICliDeployParams): void
    {

    }

    export function generate(params: models.ICliGenerateParams): void
    {

    }

    export function test(): void
    {
        var typelite = new Typelite(true);
        typelite.test();
    }
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
                CLI.deploy({
                    xml: args.xml,
                    clean: args.clean,
                    schema: args.schema,
                    databases: args.databases
                });
                break;
            case "generate":
                CLI.generate({

                });
                break;
            case "test":
                CLI.test();
                break;
        }
    }
    catch (e) {
        console.error((<Error>e).message);
    }
}