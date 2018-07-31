import * as sqlite from "better-sqlite3";
import { IDbConnection } from "./IDbio";

class Writer implements IDbConnection
{
    constructor(
        public dbFileDir: string,
        public dbFileName: string,
        public fileMustExist: boolean = false
    )
    {

    }

    public get inMemory(): boolean
    {
        return false;
    }

    public get isReadOnly(): boolean
    {
        return false;
    }
}