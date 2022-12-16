import { WidgetMixin } from '@livechat/widget-core-sdk';
import { ITicketInfo } from './interfaces';

export interface ITicketInfoApi {
  getTicketInfo(): ITicketInfo | null;
}

export interface ITicketInfoEvents {
  ticket_info: ITicketInfo;
}

export const withTicketInfo: WidgetMixin<
  ITicketInfoApi,
  ITicketInfoEvents
> = widget => {
  let ticketInfo = null;

  function onTicketInfo(ticket: ITicketInfo) {
    ticketInfo = ticket;
  }

  widget.on('ticket_info', onTicketInfo);

  return {
    ...widget,
    getTicketInfo(): ITicketInfo | null {
      return ticketInfo;
    }
  };
};
