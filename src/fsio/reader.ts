import * as fs from "fs";
import * as path from "path";
import * as helperFunctions from "../helpers/functions";

export function findFiles(searchPath: string, recursive: boolean = false, fileType: string = null, fileNameRegex: string = null): string[]
{
    /* Initialize values */
    var fileList: string[];

    /* Get complete list of directory files */
    try {
        fileList = walk(searchPath, recursive);
    }
    catch (e) {
        throw new Error("Could not get contents of directory (" + searchPath + "): " + (<Error>e).message);
    }

    /* Reduce by file type */
    if (!helperFunctions.isNullOrWhitespace(fileType)) {
        fileList = fileList.filter((file): boolean =>
        {
            return file.toLowerCase().endsWith("." + fileType.toLowerCase());
        });
    }

    /* Reduce by files that meet RegEx search */
    if (!helperFunctions.isNullOrWhitespace(fileNameRegex)) {
        try {
            var regex = new RegExp(fileNameRegex);
            fileList = fileList.filter((file): boolean =>
            {
                return regex.test(file);
            });
        }
        catch (e) {
            throw e;
        }
    }

    return fileList;
}

function walk(dir: string, recursive: boolean): string[]
{
    /* Ignore null directory input */
    if (helperFunctions.isNullOrWhitespace(dir))
        return [];

    /* Initialize list */
    var filesList: string[] = [];

    /* Get a list of directory contents & ensure an empty array if null returned */
    var directoryContents = fs.readdirSync(dir) || [];

    directoryContents.forEach((item) =>
    {
        /* Get the absolute path and stats of the item */
        var fullItem = path.resolve(dir, item);
        var itemStat = fs.statSync(fullItem);
        /* Handle item based on type */
        if (itemStat.isFile())
            filesList.push(fullItem);
        else if (itemStat.isDirectory() && recursive)
            /* Will recursively call when directory found and if requested */
            filesList = filesList.concat(walk(fullItem, recursive));
        /* not handling sym-links at the mo' */
    });

    return filesList;
}