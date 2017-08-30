/** Returns true if the passed string is NULL, empty, or just whitespace. */
export function isNullOrWhitespace(str: string): boolean
{
    return str === null || str.match(/^\s*$/) !== null;
}