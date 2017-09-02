import * as sqliteModels from "./sqlite.models";

export namespace TableFile
{
    /** Represents the entire table file */
    export interface ITable
    {
        name: string,
        database: string,
        columns: IColumn[],
        constraints?: IConstraint[],
        triggers?: ITrigger[]
    }

    /** Column record */
    export interface IColumn
    {
        name: string,
        type: sqliteModels.SqliteData
    }

    /** Generic constraint record */
    export interface IConstraint
    {
        name: string,
        type: sqliteModels.Constraint
        columns: string[]
    }
    export namespace ConstraintTypes
    {
        export type constraintConflictResolution = sqliteModels.ConstraintConflictResolution
        export interface IPKConstraint extends IConstraint
        {
            onConflict?: constraintConflictResolution
            order?: sqliteModels.Order
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
        name: string,
        when: sqliteModels.TriggerTime,
        event: sqliteModels.TriggerEvent,
        eventColumns?: string[],
        condition?: string,
        executeStatements: string[]
    }
}

export namespace ViewFile
{
    export interface IView
    {

    }
}

export type SchemaEntityTypes = TableFile.ITable | ViewFile.IView