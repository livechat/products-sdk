import { IConnection, createConnection } from '@livechat/widget-core-sdk';
import createDetailsWidget, { DetailsWidget } from './details-widget';
import { IDetailsWidgetEvents } from './interfaces';
import * as assertSection from './custom-sections';
import { Mitt } from '@livechat/mitt/types';

const createMockConnection = (): IConnection<IDetailsWidgetEvents> => {
  const mockConnection: IConnection<IDetailsWidgetEvents> = {
    sendMessage: jest.fn(() => Promise.resolve()),
    emitter: jest.fn() as unknown as Mitt<IDetailsWidgetEvents>,
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

jest.mock('./ticket-info', () => {
  return {
    withTicketInfo: jest.fn().mockImplementation(widget => widget)
  };
});

describe('DetailsWidget', () => {
  it('has a `modifySection` method', () => {
    const connection = createMockConnection();

    const widget = DetailsWidget(connection);

    expect(widget.modifySection).toBeDefined();
  });

  it('calls modifySections and sendMessage with correct arguments', () => {
    const assertSectionSpy = jest
      .spyOn(assertSection, 'default')
      .mockReturnValue();
    const connection = createMockConnection();
    const widget = DetailsWidget(connection);

    const mockedSection = { title: "test", components: [] };

    widget.modifySection(mockedSection);

    expect(assertSectionSpy).toHaveBeenCalledWith(mockedSection);
    expect(connection.sendMessage).toHaveBeenCalledWith(
      'customer_details_section',
      mockedSection
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
