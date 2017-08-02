import * as clArgs from "command-line-args";
const clCommands = require("command-line-commands");

export class TLManager
{

}

/* CLI execution */
if (require.main === module) {
    const commandList: string[] = [
        "deploy",
        "generate"
    ];
    const optionsList: clArgs.OptionDefinition[] = [
        { name: "json", alias: "j", type: Boolean, defaultValue: true, group: "generate" },
        { name: "xml", alias: "x", type: Boolean, defaultValue: false, group: "generate" },
        { name: "databases", alias: "d", type: String, multiple: true, defaultValue: "db.sqlite3", group: ["deploy", "generate"] },
        { name: "clear", alias: "c", type: Boolean, defaultValue: false, group: "deploy" }
    ];

    try {
        const { command, argv } = clCommands(commandList);

        console.log("command:   %s", command);
        console.log("argv:      %s", JSON.stringify(argv));

        // const args = clArgs(optionsList, { partial: true, argv: argv });
        const args = clArgs(optionsList, { partial: true});

        console.log("args:      %s", JSON.stringify(args[command]));
    }
    catch (e) {
        console.error((<Error>e).message);
    }

    console.log("DONE")
}
