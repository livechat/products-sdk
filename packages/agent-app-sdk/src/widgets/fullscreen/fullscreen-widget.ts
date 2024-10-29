import { createConnection, createWidget, IConnection, withAmplitude, withPayments } from '@livechat/widget-core-sdk';
import { withPageData } from '../shared/page-data';
import { IFullscreenWidgetApi, IFullscreenWidgetEvents, ReportsFilters } from './interfaces';

export { ReportsFilters } from './interfaces';

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
      },
      navigate(pathname: string): Promise<void> {
        return connection.sendMessage(
          'navigate_from_fullscreen_widget',
          pathname
        );
      },
      setReportsFilters(filters: ReportsFilters): Promise<void> {
        return connection.sendMessage('set_reports_filters', filters);
      }
    }
  );

  return withAmplitude(withPageData(withPayments(base)));
}

export type IFullscreenWidget = ReturnType<typeof FullscreenWidget>;

export default function createFullscreenWidget(): Promise<IFullscreenWidget> {
  let widget: IFullscreenWidget;
  return createConnection<IFullscreenWidgetEvents>()
    .then(connection => {
      widget = FullscreenWidget(connection);
      return connection.sendMessage('plugin_inited');
    })
    .then(() => widget);
}
