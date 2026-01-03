export enum TimeFrame {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export const metricsTimespan = (timeLine: TimeFrame) => {
  switch (timeLine) {
    case TimeFrame.WEEKLY:
      return {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };
    case TimeFrame.MONTHLY:
      return {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };
    case TimeFrame.YEARLY:
      return {
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };
    default:
      return {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };
  }
};
