export const PRODUCT = 'livechat'
export const BILLING_API_URL = 'https://billing.livechatinc.com/v2'

export enum OutgoingTransactionEvents {
  RegisterTransactionPending = 'register_transaction_pending',
  RegisterTransactionSuccess = 'register_transaction_success',
  RegisterTransactionFailure = 'register_transaction_failure',
}

export enum IncomingTransactionEvents {
  DeclineTransaction = 'decline_transaction',
  PaymentSuccess = 'payment_success',
  PaymentFailure = 'payment_failure',
  UpdateBillingCycle = 'update_billing_cycle',
}
