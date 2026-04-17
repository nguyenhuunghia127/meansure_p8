export declare const Priority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly CRITICAL: "CRITICAL";
};
export type Priority = (typeof Priority)[keyof typeof Priority];
export declare const TestResultStatus: {
    readonly PASSED: "PASSED";
    readonly FAILED: "FAILED";
    readonly BLOCKED: "BLOCKED";
    readonly SKIPPED: "SKIPPED";
};
export type TestResultStatus = (typeof TestResultStatus)[keyof typeof TestResultStatus];
export declare const Severity: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly CRITICAL: "CRITICAL";
};
export type Severity = (typeof Severity)[keyof typeof Severity];
export declare const Environment: {
    readonly TESTING: "TESTING";
    readonly STAGING: "STAGING";
    readonly PRODUCTION: "PRODUCTION";
};
export type Environment = (typeof Environment)[keyof typeof Environment];
