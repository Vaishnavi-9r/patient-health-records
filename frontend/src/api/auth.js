/**
 * Auth API - login (patient and staff).
 */

import { apiRequest } from "./config";

export const login = async (email, password, role) => {
  const data = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
  });
  return data;
};
