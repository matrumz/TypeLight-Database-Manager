import * as sqliteModels from "../models/sqlite.models";
import { TableFile } from "../models/schemaFiles.models";

/** Typecheck for ITable type */
export function isITable(object: any): object is TableFile.ITable
{
    return (
        (<TableFile.ITable>object).name !== undefined
        && (<TableFile.ITable>object).database !== undefined
        && (<TableFile.ITable>object).columns !== undefined
    );
}

export function isSqliteOrder(object: any): object is sqliteModels.Order
{
    object = local.gentleLowerCase(object);

    return (
        object === "asc"
        || object === "desc"
    );
}

export function isSqliteConstraintConflictResolution(object: any): object is sqliteModels.ConstraintConflictResolution
{
    object = local.gentleLowerCase(object);

    return (
        object === "rollback"
        || object === "abort"
        || object === "fail"
        || object === "ignore"
        || object === "replace"
    );
}

export function isSqliteTriggerTime(object: any): object is sqliteModels.TriggerTime
{
    object = local.gentleLowerCase(object);

    return (
        object === "before"
        || object === "after"
        || object === "instead"
    );
}

export function isSqliteTriggerEvent(object: any): object is sqliteModels.TriggerEvent
{
    object = local.gentleLowerCase(object);

    return (
        object === "delete"
        || object === "insert"
        || object === "update"
    );
}

namespace local
{
    export function gentleLowerCase(object: any): any
    {
        try {
            return (<string>object).toLowerCase();
        }
        catch (e) {
            return object;
        }
    }
}