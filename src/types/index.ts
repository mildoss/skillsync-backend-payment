export interface CheckoutRequest {
  Body: {
    packageId: string;
  };
}

export interface PaymentSuccessPayload {
  userId: string;
  creditsToAdd: number;
  amountPaid: number;
  stripeSessionId: string;
}