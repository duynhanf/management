import { axiosInstance } from "@/lib/axios";

export const createOfficerRelative = async (body: any) => {
  try {
    const response = await axiosInstance.post(`/api/officer-relatives`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateOfficerRelative = async (id: number, body: any) => {
  try {
    const response = await axiosInstance.put(`/api/officer-relatives/${id}`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getOfficerRelative = async (caseId: string) => {
  return axiosInstance.get(`/api/officer-relatives/${caseId}`);
};

export const getOfficerRelatives = async (params: any) => {
  return axiosInstance.get(`/api/officer-relatives`, {
    params,
  });
};

export const getAllOfficerRelativesByOfficerID = async (officerId: string) => {
  return axiosInstance.get(`/api/officer-relatives`, {
    params: { can_bo_id: officerId },
  });
};

export const getConfigPerson = async () => {
  const configs = await axiosInstance.get(`/api/configPerson`);
  return configs.data;
};

export const bangThongBaoThoiHanThe = async (params: any) => {
  return axiosInstance.get(`/api/persons/bangThongBaoThoiHanThe`, {
    params,
  });
};

export const updateStatusInData = async (recordId: any, newStatus: any) => {
  try {
    const response = await getOfficerRelative(recordId);
    const currentCase = response.data;
    currentCase.trang_thai = newStatus;
    await createOfficerRelative(currentCase);
  } catch (error) {
    console.error("Error updating status in database:", error);
  }
};