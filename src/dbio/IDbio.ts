export interface IDbConnection
{
    dbFileDir: string;
    dbFileName: string;
    fileMustExist: boolean;
    inMemory: boolean;
    isReadOnly: boolean;
}