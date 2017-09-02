import * as sqliteModels from "../../models/sqlite.models";
import * as helperObjects from "../../helpers/objects";
import * as helperFunctions from "../../helpers/functions";
import * as typeChecker from "../../services/typeCheck.service";

export class Trigger
{
    constructor(
        public name: string,
        public when: sqliteModels.TriggerTime = null,
        public event: sqliteModels.TriggerEvent = null,
        public eventColumns: string[] = [],
        public condition: string = null,
        public executeStatements: string[] = []
    ) { }

    public validate(): helperObjects.Summary
    {
        var summary = new helperObjects.Summary();

        if (helperFunctions.isNullOrWhitespace(this.name))
            summary.errorMessages.push("Name cannot be NULL or whitespace");

        if (!typeChecker.isSqliteTriggerTime(this.when))
            summary.errorMessages.push("Invalid execution time: " + this.when);

        if (!typeChecker.isSqliteTriggerEvent(this.event))
            summary.errorMessages.push("Invalid execution event: " + this.event);

        var statementsCopy: string[] = (this.executeStatements || []).map((statement): string =>
        {
            if (!helperFunctions.isNullOrWhitespace(statement))
                return statement;
        });
        if (!statementsCopy.length)
            summary.errorMessages.push("Triggers must have at least one statement to execute");

        return summary;
    }
}