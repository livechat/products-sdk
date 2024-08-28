export enum AuthMethods {
  Bearer = 'Bearer',
  Basic = 'Basic',
}

export enum BillingCycle {
  Monthly = 1,
  Yearly = 12,
}

export enum ChargeType {
  DirectCharge = "direct_charge",
  RecurrentCharge = "recurrent_charge",
}

enum PaymentStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Declined = 'declined',
  Processed = 'processed',
  Active = 'active',
  Cancelled = 'cancelled',
  Frozen = 'frozen',
}

type Taxes = {
  tax_rate: number;
  tax_value: number;
  tax_region: string;
  total_price: number;
};

export interface Charge {
  id: string;
  name: string;
  price: number;
  status: PaymentStatus;
  per_account: boolean;
  test: boolean;
  trial_days?: number;
  months?: BillingCycle;
  taxes?: Taxes;
}

interface PaymentIntentMetadata<T> {
  type: T;
  icon: string;
  product: string;
  description?: string;
  isExternalCharge: boolean;
  hidePicker?: boolean;
}

interface PaymentIntentBase {
  name: string;
  price: number;
  per_account: boolean;
  test: boolean;
  return_url?: string;
}

interface PaymentIntent<T> extends PaymentIntentBase {
  metadata: PaymentIntentMetadata<T>;
}

export interface PaymentIntentDirectCharge
  extends PaymentIntent<ChargeType.DirectCharge> {
  quantity: number;
}

export interface PaymentIntentRecurrentCharge
  extends PaymentIntent<ChargeType.RecurrentCharge> {
  trial_days: number;
  months: BillingCycle;
}

export interface DirectChargeRequest extends PaymentIntentBase {
  icon: string;
  description?: string;
  quantity?: number;
}

export interface RecurrentChargeRequest extends PaymentIntentBase {
  icon: string;
  description?: string;
  months?: number;
  trial_days?: number;
  hidePicker?: boolean;
}

export interface RequestOptions {
  billingApiUrl?: string;
  authMethod?: AuthMethods;
}
