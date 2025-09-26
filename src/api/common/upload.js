import api from "../../lib/axios";

export const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/recruiter/upload/cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
