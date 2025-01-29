import { WidgetMixin } from '@livechat/widget-core-sdk';

export type Theme = 'light' | 'dark';

export interface IThemeData {
  theme: Theme;
}

export interface IThemeApi {
  getTheme(): Theme | null;
}

export interface IThemeEvents {
  change_theme: IThemeData;
}

export const withTheme: WidgetMixin<
  IThemeApi,
  IThemeEvents
> = widget => {
  let theme = new URLSearchParams(window.location.search).get('theme') as Theme || null;

  function onThemeChange(data: IThemeData) {
    theme = data.theme;
  }

  widget.on('change_theme', onThemeChange);

  return {
    ...widget,
    getTheme(): Theme | null {
      return theme;
    }
  };
};
