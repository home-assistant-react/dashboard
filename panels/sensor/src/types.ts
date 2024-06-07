export interface SensorOptions {
  entity_id: string;
  isCompact?: boolean;
  showChart?: boolean;
  chartEntity?: string;
  chartHistoryInterval?: number;
  chartHistoryIntervalType?: "minutes" | "hours" | "days";
  chartUpdateInterval?: number;
  /*chartLineColor?: string;
  chartFillColor?: string;*/
}
