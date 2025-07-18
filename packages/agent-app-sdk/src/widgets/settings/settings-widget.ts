import { createConnection, createWidget, IConnection, withAmplitude, withPayments, withToasts } from '@livechat/widget-core-sdk';
import { withPageData } from '../shared/page-data';
import { withTheme } from '../shared/theme';
import { ISettingsWidgetApi, ISettingsWidgetEvents } from './interfaces';

export function SettingsWidget(connection: IConnection<ISettingsWidgetEvents>) {
  const base = createWidget<ISettingsWidgetApi, ISettingsWidgetEvents>(
    connection,
    {
      redirect(target: string): Promise<void> {
        return connection.sendMessage('redirect', target);
      }
    }
  );
  return withAmplitude(withPageData(withTheme(withToasts(withPayments(base)))));
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
