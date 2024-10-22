import { WidgetMixin } from "@livechat/widget-core-sdk";

enum ChargeType {
  DirectCharge = "direct_charge",
  RecurrentCharge = "recurrent_charge",
}

enum OutgoingTransactionEvents {
  RegisterTransactionPending = 'register_transaction_pending',
  RegisterTransactionSuccess = 'register_transaction_success',
  RegisterTransactionFailure = 'register_transaction_failure',
}

interface ChargeBase {
  id: string;
  name: string;
  price: number;
  status: string;
  per_account: boolean;
  test: boolean;
}

interface DirectCharge extends ChargeBase {
  quantity: number;
}

interface RecurrentCharge extends ChargeBase {
  trial_days: number;
  months: number
}

interface Details {
  icon: string;
  description: string;
}

type Charge = DirectCharge | RecurrentCharge;

const isRecurrentCharge = (charge: Charge): charge is RecurrentCharge => {
  return (charge as RecurrentCharge).months !== undefined;
}

const createIntent = (charge: Charge, details: Details) => {
  const base = {
    name: charge.name,
    price: charge.price,
    per_account: charge.per_account,
    test: charge.test,
    return_url: null,
    metadata: {
      type: isRecurrentCharge(charge) ? ChargeType.RecurrentCharge : ChargeType.DirectCharge,
      isExternalTransaction: true,
      icon: details.icon,
      description: details.description,
    }
  }

  return isRecurrentCharge(charge)
    ? { ...base, months: charge.months, trial_days: charge.trial_days }
    : { ...base, quantity: charge.quantity }
}

export interface IWithTransactionsApi {
  startTransaction(config: { charge: Charge, details: Details }): void
}

export const withTransactions: WidgetMixin<
  IWithTransactionsApi, void
> = widget => {
  return {
    ...widget,
    startTransaction({ charge, details }: { charge?: Charge, details: Details }) {
      try {
        if (!charge) {
          throw new Error('You have to provide charge details');
        }

        if (!details || !details.icon || details.description) {
          throw new Error('You have to provide details with icon and description');
        }

        // Process the charge to ensure compatibility with OneClickPayment
        const paymentIntent = createIntent(charge, details)

        // Dispatch events to be handled by the OneClickPayment provider
        widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionPending, { paymentIntent });
        widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionSuccess, { charge });
      } catch (error) {
        widget.sendMessage(OutgoingTransactionEvents.RegisterTransactionFailure, { error });
        throw error
      }
    },
  };
};
