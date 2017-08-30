import { Entity } from "./entity.abstract";
import { TableFile } from "../models/schemaFiles.models";
import * as sqliteModels from "../models/sqlite.models";
import * as subEntities from "./subDbEntities/subDbEntities.grouping";
import * as helperObjects from "../helpers/objects";
import * as converters from "../services/dataConversion.service";

export class Table extends Entity<TableFile.ITable>
{
    constructor(
        public name: string,
        public database: string,
        entity: TableFile.ITable | string = null
    )
    {
        super(name, database, entity);
    }

    public columns: subEntities.Column[] = [];
    public constraints: subEntities.Constraint[] = [];
    public triggers: subEntities.Trigger[] = [];

    protected parseCreate(create: string): helperObjects.Summary
    {
        var summary = new helperObjects.Summary();
        this.clear();

        return summary;
    }

    protected parseJSON(object: TableFile.ITable): helperObjects.Summary
    {
        var summary = new helperObjects.Summary();
        this.clear();

        this.name = object.name;
        this.database = object.database;

        /* Columns */
        try {
            this.columns = object.columns.map((fileColumn) =>
            {
                return new subEntities.Column(
                    fileColumn.name,
                    fileColumn.type
                );
            });
        }
        catch (e) {
            summary.append(this.onParseError(e, "column", "table"));
        }

        /* Constraints */
        try {
            this.constraints = object.constraints.map((fileConstraint) =>
            {
                return converters.FileToEntity.TableConstraint(fileConstraint);
            });
        }
        catch (e) {
            summary.append(this.onParseError(e, "constraint", "table"));
        }

        //TODO: triggers

        return summary;
    }

    public clear(): Table
    {
        this.columns = [];
        this.constraints = [];
        this.triggers = [];

        return this;
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