import { TUser } from "../auth";

export type TPremiumType = "premium";

export type TPayRequest = {
  type: TPremiumType;
};

export type TPayResponse = {
  clientSecret: string;
  paymentIntentId: string;
};

export type TPayment = {
  _id: string;
  user: TUser;
  type: string;
  paymentIntentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
