import { IConnection } from '../connection';
import { createWidget } from '../widget';
import { withAmplitude } from '../amplitude';
import { IFullscreenWidgetApi, IFullscreenWidgetEvents } from './interfaces';

export default function FullscreenWidget(
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
