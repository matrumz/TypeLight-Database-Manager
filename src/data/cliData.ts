import * as clArgs from "command-line-args";
import clUsage = require("command-line-usage");

/* Set each command as a const that will be reused multiple times */
const
    generateSchema: string = "generateschema",
    deploySchema: string = "deployschema",

    generateModel: string = "generatemodel",

    setDb: string = "setdb",
    setSchemaWorkspace: string = "setschemaworkspace",
    setModelWorkspace: string = "setmodelworkspace";

const commandData: { name: string, summary: string }[] = [
    { name: generateSchema, summary: "Generates representation files from the current database." },
    { name: deploySchema, summary: "Creates or updates database from current representation files." },
    { name: generateModel, summary: "Creates or updates object model typings files from current database or representation files." },
    { name: setDb, summary: "Sets the current database to a sqlite file that may or may not currently exist." },
    { name: setSchemaWorkspace, summary: "Sets the current representation file workspace to a directory that may or may not currently exist." },
    { name: setModelWorkspace, summary: "Sets the current model typings files workspace to a directory that may or may not currently exist." },
];

/** Commands available for typelite */
export const commands: string[] = commandData.map((cmd) => { return cmd.name; })

/** Options for all commands available in typelite */
export const options: clArgs.OptionDefinition[] | clUsage.OptionDefinition[] = [
    {
        name: "help",
        alias: "h",
        type: Boolean,
        multiple: false
    },
    {
        name: "database",
        alias: "d",
        description: "Specify a SQLite database file.",
        type: String,
        multiple: false,
        typeLabel: "{underline file-name}",
        group: [generateSchema, deploySchema, generateModel]
    }
]
