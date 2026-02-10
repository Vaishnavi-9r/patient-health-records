/**
 * Dashboard API - stats for patient and staff dashboards.
 */

import { apiRequest } from "./config";

export const getStats = async () => {
  const data = await apiRequest("/api/dashboard/stats");
  return data.stats || { recordsCount: 0, appointmentsCount: 0, patientsCount: 0 };
};
