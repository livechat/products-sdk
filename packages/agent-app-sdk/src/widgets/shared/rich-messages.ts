import { WidgetMixin } from '@livechat/widget-core-sdk';

export interface IRichMessagesApi {
  sendQuickReplies(title, buttons): Promise<void>;
  sendCards(cards): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const withRichMessages: WidgetMixin<IRichMessagesApi, {}> = widget => ({
  ...widget,
  sendQuickReplies(title, buttons) {
    return widget.sendMessage('send_quick_replies', { title, buttons });
  },
  sendCards(cards) {
    return widget.sendMessage(
      'send_cards',
      Array.isArray(cards) ? cards : [cards]
    );
  }
});
