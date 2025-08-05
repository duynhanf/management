import { axiosInstance } from "@/lib/axios";

export const getOfficers = async (params?: any) => {
  return axiosInstance.get(`/api/officers`, {
    params,
  });
};

export const getOfficer = async (officerId: string) => {
  return axiosInstance.get(`/api/officers/${officerId}`);
};

export const createOfficer = async (body: any) => {
  return axiosInstance.post(`/api/officers`, body);
};

export const updateOfficer = async (id: string, body: any) => {
  return axiosInstance.put(`/api/officers/${id}`, body);
};

export const getConfigPersonnel = async () => {
  const configs = await axiosInstance.get(`/api/configPersonnel`);
  return configs.data;
};


export const bangBoNhiemLai = async (params: any) => {
  return axiosInstance.get(`/api/officers/bangBoNhiemLai`, {
    params,
  });
};

export const countCanBo = async (params: any) => {
  return axiosInstance.get(`/api/officers/countCanBo`, {
    params,
  });
};

export const updateOfficerRole = async (
  officerId: string,
  officerRoleId: string
) => {
  try {
    const response = await axiosInstance.post(
      `/api/officers/${officerId}/updateOfficerRole`,
      { officerRoleId }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateThang = async (
  officerId: string,
  monthField: string,
  value: number
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      `/api/officers/${officerId}/updateThang`,
      {
        monthField: monthField,
        value: value,
      }
    );

    console.log("Cập nhật thành công:", response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Lỗi khi cập nhật tháng:", error.message);
    } else {
      console.error("Lỗi không xác định:", error);
    }
  }
};
