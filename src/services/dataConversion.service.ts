import * as models from "../models/typelite.models";
import * as fileModels from "../models/schemaFiles.models";
import * as subDbEntities from "../dbEntities/subDbEntities/subDbEntities.grouping";
import * as sqliteModels from "../models/sqlite.models";

/**
 * Functions for converting schema-file objects into Entity/SubEntity objects used within this project.
 */
export namespace FileToEntity
{
    /**
     * Converts a schema-file constraint into a constraint object usable by the Table class.
     * @param constraint A schema-file constraint
     * @throws {TypeError}
     */
    export function TableConstraint(constraint: fileModels.TableFile.IConstraint): subDbEntities.Constraint
    {
        /* Let null conversions fail silently */
        if (!constraint)
            return null;

        /* Null types, on the other hand, are an issue */
        if (!constraint.type)
            throw new TypeError("Constraints must have a type.");

        /* Determine constraint type so we can create an object */
        switch (constraint.type.toLowerCase()) {
            case "pk":
                type pk = fileModels.TableFile.ConstraintTypes.IPKConstraint;
                return new subDbEntities.PKConstraint(
                    constraint.name,
                    constraint.columns,
                    (<pk>constraint).autoIncrement,
                    (<pk>constraint).order,
                    (<pk>constraint).onConflict
                );
            case "fk":
                type fk = fileModels.TableFile.ConstraintTypes.IFKConstraint;
                return new subDbEntities.FKConstraint(
                    constraint.name,
                    constraint.columns,
                    (<fk>constraint).parentTable,
                    (<fk>constraint).parentColumn
                );
            case "notnull":
                type notnull = fileModels.TableFile.ConstraintTypes.INotNullConstraint;
                return new subDbEntities.NotNullConstraint(
                    constraint.name,
                    constraint.columns,
                    (<notnull>constraint).onConflict
                );
            case "unique":
                type unique = fileModels.TableFile.ConstraintTypes.IUniqueConstraint;
                return new subDbEntities.UniqueConstraint(
                    constraint.name,
                    constraint.columns,
                    (<unique>constraint).onConflict
                );
            case "check":
                type check = fileModels.TableFile.ConstraintTypes.ICheckConstraint;
                return new subDbEntities.CheckConstraint(
                    constraint.name,
                    constraint.columns,
                    (<check>constraint).expression,
                    (<check>constraint).onConflict
                );
            case "default":
                type def = fileModels.TableFile.ConstraintTypes.IDefaultConstraint;
                return new subDbEntities.DefaultConstraint(
                    constraint.name,
                    constraint.columns,
                    (<def>constraint).value,
                    (<def>constraint).onConflict
                )
            default:
                throw new TypeError("Invalid constraint type: " + constraint.type)
        }
    }
}

export namespace EntityToFile
{
    export function TableConstraint(constraint: subDbEntities.Constraint): fileModels.TableFile.IConstraint
    {
        var fileConstraint: fileModels.TableFile.IConstraint = {
            name: constraint.name,
            columns: constraint.columns || [],
            type: null
        };

        /* Let null conversions fail silently */
        if (!constraint)
            return null

        if (constraint instanceof subDbEntities.PKConstraint) {
            type pk = fileModels.TableFile.ConstraintTypes.IPKConstraint;
            fileConstraint.type = "pk";
            (<pk>fileConstraint).autoIncrement = constraint.autoIncrement;
            (<pk>fileConstraint).onConflict = constraint.onConflict;
            (<pk>fileConstraint).order = constraint.order;
        }
        else if (constraint instanceof subDbEntities.FKConstraint) {
            type fk = fileModels.TableFile.ConstraintTypes.IFKConstraint;
            fileConstraint.type = "fk";
            (<fk>fileConstraint).parentColumn = constraint.parentColumn;
            (<fk>fileConstraint).parentTable = constraint.parentTable;
        }
        else if (constraint instanceof subDbEntities.NotNullConstraint) {
            type notnull = fileModels.TableFile.ConstraintTypes.INotNullConstraint;
            fileConstraint.type = "notnull";
            (<notnull>fileConstraint).onConflict = constraint.onConflict;
        }
        else if (constraint instanceof subDbEntities.UniqueConstraint) {
            type unique = fileModels.TableFile.ConstraintTypes.IUniqueConstraint;
            fileConstraint.type = "unique";
            (<unique>fileConstraint).onConflict = constraint.onConflict;
        }
        else if (constraint instanceof subDbEntities.CheckConstraint) {
            type check = fileModels.TableFile.ConstraintTypes.ICheckConstraint;
            fileConstraint.type = "check";
            (<check>fileConstraint).expression = constraint.checkExpression;
            (<check>fileConstraint).onConflict = constraint.onConflict;
        }
        else if (constraint instanceof subDbEntities.DefaultConstraint) {
            type def = fileModels.TableFile.ConstraintTypes.IDefaultConstraint;
            fileConstraint.type = "default";
            (<def>fileConstraint).value = constraint.value;
            (<def>fileConstraint).onConflict = constraint.onConflict;
        }
        else {
            throw new TypeError("Invalid constraint type")
        }

        return fileConstraint;
    }
}