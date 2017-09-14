import * as models from "../models/typelite.models";
import * as fileModels from "../models/schemaFiles.models";
import * as subDbEntities from "../dbEntities/subDbEntities/subDbEntities.grouping";

export function IEntityExistsOptionsInstance(alterIfExists: boolean = null, errorIfExists: boolean = null): models.IEntityExistsOptions
{
    return {
        alterIfExists: alterIfExists,
        errorIfExists: errorIfExists
    };
}

export function IDeploymentOptionsInstance(path: string = null, entityExistsOptions: models.IEntityExistsOptions = IEntityExistsOptionsInstance()): models.IDeploymentOptions
{
    return {
        path: path,
        entityExistsOptions: entityExistsOptions
    };
}
