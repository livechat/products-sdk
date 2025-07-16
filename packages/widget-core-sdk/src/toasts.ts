import { WidgetMixin } from './widget';

type ToastKind = 'success' | 'error';

export interface IToast {
  content: string;
  kind: ToastKind;
}

export interface IWithToastApi {
  setToast(toast: IToast): Promise<void>;
}

export const withToasts: WidgetMixin<IWithToastApi, void> = widget => {
  return {
    ...widget,
    setToast(toast: IToast) {
      return widget.sendMessage('set_toast', toast);
    }
  };
};
