import { WidgetMixin } from '@livechat/widget-core-sdk';

export interface IPageData {
  queryParams: object;
}

export interface IPageDataApi {
  getPageData(): IPageData | null;
}

export interface IPageDataEvents {
  page_data: IPageData;
}

export const withPageData: WidgetMixin<
  IPageDataApi,
  IPageDataEvents
> = widget => {
  let pageData = null;

  function onPageData(data: IPageData) {
    pageData = data;
  }

  widget.on('page_data', onPageData);

  return {
    ...widget,
    getPageData(): IPageData | null {
      return pageData;
    }
  };
};
