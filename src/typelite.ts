import * as clArgs from "command-line-args";
import clCommands = require("command-line-commands");
import * as constants from "./services/dataConstants.service";
import * as models from "./models/typelite.models";
import * as fsio from "./fsio/fsio.grouping";
import * as path from "path";
import * as fs from "fs";
import { Memory } from "./services/dataStore.service";
import * as helperObjects from "./helpers/objects";
import * as typeChecker from "./services/typeCheck.service";
import { Table } from "./dbEntities/table";
import * as dataModel from "./services/dataModel.service";
import * as assert from "assert";

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

    public debug(): void
    {

    }

    public test(): void
    {
        var results = new helperObjects.ResultSummary<Table[]>();
        results.data = [];

        var filesContents: helperObjects.ResultSummary<string[]> = fsio.read(fsio.find(__dirname + path.sep + '../test', true, 'json', "read_.*"));
        var filesAsJSON: any[] = [];

        filesContents.data.forEach((content) =>
        {
            var obj = JSON.parse(content);
            filesAsJSON.push(obj);
        });

        filesAsJSON.forEach((obj) =>
        {
            if (typeChecker.isITable(obj)) {
                var t: Table = new Table(null, null, obj);
                results.data.push(t);
            }
        });

        var resultsDir: string = __dirname + path.sep + "../test/results/";
        var writeJobs = results.data.map((table) =>
        {
            return new fsio.FSWriteJob(
                [table.database || "", "table", table.name || "", "json"].join("."),
                resultsDir,
                JSON.stringify(table.asJSON())
            );
        });

        results.summary.append(fsio.write(writeJobs));
        if (results.summary.errorMessages.length)
            throw new Error("Error writing schema files");

        var reloadedTables: Table[] =
            fsio.read(fsio.find(resultsDir, false, "json"))
                .data.map((content) =>
                {
                    return new Table(null, null, JSON.parse(content));
                });

        assert.deepEqual(reloadedTables, results.data, "Load results do not match.");
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

    export function debug(): void
    {
        var typelite = new Typelite(true);
        typelite.debug();
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
    /* Get the typelite command and arguments */
    const { command, argv } = clCommands(constants.CLI.commands);
    /* Parse the CLI options that go with the current command */
    const args: any = clArgs(constants.CLI.options, { partial: true })[command];

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
        case "debug":
            CLI.debug();
            break;
        case "test":
            CLI.test();
            break;
    }
}