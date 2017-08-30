import * as sqliteModels from "../../models/sqlite.models";

export class Column
{
    constructor(public name: string, public type: sqliteModels.SqliteData) { }
}