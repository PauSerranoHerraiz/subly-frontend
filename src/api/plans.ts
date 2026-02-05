import api from "./axios";

export const getPlans = () =>
  api.get("/plans").then(res => res.data);

export const createPlan = (data: {
  name: string;
  priceMonthly: number;
}) =>
  api.post("/plans", data).then(res => res.data);

export const updatePlan = (id: string, data: any) =>
  api.put(`/plans/${id}`, data).then(res => res.data);

export const deletePlan = (id: string) =>
  api.delete(`/plans/${id}`);
