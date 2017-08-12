import * as fsdbio from "./fsdbio.abstract";
import * as entity from "../dbEntities/table";
export type Table = entity.Table;

export class TableFsdbio implements fsdbio.IFsdbio<Table>
{

}