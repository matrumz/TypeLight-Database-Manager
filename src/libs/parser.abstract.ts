import * as models from "../models/typelite.models"
import * as modelService from "../services/dataModel.service"
import * as Q from "q"

export type ResultSummaryPromise<resultType> = Q.Promise<models.ResultSummary<resultType>>

export abstract class Parser<T>
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

    /**
     * Convert this parser's source to schema-file JSON.
     *
     * Always resolves
     */
    public toFileJSON(): ResultSummaryPromise<T>
    {
        var deferred = Q.defer<models.ResultSummary<T>>();

        if (typeof this.source === "string") {
            this.parseToFileJSON(this.source).then(
                (result) =>
                {
                    this.source = result.data;
                    deferred.resolve(result);
                },
                (error) =>
                {
                    this.source = null;
                    deferred.resolve(modelService.ResultSummaryInstance(null, new models.Summary([error])));
                }
            )
        }
        else {
            deferred.resolve(modelService.ResultSummaryInstance(this.source, new models.Summary()));
        }

        return deferred.promise;
    }

    /**
     * Convert this parser's source to a SQLite CREATE statement
     *
     * Always resolves
     */
    public toSqliteCreate(): ResultSummaryPromise<string>
    {
        var deferred = Q.defer<models.ResultSummary<string>>();

        if (typeof this.source !== "string") {
            this.parseToSqliteCreate(this.source).then(
                (result) =>
                {
                    this.source = result.data;
                    deferred.resolve(result);
                },
                (error) =>
                {
                    this.source = null;
                    deferred.resolve(modelService.ResultSummaryInstance(null, new models.Summary([error])));
                }
            )
        }
        else {
            deferred.resolve(modelService.ResultSummaryInstance(this.source, new models.Summary()));
        }

        return deferred.promise;
    }

    protected abstract parseToFileJSON(create: string): ResultSummaryPromise<T>;
    protected abstract parseToSqliteCreate(object: T): ResultSummaryPromise<string>;
}