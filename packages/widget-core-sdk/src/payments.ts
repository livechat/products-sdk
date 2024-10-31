import { WidgetMixin } from './widget';

enum ChargeType {
  DirectCharge = "direct_charge",
  RecurrentCharge = "recurrent_charge",
}

enum OutgoingTransactionEvents {
  RegisterTransactionPending = 'register_transaction_pending',
  RegisterTransactionSuccess = 'register_transaction_success',
  RegisterTransactionFailure = 'register_transaction_failure',
}

interface IPaymentIntent {
  name: string,
  price: number,
  per_account: boolean,
  test: boolean,
  return_url: string | null,
  months?: number,
  trial_days?: number,
  quantity?: number,
  metadata: {
    type: ChargeType,
    isExternalTransaction: boolean,
    showBillingCyclePicker: boolean,
    icon: string,
    description?: string,
  }
}

export interface IChargeBase {
  id: string;
  buyer_organization_id: string;
  buyer_license_id: number;
  buyer_account_id: string;
  buyer_entity_id: string;
  seller_client_id: string;
  order_client_id: string;
  order_organization_id: string;
  name: string;
  price: number;
  return_url: string;
  test: boolean;
  per_account: boolean;
  status: string;
  confirmation_url: string;
  commission_percent: number;
  created_at: string;
  updated_at: string;
}

export interface IDirectCharge extends IChargeBase {
  quantity: number;
}

export interface IRecurrentCharge extends IChargeBase {
  trial_days: number;
  months: number;
  external_id?: string;
  trial_ends_at: string | null,
  cancelled_at: string | null,
  current_charge_at: string | null,
  next_charge_at: string | null,
}

export type TransactionEvent = { chargeId: string }
export type TransactionError = { error: unknown }
export type UpdateBillingCycleEvent = { billingCycle: number, paymentIntent: IPaymentIntent, chargeId: string }

export type Charge = IDirectCharge | IRecurrentCharge;
export type Metadata = {
  icon: string;
  description?: string;
  showBillingCyclePicker?: boolean;
}

const getChargeType = (charge: Charge): ChargeType => {
  return (charge as IRecurrentCharge).months !== undefined ? ChargeType.RecurrentCharge : ChargeType.DirectCharge;
}

const createPaymentIntent = (charge: Charge, metadata: Metadata): IPaymentIntent => {
  const type = getChargeType(charge)

  const base = {
    name: charge.name,
    price: charge.price,
    per_account: charge.per_account,
    test: charge.test,
    return_url: null,
    metadata: {
      type,
      isExternalTransaction: true,
      icon: metadata.icon,
      description: metadata.description,
      showBillingCyclePicker: metadata.showBillingCyclePicker,
    }
  }

  return type === ChargeType.RecurrentCharge
    ? { ...base, months: (charge as IRecurrentCharge).months, trial_days: (charge as IRecurrentCharge).trial_days }
    : { ...base, quantity: (charge as IDirectCharge).quantity }
}

export interface IWithPaymentsApi {
  startTransaction(charge: Charge, metadata: Metadata): void
}

export interface IWithPaymentsEvents {
  transaction_declined: TransactionEvent;
  transaction_accepted: TransactionEvent;
  transaction_failed: TransactionError;
  update_billing_cycle: UpdateBillingCycleEvent;
}

export const withPayments: WidgetMixin<
  IWithPaymentsApi,
  IWithPaymentsEvents
> = widget => {
  return {
    ...widget,
    startTransaction(charge: Charge, metadata: Metadata) {
      try {
        if (!charge) {
          throw new Error('You have to provide charge details');
        }

        if (!metadata || !metadata.icon) {
          throw new Error('You have to provide metadata with icon');
        }

        // Process the charge to ensure compatibility with OneClickPayment flow
        const paymentIntent = createPaymentIntent(charge, metadata)

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
