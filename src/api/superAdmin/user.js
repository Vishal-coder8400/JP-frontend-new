import api from "../../lib/axios";

export const getUserDetails = ({ signal }) =>
  api.get("/api/v1/superAdmin/profile", { signal });

export const updateBasicInfo = (data) =>
  api.put("/api/v1/superAdmin/profile/basic-info", data);

export const updateQualificationInfo = (data) =>
  api.put("/api/v1/superAdmin/profile/qualification-info", data);
