/**
 * Response DTO for the /metrics/summary endpoint.
 *
 * All rate values are expressed as percentages between 0 and 100.
 */
export class MetricsSummaryDto {
  /** Total number of test cases across all modules. */
  totalTestCases: number;

  /** Percentage of executed test cases to total test cases (0-100). */
  executionRate: number;

  /** Percentage of passed executed test cases (0-100). */
  passRate: number;

  /** Percentage of production bugs to total bugs (0-100). */
  defectLeakageRate: number;
}
