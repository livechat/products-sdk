import { WidgetMixin } from './widget';

enum ChatWidgetEvents {
  OpenChatWidget = 'open_chat_widget'
}

export interface IChatWidgetApi {
  openChatWidget(): Promise<void>;
}

export const withChatWidget: WidgetMixin<IChatWidgetApi, void> = widget => ({
  ...widget,
  openChatWidget(): Promise<void> {
    return widget.sendMessage(ChatWidgetEvents.OpenChatWidget);
  }
});
