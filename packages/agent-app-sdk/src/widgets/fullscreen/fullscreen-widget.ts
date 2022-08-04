import {
  createConnection,
  FullscreenWidget,
  IFullscreenWidgetEvents
} from '@livechat/widget-core-sdk';

export interface IFullscreenWidget
  extends ReturnType<typeof FullscreenWidget> {}

export default function createFullscreenWidget(): Promise<IFullscreenWidget> {
  return createConnection<IFullscreenWidgetEvents>().then(connection =>
    FullscreenWidget(connection)
  );
}
