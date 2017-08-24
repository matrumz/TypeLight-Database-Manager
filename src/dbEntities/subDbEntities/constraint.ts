import * as sqliteModels from "../../models/sqite.models";

/* Abstracts and implementables */
export abstract class Constraint
{
    constructor(public name: string, protected type: sqliteModels.Constraint) { }
}

export interface IConflictableConstraint
{
    onConflict?: sqliteModels.ConstraintConflictResolution;
}

/* Specific Constraints */
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