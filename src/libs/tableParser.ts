import * as fileModels from "../models/schemaFiles.models"
export type TableFile = fileModels.TableFile.ITable

import Parser from "./parser.abstract"

export default class TableParser extends Parser<TableFile>
{
    constructor(source: TableFile | string)
    {
        super(source);
    }

    public test(): void
    {
        console.log((typeof this.source === "string") ? this.source : this.source.columns.pop().name);
    }
}