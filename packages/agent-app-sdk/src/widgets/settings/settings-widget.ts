import {
  createWidget,
  withAmplitude,
  createConnection,
  IConnection
} from '@livechat/widget-core-sdk';
import { ISettingsWidgetApi, ISettingsWidgetEvents } from './interfaces';

export function SettingsWidget(
  connection: IConnection<ISettingsWidgetEvents>
) {
  const base = createWidget<ISettingsWidgetApi, ISettingsWidgetEvents>(
    connection,
    {
      redirect(target: string): Promise<void> {
        return connection.sendMessage(
          'redirect',
            target
        );
      }
    }
  );
  return withAmplitude(base);
}

export type ISettingsWidget = ReturnType<typeof SettingsWidget>

export default function createSettingsWidget(): Promise<ISettingsWidget> {
  return createConnection<ISettingsWidgetEvents>().then(connection =>
      SettingsWidget(connection)
  );
}
