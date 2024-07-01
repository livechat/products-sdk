export type ReportsFilters = Record<
  string,
  string | string[] | number | number[] | Date
>;

export interface IFullscreenWidgetApi {
  setNotificationBadge(count: number | null): void;
  navigate(pathname: string): void;
  setReportsFilters(filters: ReportsFilters): void;
}

export interface IFullscreenWidgetEvents {}
