import * as clArgs from "command-line-args";

export namespace CLI
{
    export const commands: string[] = [
        //"generate",
        "deploy",
        "test",
        "debug"
    ];

    export const options: clArgs.OptionDefinition[] = [
        { name: "xml", alias: "x", type: Boolean, defaultValue: false, group: ["deploy", "generate"] }, // Should read/write be done in XML vs JSON?
        { name: "schema", alias: "s", type: String, multiple: false, defaultValue: "./", group: ["deploy", "generate"] }, // Directory of source files (schema, row, and event files)
        { name: "databases", alias: "d", type: String, multiple: true, defaultValue: "master.sqlite3", group: ["deploy", "generate"] }, // Source/destination db(s) (with path)
        { name: "clean", alias: "c", type: Boolean, defaultValue: false, group: "deploy" } // Should existing db files be cleaned when deployed to, or should existing data remain?
    ];
}