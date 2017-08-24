import * as schemaFiles from "../models/schemaFiles.models";

export interface IEntity
{
    name: string;
    database: string;
}

export abstract class Entity<T extends schemaFiles.SchemaEntityTypes> implements IEntity
{
    constructor(public name: string = null, public database = "master", entity: T | string = null)
    {
        if (typeof entity === "string") {
            this.parseCreate(entity)
        }
        else {
            this.parseJSON(entity);
        }
    }

    protected abstract parseCreate(create: string): void;
    protected abstract parseJSON(object: T): void;

    public abstract asCreate(): string;
    public abstract asJSON(): T;

}