import api from "./axios";
import type { Customer, Subscription, Plan, SubscriptionWithRelations } from "../types";

export const getDashboardData = (): Promise<{
  customers: Customer[];
  subscriptions: SubscriptionWithRelations[];
  plans: Plan[];
}> => api.get("/dashboard").then(res => res.data);