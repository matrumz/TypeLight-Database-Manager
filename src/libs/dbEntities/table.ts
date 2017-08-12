import * as sqliteModels from "../../models/sqite.models";

export class Table
{
    constructor(
        public name: string,
        public columns: TableObjects.IColumn[] = [],
        public constraints: TableObjects.Constraints.Constraint[] = [],
        public triggers: TableObjects.Trigger[] = []
    ) { }
}

export namespace TableObjects
{
    export interface IColumn
    {
        name: string,
        type: sqliteModels.SqliteData;
    }

    export namespace Constraints
    {
        export interface IConflictableConstraint
        {
            onConflict?: sqliteModels.ConstraintConflictResolution
        }
        export abstract class Constraint
        {
            constructor(public name: string, protected type: sqliteModels.Constraint) { }
        }
        export class PKConstraint extends Constraint implements IConflictableConstraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
                public order: sqliteModels.Order = "asc",
                public autoIncrement = true
            )
            {
                super(name, type);
            }
        }
        export class FKConstraint extends Constraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public parentTable: string,
                public parentColumn: string
            )
            {
                super(name, type);
            }
        }
        export class NotNullConstraint extends Constraint implements IConflictableConstraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
            )
            {
                super(name, type);
            }
        }
        export class UniqueConstraint extends Constraint implements IConflictableConstraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
            )
            {
                super(name, type);
            }
        }
        export class CheckConstraint extends Constraint implements IConflictableConstraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
                public checkExpression: string
            )
            {
                super(name, type);
            }
        }
        export class DefaultConstraint extends Constraint implements IConflictableConstraint
        {
            constructor(
                name: string,
                type: sqliteModels.Constraint,
                public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
            )
            {
                super(name, type);
            }
        }
    }

    export class Trigger
    {
        constructor() { }
    }
}