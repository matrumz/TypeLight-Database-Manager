export interface IEntityExistsOptions
{
    alterIfExists: boolean;
    errorIfExists: boolean;
}

export interface IDeploymentOptions
{
    path: string;
    entityExistsOptions: IEntityExistsOptions;
}

export interface ICliDeployParams
{
    xml: boolean;
    clean: boolean;
    schema: string;
    databases: string;
}

export interface ICliGenerateParams
{

}

export interface ITypeliteConfiguration {
    fileEncoding: string
}