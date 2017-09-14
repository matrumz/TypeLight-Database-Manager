export interface IFSJob
{
    fileName: string;
    path: string;
}

export class FSWriteJob implements IFSJob
{
    constructor(
        public fileName: string,
        public path: string,
        public contents: string
    ) { }
}