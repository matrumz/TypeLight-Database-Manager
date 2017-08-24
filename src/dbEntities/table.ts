import { Entity } from "./entity.abstract";
import { TableFile } from "../models/schemaFiles.models";
import * as sqliteModels from "../models/sqite.models";
import * as subEntities from "./subDbEntities/subDbEntities.grouping"

export class Table extends Entity<TableFile.ITable>
{
    constructor(
        public name: string,
        public database: string,
        public columns: subEntities.Column[] = [],
        public constraints: subEntities.Constraint[] = [],
        public triggers: subEntities.Trigger[] = []
    )
    {
        super(name, database);
    }

    protected parseCreate(create: string): void
    {

    }

    protected parseJSON(object: TableFile.ITable): void
    {

    }

    public asCreate(): string
    {
        return null;
    }

    public asJSON(): TableFile.ITable
    {
        return null;
    }
}