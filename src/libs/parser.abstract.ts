import * as models from "../models/typelite.models"
import * as Q from "q"

export default abstract class Parser<T>
{
    constructor(protected source: string | T) { }

    public asSqliteCreate(): string
    {
        if (typeof this.source === "string") return this.source;
        else this.toSqliteCreate().then((result) => { return result.data });
    }

    public asFileJSON(): T
    {
        if (typeof this.source === "string") this.toFileJSON().then((result) => { return result.data });
        else return this.source;
    }

    public toFileJSON(): Q.Promise<models.ResultSummary<T>>
    {
        var deferred = Q.defer<models.ResultSummary<T>>();

        var result: models.ResultSummary<T> = { data: null, summary: new models.Summary() };
        deferred.resolve(result);

        return deferred.promise;
    }

    public toSqliteCreate(): Q.Promise<models.ResultSummary<string>>
    {
        var deferred = Q.defer<models.ResultSummary<string>>();

        var result: models.ResultSummary<string> = { data: null, summary: new models.Summary() };
        deferred.resolve(result);

        return deferred.promise;
    }

    public abstract test(): void;

}

// as is blocking
// to is not blocking