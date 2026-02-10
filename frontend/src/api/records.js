/**
 * Records API - list, create, delete medical records.
 */

import { apiRequest } from "./config";

export const getRecords = async () => {
  const data = await apiRequest("/api/records");
  return data.records || [];
};

export const createRecord = async (payload) => {
  const data = await apiRequest("/api/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data;
};

export const deleteRecord = async (id) => {
  await apiRequest(`/api/records/${id}`, { method: "DELETE" });
};
