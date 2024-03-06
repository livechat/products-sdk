import {
  createWidget,
  withAmplitude,
  createConnection,
  IConnection
} from '@livechat/widget-core-sdk';
import { ISettingsWidgetApi, ISettingsWidgetEvents } from './interfaces';
import { withPageData } from '../shared/page-data';

export function SettingsWidget(connection: IConnection<ISettingsWidgetEvents>) {
  const base = createWidget<ISettingsWidgetApi, ISettingsWidgetEvents>(
    connection,
    {
      redirect(target: string): Promise<void> {
        return connection.sendMessage('redirect', target);
      }
    }
  );
  return withAmplitude(withPageData(base));
}

export type ISettingsWidget = ReturnType<typeof SettingsWidget>;

export default function createSettingsWidget(): Promise<ISettingsWidget> {
  let widget: ISettingsWidget;
  return createConnection<ISettingsWidgetEvents>()
    .then(connection => {
      widget = SettingsWidget(connection);
      return connection.sendMessage('plugin_inited');
    })
    .then(() => widget);
}
