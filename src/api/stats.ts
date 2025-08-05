import { axiosInstance } from "@/lib/axios";

// van ban di
export const countCasesVanBanDi = async (params: any) => {
  return axiosInstance.get(`/api/sent-documents/countVanBanDi`, {
    params,
  });
};

export const countVanBanDiForComparison = async (params: any) => {
  return axiosInstance.get(`/api/sent-documents/countVanBanDiForComparison`, {
    params,
  });
};

export const countCasesVanBanDiFor12 = async (params: any) => {
  return axiosInstance.get(`/api/sent-documents/countVanBanDiFor12Months`, {
    params,
  });
};

// van ban den
export const countCasesVanBanDen = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/countVanBanDen`, {
    params,
  });
};

export const countCasesVanBanDenFor12 = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/countVanBanDenFor12Months`, {
    params,
  });
};

export const countVanBanDenForComparison = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/countVanBanDenForComparison`, {
    params,
  });
};

export const countCasesVanBanDenDay = async (params: any) => {
  return axiosInstance.get(`/api/received-documents/countVanBanDenForRecentDays`, {
    params,
  });
};