import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createMessageBoxWidget, { MessageBoxWidget } from './messagebox-widget';
import { IMessageBoxWidgetEvents } from './interfaces';

const createMockConnection = (): IConnection<IMessageBoxWidgetEvents> => {
  const mockConnection: IConnection<IMessageBoxWidgetEvents> = {
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

describe('MessageBoxWidget', () => {
  it('has a correct methods', () => {
    const connection = createMockConnection();

    const widget = MessageBoxWidget(connection);

    expect(widget.putMessage).toBeDefined();
  });

  it('calls putMessage and sendMessage with correct arguments', () => {
    const connection = createMockConnection();

    const widget = MessageBoxWidget(connection);

    widget.putMessage('foo');

    expect(connection.sendMessage).toHaveBeenCalledWith(
      'put_messagebox_message',
      {
        type: 'message',
        value: 'foo'
      }
    );
  });
});

describe('createMessageBoxWidget', () => {
  it('returns a promise that resolves to the correct object', async () => {
    expect.assertions(1);

    const widget = await createMessageBoxWidget();

    expect(widget).toBeInstanceOf(Object);
  });

  it('calls createConnection with the correct arguments', () => {
    createMessageBoxWidget();

    expect(createConnection).toHaveBeenCalledWith();
  });

  it('returns the correct object with correct properties', async () => {
    expect.assertions(5);

    const widget = await createMessageBoxWidget();

    expect(widget).toHaveProperty('putMessage');
    expect(widget).toHaveProperty('on');
    expect(widget).toHaveProperty('off');
    expect(widget).toHaveProperty('sendMessage');
    expect(widget).toHaveProperty('trackEvent');
  });
});
