import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createFullscreenWidget, { FullscreenWidget } from './fullscreen-widget';
import { IFullscreenWidgetEvents } from './interfaces';

const createMockConnection = (): IConnection<IFullscreenWidgetEvents> => {
  const mockConnection: IConnection<IFullscreenWidgetEvents> = {
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

  it('has a `navigate` method', () => {
    const connection = createMockConnection();
    const widget = FullscreenWidget(connection);

    expect(widget.navigate).toBeDefined();
  });

  it('`navigate` works correctly', () => {
    const connection = createMockConnection();
    const widget = FullscreenWidget(connection);

    const path = '/some-path';
    widget.navigate(path);
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'navigate_from_fullscreen_widget',
      path
    );
  });

  it('has a `setReportsFilters` method', () => {
    const connection = createMockConnection();
    const widget = FullscreenWidget(connection);

    expect(widget.setReportsFilters).toBeDefined();
  });

  it('`setReportsFilters` works correctly', () => {
    const connection = createMockConnection();
    const widget = FullscreenWidget(connection);

    const filters = { stringFilter: 'value', numberFilter: 5 };
    widget.setReportsFilters(filters);
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'set_reports_filters',
      filters
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
    expect.assertions(5);

    const widget = await createFullscreenWidget();
    expect(widget).toHaveProperty('setNotificationBadge');
    expect(widget).toHaveProperty('on');
    expect(widget).toHaveProperty('off');
    expect(widget).toHaveProperty('sendMessage');
    expect(widget).toHaveProperty('getPageData');
  });
});
