import { Entity } from "./entity.abstract";
import { TableFile } from "../models/schemaFiles.models";
import * as sqliteModels from "../models/sqlite.models";
import * as subEntities from "./subDbEntities/subDbEntities.grouping";
import * as helperObjects from "../helpers/objects";
import * as converters from "../services/dataConversion.service";

export class Table extends Entity<TableFile.ITable>
{
    constructor(
        name: string,
        database: string,
        entity: TableFile.ITable | string = null
    )
    {
        super(name, database, entity);
    }

    public columns: subEntities.Column[];
    public constraints: subEntities.Constraint[];
    public triggers: subEntities.Trigger[];

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
        if (object.columns instanceof Array) {
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
        }
        else
            this.columns = [];

        /* Constraints */
        if (object.constraints instanceof Array) {
            try {
                this.constraints = object.constraints.map((fileConstraint) =>
                {
                    return converters.FileToEntity.TableConstraint(fileConstraint);
                });
            }
            catch (e) {
                summary.append(this.onParseError(e, "constraint", "table"));
            }
        }
        else
            this.constraints = [];

        /* Triggers */
        if (object.triggers instanceof Array) {
            try {
                this.triggers = object.triggers.map((fileTrigger) =>
                {
                    return new subEntities.Trigger(
                        fileTrigger.name,
                        fileTrigger.when,
                        fileTrigger.event,
                        fileTrigger.eventColumns,
                        fileTrigger.condition,
                        fileTrigger.executeStatements
                    );
                });
            }
            catch (e) {
                summary.append(this.onParseError(e, "trigger", "table"));
            }
        }
        else
            this.triggers = [];

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
        return {
            name: this.name,
            database: this.database,
            columns: (this.columns || []).map((column): TableFile.IColumn =>
            {
                return {
                    name: column.name,
                    type: column.type
                };
            }),
            constraints: (this.constraints || []).map((constraint): TableFile.IConstraint =>
            {
                return converters.EntityToFile.TableConstraint(constraint);
            }),
            triggers: (this.triggers || []).map((trigger): TableFile.ITrigger =>
            {
                return {
                    name: trigger.name,
                    when: trigger.when,
                    event: trigger.event,
                    eventColumns: trigger.eventColumns,
                    condition: trigger.condition,
                    executeStatements: trigger.executeStatements
                };
            })
        };
    }
}