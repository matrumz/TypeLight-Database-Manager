import * as jobs from "./dbJobs";
import * as helpers from "../helpers/objects";
import { IEntity, Entity } from "../dbEntities/entity.abstract";

export function create(job: jobs.DBCreateJob<any>): helpers.Summary
{
    return null;
}

export function alter(job: jobs.DBAlterJob<any>): helpers.Summary
{
    return null;
}

export function copy(path: string): helpers.ResultSummary<Entity<any>[]>
{
    return null;
}

export function find(path: string, entity: IEntity): Entity<any>[]
{
    return null;
}