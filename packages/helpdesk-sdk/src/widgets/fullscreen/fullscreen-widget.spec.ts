import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createFullscreenWidget, { FullscreenWidget } from './fullscreen-widget';

const createMockConnection = (): IConnection<{}> => {
  const mockConnection: IConnection<{}> = {
    sendMessage: jest.fn(() => Promise.resolve()),
    emitter: jest.fn()
  };
  return mockConnection;
};

jest.mock('@livechat/widget-core-sdk', () => {
  const originalModule = jest.requireActual('@livechat/widget-core-sdk');
  return {
    ...originalModule,
    createConnection: jest.fn(() => Promise.resolve(createMockConnection()))
  };
});

describe('FullscreenWidget', () => {
  it('has a `setNotificationBadge` method', () => {
    const connection = createMockConnection();

    const widget = FullscreenWidget(connection);

    // assert that the widget has a `setNotificationBadge` method
    expect(widget.setNotificationBadge).toBeDefined();
  });

  it('sets the notification badge correctly', () => {
    const connection = createMockConnection();

    const widget = FullscreenWidget(connection);

    // call the `setNotificationBadge` method with different values for `count`
    widget.setNotificationBadge(5);
    widget.setNotificationBadge(10);
    widget.setNotificationBadge(null);

    // assert that the correct message was sent to the connection
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'set_fullscreen_widget_notification_badge',
      5
    );
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'set_fullscreen_widget_notification_badge',
      10
    );
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'set_fullscreen_widget_notification_badge',
      null
    );
  });
});

describe('createFullscreenWidget', () => {
  it('returns a promise that resolves to the correct object', async () => {
    expect.assertions(1);

    const widget = await createFullscreenWidget();

    expect(widget).toBeInstanceOf(Object);
  });

  it('calls createConnection with the correct arguments', () => {
    createFullscreenWidget();

    expect(createConnection).toHaveBeenCalledWith();
  });

  it('returns the correct object with correct properties', async () => {
    expect.assertions(4);

    const widget = await createFullscreenWidget();
    expect(widget).toHaveProperty('setNotificationBadge');
    expect(widget).toHaveProperty('on');
    expect(widget).toHaveProperty('off');
    expect(widget).toHaveProperty('sendMessage');
  });
});
