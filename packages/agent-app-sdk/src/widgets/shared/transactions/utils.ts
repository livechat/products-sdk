import { PRODUCT } from './constants';
import { ChargeType, DirectChargeRequest, PaymentIntentDirectCharge, PaymentIntentRecurrentCharge, RecurrentChargeRequest } from './interfaces';

export const createDirectChargeIntent = (values: DirectChargeRequest): PaymentIntentDirectCharge => ({
  name: values.name,
  price: values.price,
  per_account: values.per_account,
  return_url: window.location.origin,
  test: values.test,
  quantity: values.quantity || 1,
  metadata: {
    type: ChargeType.DirectCharge,
    product: PRODUCT,
    isExternalCharge: true,
    icon: values.icon,
    description: values.description,
  }
})

export const createRecurrentChargeIntent = (values: RecurrentChargeRequest): PaymentIntentRecurrentCharge => ({
  name: values.name,
  price: values.price,
  test: values.test,
  return_url: window.location.origin,
  per_account: values.per_account || false,
  months: values.months || 1,
  trial_days: values.trial_days || 0,
  metadata: {
    type: ChargeType.RecurrentCharge,
    product: PRODUCT,
    isExternalCharge: true,
    icon: values.icon,
    description: values.description,
    hidePicker: values.hidePicker,
  }
})
