import * as sqliteModels from "../../models/sqite.models";

export class Column
{
    constructor(public name: string, public type: sqliteModels.SqliteData) { }
}