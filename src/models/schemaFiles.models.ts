export namespace TableFile
{
    /** Represents the entire table file */
    export interface ITable
    {
        columns: IColumn[],
        constraints?: IConstraint[],
        triggers?: ITrigger[]
    }

    /** Column record */
    export interface IColumn
    {
        name: string,
        type: string
    }

    /** Generic constraint record */
    export interface IConstraint
    {
        name: string,
        type: "pk" | "fk" | "nullable" | "unique" | "check",
        columns: string[]
    }
    export namespace ConstraintTypes
    {
        export type constraintConflictResolution = "rollback" | "abort" | "fail" | "ignore" | "replace" // "abort" is sqlite default
        export interface IPKConstraint extends IConstraint
        {
            onConflict?: constraintConflictResolution
            order?: "asc" | "desc",
            autoIncrement?: boolean
        }
        export interface IFKConstraint extends IConstraint
        {
            parentTable: string,
            parentColumn: string
        }
        export interface INotNullConstraint extends IConstraint
        {
            onConflict?: constraintConflictResolution
        }
        export interface IUniqueConstraint extends IConstraint
        {
            onConflict?: constraintConflictResolution
        }
        export interface ICheckConstraint extends IConstraint
        {
            expression: string
            onConflict?: constraintConflictResolution
        }
        export interface IDefaultConstraint extends IConstraint
        {
            onConflict?: constraintConflictResolution
        }
    }

    /** Generic trigger record */
    export interface ITrigger
    {

    }
}

export namespace ViewFile
{
    export interface IView
    {

    }
}