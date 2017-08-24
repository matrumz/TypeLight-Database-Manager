import { Entity, IEntity } from "../dbEntities/entity.abstract";
import * as models from "../models/typelite.models";

export interface IDBJob<entity extends Entity<any>>
{
    path: string;
    object: entity;
}

export class DBAlterJob<entity extends Entity<any>> implements IDBJob<entity>
{
    constructor(
        public path: string = null,
        public object: entity = null,
        public existingEntity: IEntity = { name: null, database: null }
    ) { }
}

export class DBCreateJob<entity extends Entity<any>> implements IDBJob<entity>
{
    constructor(
        public path: string = null,
        public object: entity = null,
        public entityExistsOptions: models.IEntityExistsOptions = { alterIfExists: true, errorIfExists: false }
    ) { }
}