export class Summary
{
    constructor(public errorMessages: string[] = [], public warningMessages: string[] = [], public infoMessages: string[] = []) { }

    public append(summary: Summary): Summary
    {
        Array.prototype.push.apply(this.errorMessages, summary.errorMessages);
        Array.prototype.push.apply(this.warningMessages, summary.warningMessages);
        Array.prototype.push.apply(this.infoMessages, summary.infoMessages);
        return this;
    }

    public concat(summary: Summary): Summary
    {
        var errorMessages = this.errorMessages.concat(summary.errorMessages);
        var warningMessages = this.warningMessages.concat(summary.warningMessages);
        var infoMessages = this.infoMessages.concat(summary.infoMessages);

        return new Summary(errorMessages, warningMessages, infoMessages);
    }
}

export class ResultSummary<resultType>
{
    constructor(public data: resultType = null, public summary = new Summary()){}
}