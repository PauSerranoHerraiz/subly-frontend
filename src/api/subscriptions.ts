import api from "./axios";

export const getSubscriptions = async () => {
  const response = await api.get("/subscriptions");
  return response.data;
};

export const createSubscription = async (data: {
  customerId: string;
  planId: string;
  status?: string;
}) => {
  const response = await api.post("/subscriptions", data);
  return response.data;
};

export const updateSubscription = async (
  id: string,
  data: { status?: string; planId?: string }
) => {
  const response = await api.patch(`/subscriptions/${id}`, data);
  return response.data;
};

export const deleteSubscription = async (id: string) => {
  const response = await api.delete(`/subscriptions/${id}`);
  return response.data;
};