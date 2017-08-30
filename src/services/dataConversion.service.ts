import * as models from "../models/typelite.models";
import * as fileModels from "../models/schemaFiles.models";
import * as subDbEntities from "../dbEntities/subDbEntities/subDbEntities.grouping";

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
            default:
                throw new TypeError("Invalid constraint type: " + constraint.type)
        }
    }
}

export namespace EntityToFile
{

}