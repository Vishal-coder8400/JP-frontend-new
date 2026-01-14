import api from "../../lib/axios";

export const uploadFile = async ({ file, role, folder }) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/${role}/upload/${folder}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
