/** Generic string, because I cannot put all variations of "character(20)", etc., in a string-literal type list. */
export type SqliteData = string;
// INT
// INTEGER
// TINYINT
// SMALLINT
// MEDIUMINT
// BIGINT
// UNSIGNED BIG INT
// INT2
// INT8
// CHARACTER(20)
// VARCHAR(255)
// VARYING CHARACTER(255)
// NCHAR(55)
// NATIVE CHARACTER(70)
// NVARCHAR(100)
// TEXT
// CLOB
// BLOB

// REAL
// DOUBLE
// DOUBLE PRECISION
// FLOAT
// NUMERIC
// DECIMAL(10,5)
// BOOLEAN
// DATE
// DATETIME

export type Constraint = "pk" | "fk" | "notnull" | "unique" | "check" | "default";

/** "abort" is sqlite default */
export type ConstraintConflictResolution = "rollback" | "abort" | "fail" | "ignore" | "replace";

export type Order = "asc" | "desc";

export type TriggerTime = "before" | "after" | "instead";

export type TriggerEvent = "delete" | "insert" | "update";