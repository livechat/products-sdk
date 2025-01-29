import { createConnection, createWidget, IConnection, withAmplitude, withPayments } from '@livechat/widget-core-sdk';
import { withCustomerProfile } from '../shared/customer-profile';
import { withRichMessages } from '../shared/rich-messages';
import { withTheme } from '../shared/theme';
import { IMessageBoxWidgetApi, IMessageBoxWidgetEvents, IRichMessage } from './interfaces';

export function MessageBoxWidget(
  connection: IConnection<IMessageBoxWidgetEvents>
) {
  const base = createWidget<IMessageBoxWidgetApi, IMessageBoxWidgetEvents>(
    connection,
    {
      putMessage(msg: IRichMessage | string): Promise<void> {
        let data;
        if (typeof msg === 'string') {
          data = { type: 'message', value: msg };
        } else {
          data = { type: 'rich_message', payload: msg };
        }
        return connection.sendMessage('put_messagebox_message', data);
      }
    }
  );

  const widget = withAmplitude(withRichMessages(withCustomerProfile(withTheme(withPayments(base)))));

  return widget;
}

export type IMessageBoxWidget = ReturnType<typeof MessageBoxWidget>;

export default function createMessageBoxWidget(): Promise<IMessageBoxWidget> {
  let widget: IMessageBoxWidget;

  return createConnection<IMessageBoxWidgetEvents>()
    .then(connection => {
      widget = MessageBoxWidget(connection);
      return connection.sendMessage('plugin_inited');
    })
    .then(() => widget);
}
