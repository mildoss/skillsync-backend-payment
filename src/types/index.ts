export interface CheckoutRequest {
  Body: {
    userId: string;
  };
}

export interface PaymentSuccessPayload {
  userId: string;
  creditsToAdd: number;
  amountPaid: number;
  stripeSessionId: string;
}