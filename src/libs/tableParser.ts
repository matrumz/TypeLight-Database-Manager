import * as models from "../models/typelite.models"
import * as fileModels from "../models/schemaFiles.models"
export type TableFile = fileModels.TableFile.ITable

import * as Parser from "./parser.abstract"

export class TableParser extends Parser.Parser<TableFile>
{
    constructor(source: TableFile | string)
    {
        super(source);
    }

    public test(): void
    {
        console.log((typeof this.source === "string") ? this.source : this.source.columns.pop().name);
    }

    protected parseToFileJSON(create: string): Q.Promise<models.ResultSummary<TableFile>>
    {
        return null;
    }

    protected parseToSqliteCreate(object: TableFile): Q.Promise<models.ResultSummary<string>>
    {
        return null;
    }

}