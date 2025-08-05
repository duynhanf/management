export type Officer = {
  id: string;
  ho_ten: string;
  chuc_vu: string;
  department: string;
  phone: string;
  email: string;
  address: string;
  status: "active" | "inactive";
  notes: string;
  createdAt: string;
}

export interface Relative {
  id: string
  can_bo_id: string
  ho_ten: string
  moi_quan_he: string
  ngay_sinh: string
  phone: string
  address: string
  nghe_nghiep: string
  notes: string
  createdAt: string
}
export interface User {
  id: string;
  fullName: string;
  username: string;
  roleId: string;
}