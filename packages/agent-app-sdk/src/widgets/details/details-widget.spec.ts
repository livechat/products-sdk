import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createDetailsWidget, { DetailsWidget } from './details-widget';
import { IDetailsWidgetEvents } from './interfaces';
import * as assertSection from './custom-sections';

const createMockConnection = (): IConnection<IDetailsWidgetEvents> => {
  const mockConnection: IConnection<IDetailsWidgetEvents> = {
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

jest.mock('../shared/customer-profile', () => {
  return {
    withCustomerProfile: jest.fn().mockImplementation(widget => widget)
  };
});

jest.mock('../shared/rich-messages', () => {
  return {
    withRichMessages: jest.fn().mockImplementation(widget => widget)
  };
});

describe('DetailsWidget', () => {
  it('has a correct methods', () => {
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    expect(widget.putMessage).toBeDefined();
    expect(widget.watchMessages).toBeDefined();
    expect(widget.refreshSession).toBeDefined();
    expect(widget.modifySection).toBeDefined();
  });

  it('calls putMessage and sendMessage with correct arguments', () => {
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    widget.putMessage('foo');

    expect(connection.sendMessage).toHaveBeenCalledWith('put_message', 'foo');
  });

  it('calls watchMessages and sendMessage with correct arguments', () => {
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    widget.watchMessages();

    expect(connection.sendMessage).toHaveBeenCalledWith('watch_messages');
  });

  it('calls refreshSession and sendMessage with correct arguments', () => {
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    widget.refreshSession();

    expect(connection.sendMessage).toHaveBeenCalledWith('plugin_loaded');
  });

  it('calls modifySections and sendMessage with correct arguments', () => {
    const assertSectionSpy = jest
      .spyOn(assertSection, 'default')
      .mockReturnValue(true);
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    widget.modifySection('foo');

    expect(assertSectionSpy).toHaveBeenCalledWith('foo');
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'customer_details_section',
      'foo'
    );
  });
});

describe('createDetailsWidget', () => {
  it('returns a promise that resolves to the correct object', async () => {
    expect.assertions(1);

    const widget = await createDetailsWidget();

    expect(widget).toBeInstanceOf(Object);
  });

  it('calls createConnection with the correct arguments', () => {
    createDetailsWidget();

    expect(createConnection).toHaveBeenCalledWith();
  });

  it('returns the correct object with correct properties', async () => {
    expect.assertions(5);

    const widget = await createDetailsWidget();

    expect(widget).toHaveProperty('modifySection');
    expect(widget).toHaveProperty('trackEvent');
    expect(widget).toHaveProperty('on');
    expect(widget).toHaveProperty('off');
    expect(widget).toHaveProperty('sendMessage');
  });
});
