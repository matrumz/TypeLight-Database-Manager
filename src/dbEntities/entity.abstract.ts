import * as schemaFiles from "../models/schemaFiles.models";
import { Summary } from "../helpers/objects";

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

    protected abstract parseCreate(create: string): Summary;
    protected abstract parseJSON(object: T): Summary;

    protected onParseError(e: Error, offendingObjectName: string, entityTypeName: string): Summary
    {
        this.clear();
        return new Summary(
            ["Failed to parse " + entityTypeName + ": due to " + offendingObjectName + ": " + e.message]
        );
    }

    public abstract clear(): Entity<T>

    public abstract asCreate(): string;
    public abstract asJSON(): T;

}