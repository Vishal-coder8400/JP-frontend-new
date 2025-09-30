import api from "../../lib/axios";

export const approve = (data) => api.post("/approvals/submit", data);
