import {
  createWidget,
  withAmplitude,
  createConnection,
  IConnection
} from '@livechat/widget-core-sdk';
import { IFullscreenWidgetApi, IFullscreenWidgetEvents } from './interfaces';

export function FullscreenWidget(
  connection: IConnection<IFullscreenWidgetEvents>
) {
  const base = createWidget<IFullscreenWidgetApi, IFullscreenWidgetEvents>(
    connection,
    {
      setNotificationBadge(count: number | null): Promise<void> {
        return connection.sendMessage(
          'set_fullscreen_widget_notification_badge',
          count
        );
      }
    }
  );
  return withAmplitude(base);
}

export type IFullscreenWidget = ReturnType<typeof FullscreenWidget>

export default function createFullscreenWidget(): Promise<IFullscreenWidget> {
  return createConnection<IFullscreenWidgetEvents>().then(connection =>
    FullscreenWidget(connection)
  );
}
