/**
 * Appointments API - list, create, delete appointments.
 */

import { apiRequest } from "./config";

export const getAppointments = async () => {
  const data = await apiRequest("/api/appointments");
  return data.appointments || [];
};

export const createAppointment = async (payload) => {
  const data = await apiRequest("/api/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data;
};

export const deleteAppointment = async (id) => {
  await apiRequest(`/api/appointments/${id}`, { method: "DELETE" });
};
