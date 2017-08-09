import * as models from "../models/typelite.models"
import * as fileModels from "../models/schemaFiles.models"

export function ResultSummaryInstance<T>(data: T = null, summary: models.Summary = new models.Summary()): models.ResultSummary<T>
{
    return { data: data, summary: summary }
}