import { TableFile } from "../models/schemaFiles.models"

/** Typecheck for ITable type */
export function isITable(object: any): object is TableFile.ITable
{
    return (
        (<TableFile.ITable>object).columns !== undefined
    )
}
