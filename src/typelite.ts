import * as clArgs from "command-line-args";
const clCommands = require("command-line-commands");
import * as fileModels from "./models/schemaFiles.models"
import { TableParser } from "./libs/tableParser"

export class TLManager
{

}

/* CLI execution */
if (require.main === module) {
    const commandList: string[] = [
        "deploy"//,
        // "generate" // ONLY WORKING ON DEPLOY, ATM
    ];
    const optionsList: clArgs.OptionDefinition[] = [
        { name: "xml", alias: "x", type: Boolean, defaultValue: false, group: ["deploy", "generate"] }, // Should read/write be done in XML vs JSON?
        { name: "source", alias: "s", type: String, multiple: false, defaultValue: "./", group: ["deploy", "generate"] }, // Directory of source files (schema, row, and event files)
        { name: "databases", alias: "d", type: String, multiple: true, defaultValue: "db.sqlite3", group: ["deploy", "generate"] }, // Source/destination db(s) (with path)
        { name: "clean", alias: "c", type: Boolean, defaultValue: false, group: "deploy" } // Should existing db files be cleaned when deployed to, or should existing data remain?
    ];

    try {
        const { command, argv } = clCommands(commandList);

        console.log("command:   %s", command);
        console.log("argv:      %s", JSON.stringify(argv));

        const args = clArgs(optionsList, { partial: true });

        console.log("args:      %s", JSON.stringify(args[command]));
    }
    catch (e) {
        console.error((<Error>e).message);
    }

    var testObj: fileModels.TableFile.ITable = {
        "columns": [
            { name: "col1", type: "string" }
        ]
    }

    // let objTable = new TableParser(testObj);
    // let strTable = new TableParser("test")
    // objTable.test();
    // strTable.test();

    console.log("DONE")
}
