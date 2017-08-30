import * as sqliteModels from "../../models/sqlite.models";
import * as helperObjects from "../../helpers/objects";
import * as helperFunctions from "../../helpers/functions";
import * as typeChecks from "../../services/typeCheck.service";

/* Abstracts and implementables */
export abstract class Constraint
{
    constructor(public name: string, public columns: string[] = []) { }

    public validate(): helperObjects.Summary
    {
        var summary: helperObjects.Summary = new helperObjects.Summary();

        if (this.name === null || helperFunctions.isNullOrWhitespace(this.name))
            summary.errorMessages.push("Name cannot be NULL or whitespace");

        if (!this.columns || !this.columns.length)
            summary.errorMessages.push("Constraints must reference at least one column");

        return summary;
    }
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
        columns: string[] = [],
        public autoIncrement: boolean = true,
        public order: sqliteModels.Order = "asc",
        public onConflict: sqliteModels.ConstraintConflictResolution = "abort"
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (!typeChecks.isSqliteOrder(this.order))
            summary.errorMessages.push("Order must be 'asc' or 'desc'");

        if (!typeChecks.isSqliteConstraintConflictResolution(this.onConflict))
            summary.errorMessages.push("Invalid conflict resolution type")

        return summary;
    }
}
export class FKConstraint extends Constraint
{
    constructor(
        name: string,
        columns: string[] = [],
        public parentTable: string = null,
        public parentColumn: string = null
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (helperFunctions.isNullOrWhitespace(this.parentColumn))
            summary.errorMessages.push("FKs must reference a parent column");

        if (helperFunctions.isNullOrWhitespace(this.parentTable))
            summary.errorMessages.push("FKs must reference a parent table");

        return summary;
    }
}
export class NotNullConstraint extends Constraint implements IConflictableConstraint
{
    constructor(
        name: string,
        columns: string[] = [],
        public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (!typeChecks.isSqliteConstraintConflictResolution(this.onConflict))
            summary.errorMessages.push("Invalid conflict resolution type")

        return summary;
    }
}
export class UniqueConstraint extends Constraint implements IConflictableConstraint
{
    constructor(
        name: string,
        columns: string[] = [],
        public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (!typeChecks.isSqliteConstraintConflictResolution(this.onConflict))
            summary.errorMessages.push("Invalid conflict resolution type")

        return summary;
    }
}
export class CheckConstraint extends Constraint implements IConflictableConstraint
{
    constructor(
        name: string,
        columns: string[] = [],
        public checkExpression: string = null,
        public onConflict: sqliteModels.ConstraintConflictResolution = "abort"
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (!typeChecks.isSqliteConstraintConflictResolution(this.onConflict))
            summary.errorMessages.push("Invalid conflict resolution type")

        if (helperFunctions.isNullOrWhitespace(this.checkExpression))
            summary.errorMessages.push("Check Expression cannot be NULL or whitespace")

        return summary;
    }
}
export class DefaultConstraint extends Constraint implements IConflictableConstraint
{
    constructor(
        name: string,
        columns: string[] = [],
        public onConflict: sqliteModels.ConstraintConflictResolution = "abort",
    )
    {
        super(name, columns);
    }

    public validate(): helperObjects.Summary
    {
        var summary = super.validate();

        if (!typeChecks.isSqliteConstraintConflictResolution(this.onConflict))
            summary.errorMessages.push("Invalid conflict resolution type")

        return summary;
    }
}