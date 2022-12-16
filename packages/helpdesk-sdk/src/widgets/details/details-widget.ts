import {
  createWidget,
  withAmplitude,
  createConnection,
  IConnection
} from '@livechat/widget-core-sdk';
import { withTicketInfo } from './ticket-info';
import assertSection from './custom-sections';
import {
  IDetailsWidgetEvents,
  IDetailsWidgetApi,
  ISection
} from './interfaces';

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

  const widget = withAmplitude(withTicketInfo(base));

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
