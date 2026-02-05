export interface Customer {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phone?: string;
  companyId: string;
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
  startedAt: Date;
  endedAt?: Date | null;
}

export interface SubscriptionWithRelations extends Subscription {
  customer: Customer;
  plan: Plan;
}