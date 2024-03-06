import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createSettingsWidget, { SettingsWidget } from './settings-widget';
import { ISettingsWidgetEvents } from './interfaces';

const createMockConnection = (): IConnection<ISettingsWidgetEvents> => {
  return {
    sendMessage: jest.fn(() => Promise.resolve()),
    emitter: jest.fn()
  };
};

jest.mock('@livechat/widget-core-sdk', () => {
  const originalModule = jest.requireActual('@livechat/widget-core-sdk');
  return {
    ...originalModule,
    createConnection: jest.fn(() => Promise.resolve(createMockConnection()))
  };
});

jest.mock('../shared/page-data', () => {
  return {
    withPageData: jest.fn().mockImplementation(widget => ({
      ...widget,
      getPageData: jest.fn()
    }))
  };
});

describe('SettingsWidget', () => {
  it('has a `redirect` method', () => {
    const connection = createMockConnection();

    const widget = SettingsWidget(connection);

    // assert that the widget has a `setNotificationBadge` method
    expect(widget.redirect).toBeDefined();
  });

  it('redirects to provided target', () => {
    const connection = createMockConnection();

    const widget = SettingsWidget(connection);

    // call the `redirect` method with different values for `target`
    widget.redirect('https://example.com/another/example');
    widget.redirect('/chats/S0M3CH4TID');

    // assert that the correct message was sent to the connection
    expect(connection.sendMessage).toHaveBeenNthCalledWith(
      1,
      'redirect',
      'https://example.com/another/example'
    );
    expect(connection.sendMessage).toHaveBeenNthCalledWith(
      2,
      'redirect',
      '/chats/S0M3CH4TID'
    );
  });
});

describe('createSettingsWidget', () => {
  it('returns a promise that resolves to the correct object', async () => {
    expect.assertions(1);

    const widget = await createSettingsWidget();

    expect(widget).toBeInstanceOf(Object);
  });

  it('calls createConnection with the correct arguments', () => {
    createSettingsWidget();

    expect(createConnection).toHaveBeenCalledWith();
  });

  it('returns the correct object with correct properties', async () => {
    expect.assertions(5);

    const widget = await createSettingsWidget();
    expect(widget).toHaveProperty('redirect');
    expect(widget).toHaveProperty('on');
    expect(widget).toHaveProperty('off');
    expect(widget).toHaveProperty('sendMessage');
    expect(widget).toHaveProperty('getPageData');
  });
});
