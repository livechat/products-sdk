export interface IFullscreenWidgetApi {
  setNotificationBadge(count: number | null): void;
  navigate(pathname: string): void;
  setReportsFilters(filters: any): void;
}

export interface IFullscreenWidgetEvents {}
