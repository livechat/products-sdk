import {
  createConnection,
  createWidget,
  IConnection,
  withAmplitude,
  withChatWidget,
  withPayments,
  withToasts
} from '@livechat/widget-core-sdk';
import assertSection from './custom-sections';
import {
  IDetailsWidgetApi,
  IDetailsWidgetEvents,
  ISection
} from './interfaces';
import { withTicketInfo } from './ticket-info';

export function DetailsWidget(connection: IConnection<IDetailsWidgetEvents>) {
  const base = createWidget<IDetailsWidgetApi, IDetailsWidgetEvents>(
    connection,
    {
      modifySection(section: ISection): Promise<void> {
        assertSection(section);
        return connection.sendMessage('customer_details_section', section);
      }
    }
  );

  const widget = withAmplitude(
    withTicketInfo(withChatWidget(withToasts(withPayments(base))))
  );

  return widget;
}

export interface IDetailsWidget extends ReturnType<typeof DetailsWidget> {}

export default function createDetailsWidget(): Promise<IDetailsWidget> {
  let widget: IDetailsWidget;
  return createConnection()
    .then(connection => {
      widget = DetailsWidget(connection);
      return connection.sendMessage('plugin_inited');
    })
    .then(() => widget);
}
