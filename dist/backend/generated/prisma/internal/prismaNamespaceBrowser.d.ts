import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Project: "Project";
    readonly Module: "Module";
    readonly TestCase: "TestCase";
    readonly TestResult: "TestResult";
    readonly Bug: "Bug";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const ModuleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly projectId: "projectId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum];
export declare const TestCaseScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly moduleId: "moduleId";
    readonly priority: "priority";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TestCaseScalarFieldEnum = (typeof TestCaseScalarFieldEnum)[keyof typeof TestCaseScalarFieldEnum];
export declare const TestResultScalarFieldEnum: {
    readonly id: "id";
    readonly testCaseId: "testCaseId";
    readonly status: "status";
    readonly executedAt: "executedAt";
    readonly duration: "duration";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type TestResultScalarFieldEnum = (typeof TestResultScalarFieldEnum)[keyof typeof TestResultScalarFieldEnum];
export declare const BugScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly severity: "severity";
    readonly environment: "environment";
    readonly reportedAt: "reportedAt";
    readonly resolvedAt: "resolvedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BugScalarFieldEnum = (typeof BugScalarFieldEnum)[keyof typeof BugScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
