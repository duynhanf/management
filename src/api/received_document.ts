import { axiosInstance } from "@/lib/axios";

export const getReceivedDocuments = async (params: any) => {
  return axiosInstance.get(`/api/received-documents`, {
    params,
  });
};

export const getReceivedDocument = async (caseId: string) => {
  return axiosInstance.get(`/api/received-documents/${caseId}`);
};

export const createReceivedDocument = async (body: any) => {
  console.log(body);
  return axiosInstance.post(`/api/received-documents`, body);
};

export const updateReceivedDocument = async (id: string, body: any) => {
  return axiosInstance.put(`/api/received-documents/${id}`, body);
};

export const deleteReceivedDocument = async (caseId: string) => {
  return axiosInstance.delete(`/api/received-documents/${caseId}`);
};

export const issueReceivedDocumentNumber = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/issue-number`, {
    params,
  });
};

export const getOverDueDateReceivedDocuments = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/bangVanBanDenHan`, {
    params,
  });
};

export const modifyReceivedDocumentStatus = async (recordId: any, newStatus: any) => {
  try {
    const response = await getReceivedDocument(recordId);
    const currentCase = response.data;
    currentCase.trang_thai_van_ban = newStatus;
    await createReceivedDocument(currentCase);
  } catch (error) {
    console.error("Error updating status in database:", error);
  }
};
