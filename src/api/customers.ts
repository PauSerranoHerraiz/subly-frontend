import api from "./axios";

export interface Customer {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phone?: string;
  companyId: string;
  createdAt: Date;
}

export const getCustomers = (): Promise<Customer[]> =>
  api.get("/customers").then(res => res.data);

export const createCustomer = (data: Omit<Customer, "id" | "companyId" | "createdAt">) =>
  api.post("/customers", data).then(res => res.data);

export const deleteCustomer = async (id: string) => {
  await api.delete(`/customers/${id}`);
};