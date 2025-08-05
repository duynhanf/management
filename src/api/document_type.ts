import { axiosInstance } from "./constants";

export const getDocumentTypes = async () => {
  const configs = await axiosInstance.get(`/api/document-types`);
  return configs.data;
};
