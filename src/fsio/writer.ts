import * as fs from "fs";
import * as path from "path";
import * as helperFunctions from "../helpers/functions";
import * as helperObjects from "../helpers/objects";
import { FSWriteJob } from "./fsJobs";
import { Memory } from "../services/dataStore.service";

export function write(jobs: FSWriteJob[]): helperObjects.Summary
{
    var summary = new helperObjects.Summary();

    jobs.forEach((job) =>
    {
        /* Check to make sure path exists, try to create it otherwise */
        if (!fs.existsSync(job.path)) {
            let walkSummary = walk(job.path);
            summary.append(walkSummary);

            /* Move to next file if path for this file cannot be created */
            if (walkSummary.errorMessages.length)
                return;
        }

        /* Write file */
        try {
            var fullFilePath: string = path.resolve(job.path, job.fileName);
            fs.writeFileSync(
                fullFilePath,
                job.contents,
                { encoding: Memory.config.fileEncoding }
            );
        }
        catch (e) {
            summary.errorMessages.push("Could not write " + fullFilePath + ": " + (<Error>e).message);
        }
    });

    return summary;
}

/**
 * Equivalent of mkdir -p
 * @param targetDir
 */
export function walk(targetDir: string): helperObjects.Summary
{
    var summary = new helperObjects.Summary();

    const sep: string = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';

    try {
        targetDir
            .split(sep)
            .reduce((parentDir, childDir) =>
            {
                const curDir = path.resolve(parentDir, childDir);
                if (!fs.existsSync(curDir)) {
                    fs.mkdirSync(curDir);
                }
                return curDir;
            }, initDir);
    }
    catch (e) {
        summary.errorMessages.push("Could not create path " + targetDir + ": " + (<Error>e).message);
    }

    return summary;
}