export type TPremiumType = "premium";

export type TPayRequest = {
  type: TPremiumType;
};

export type TPayResponse = {
  clientSecret: string;
  paymentIntentId: string;
};
