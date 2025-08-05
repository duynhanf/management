import { axiosInstance } from "@/lib/axios";

export const getSentDocuments = async (params: any) => {
  return axiosInstance.get(`/api/sent-documents`, {
    params,
  })
};

export const getSentDocument = async (caseId: string) => {
  return axiosInstance.get(`/api/sent-documents/${caseId}`);
};

export const deleteSentDocument = async (caseId: string) => {
  return axiosInstance.delete(`/api/sent-documents/${caseId}`);
};

export const createSentDocument = async (body: any) => {
  return axiosInstance.post(`/api/sent-documents`, body);
};


export const updateSentDocument = async (id: string, body: any) => {
  return axiosInstance.put(`/api/sent-documents/${id}`, body);
};


export const issueSentDocumentNumber = async (params: any) => {
  return axiosInstance.get(`/api/sent-documents/laysoVanBanDi`, {
    params,
  });
};


