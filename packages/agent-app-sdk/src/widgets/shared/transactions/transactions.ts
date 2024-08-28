import { WidgetMixin } from "@livechat/widget-core-sdk";
import { BILLING_API_URL, IncomingTransactionEvents, OutgoingTransactionEvents } from './constants';
import { AuthMethods, Charge, DirectChargeRequest, PaymentIntentDirectCharge, PaymentIntentRecurrentCharge, RecurrentChargeRequest, RequestOptions } from "./interfaces";
import { createDirectChargeIntent, createRecurrentChargeIntent } from './utils';

export interface IWithTransactionsApi {
  startDirectCharge(token: string, request: DirectChargeRequest, options?: RequestOptions): Promise<Charge>
  startRecurrentCharge(token: string, request: RecurrentChargeRequest, options?: RequestOptions): Promise<Charge>
}

export interface IWithTransactionsEvents {
  [IncomingTransactionEvents.UpdateBillingCycle]: { paymentIntent: PaymentIntentRecurrentCharge, billingCycle: number }
}

export const withTransactions: WidgetMixin<
  IWithTransactionsApi,
  IWithTransactionsEvents
> = widget => {
  const createCharge = ({ paymentIntent, token, options }: {
    paymentIntent: PaymentIntentDirectCharge | PaymentIntentRecurrentCharge;
    options: RequestOptions;
    token: string;
  }): Promise<Charge> => {
    return new Promise((resolve, reject) => {
      const baseUrl = (options && options.billingApiUrl) ? options.billingApiUrl : BILLING_API_URL;
      const authMethod = (options && options.authMethod) ? options.authMethod : AuthMethods.Bearer;
      const { metadata, ...intent } = paymentIntent;
      const url = `${baseUrl}/${metadata.type}/${metadata.product}`

      widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionPending, { paymentIntent });

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authMethod} ${token}`,
        },
        body: JSON.stringify(intent),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}. Cannot register transaction.`);
          }
          return response.json();
        })
        .then(charge => {
          widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionSuccess, { charge });
          resolve(charge);
        })
        .catch(error => {
          widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionFailure, { error });
          reject(error);
        });
    });
  };

  return {
    ...widget,
    startDirectCharge(token: string, request: DirectChargeRequest, options?: RequestOptions): Promise<Charge> {
      const paymentIntent = createDirectChargeIntent(request)
      return createCharge({ paymentIntent, token, options });
    },
    startRecurrentCharge(token: string, request: RecurrentChargeRequest, options?: RequestOptions): Promise<Charge> {
      const paymentIntent = createRecurrentChargeIntent(request)
      return createCharge({ paymentIntent, token, options });
    }
  };
};
