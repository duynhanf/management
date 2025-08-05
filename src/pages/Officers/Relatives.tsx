import type React from "react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Officer, Relative } from "@/interfaces";
import { getAllOfficerRelativesByOfficerID } from "@/api/officer_relative";
import { getOfficer } from "@/api/officer";

export default function Relatives() {
  const [officer, setOfficer] = useState<Officer | null>(null);
  const [relatives, setRelatives] = useState<Relative[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRelative, setEditingRelative] = useState<Relative | null>(null);
  const [formData, setFormData] = useState({
    ho_ten: "",
    moi_quan_he: "",
    ngay_sinh: "",
    phone: "",
    address: "",
    nghe_nghiep: "",
    notes: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadOfficer();
      loadRelatives();
    }
  }, [id]);

  const loadOfficer = () => {
    if (!id) return;
    getOfficer(id)
      .then((response) => {
        const foundOfficer = response.data as Officer;
        setOfficer(foundOfficer);
      })
      .catch((error) => {
        console.error("Error fetching officer:", error);
        setOfficer(null);
      });
  };

  const loadRelatives = () => {
    if (!id) return;
    getAllOfficerRelativesByOfficerID(id)
      .then((response) => response.data)
      .then((response) => {
        const data = response;
        console.log("Loaded relatives:", data.data);
        setRelatives(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching relatives:", error);
        setRelatives([]);
      });
  };

  const saveRelatives = (newRelatives: Relative[]) => {
    const allRelatives = JSON.parse(localStorage.getItem("relatives") || "[]");
    const otherRelatives = allRelatives.filter(
      (r: Relative) => r.can_bo_id !== id
    );
    const updatedAllRelatives = [...otherRelatives, ...newRelatives];
    localStorage.setItem("relatives", JSON.stringify(updatedAllRelatives));
    setRelatives(newRelatives);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRelative) {
      // Update existing relative
      const updatedRelatives = relatives.map((relative) =>
        relative.id === editingRelative.id
          ? { ...relative, ...formData }
          : relative
      );
      saveRelatives(updatedRelatives);
    } else {
      // Add new relative
      const newRelative: Relative = {
        id: Date.now().toString(),
        can_bo_id: id!,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      saveRelatives([...relatives, newRelative]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ho_ten: "",
      moi_quan_he: "",
      ngay_sinh: "",
      phone: "",
      address: "",
      nghe_nghiep: "",
      notes: "",
    });
    setEditingRelative(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (relative: Relative) => {
    setEditingRelative(relative);
    setFormData({
      ho_ten: relative.ho_ten,
      moi_quan_he: relative.moi_quan_he,
      ngay_sinh: relative.ngay_sinh,
      phone: relative.phone,
      address: relative.address,
      nghe_nghiep: relative.nghe_nghiep,
      notes: relative.notes,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thân nhân này?")) {
      const updatedRelatives = relatives.filter(
        (relative) => relative.id !== id
      );
      saveRelatives(updatedRelatives);
    }
  };

  const filteredRelatives = relatives.filter((relative) =>
    relative.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const relationshipOptions = [
    "Vợ/Chồng",
    "Con",
    "Cha",
    "Mẹ",
    "Anh/Em trai",
    "Chị/Em gái",
    "Ông",
    "Bà",
    "Khác",
  ];

  if (!officer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy thông tin cán bộ
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý thân nhân
            </h1>
            <p className="text-gray-600 mt-1">
              Cán bộ: {officer.ho_ten} - {officer.chuc_vu}
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRelative(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm thân nhân
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRelative ? "Chỉnh sửa thân nhân" : "Thêm thân nhân mới"}
              </DialogTitle>
              <DialogDescription>
                {editingRelative
                  ? "Cập nhật thông tin thân nhân"
                  : "Nhập thông tin thân nhân mới"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="ho_ten"
                    value={formData.ho_ten}
                    onChange={(e) =>
                      setFormData({ ...formData, ho_ten: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Mối quan hệ *</Label>
                  <Select
                    value={formData.moi_quan_he}
                    onValueChange={(value) =>
                      setFormData({ ...formData, moi_quan_he: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mối quan hệ" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Ngày sinh</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.ngay_sinh}
                    onChange={(e) =>
                      setFormData({ ...formData, ngay_sinh: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Nghề nghiệp</Label>
                <Input
                  id="occupation"
                  value={formData.nghe_nghiep}
                  onChange={(e) =>
                    setFormData({ ...formData, nghe_nghiep: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
                <Button type="submit">
                  {editingRelative ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách thân nhân</CardTitle>
          <CardDescription>
            Tổng cộng {relatives.length} thân nhân
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm thân nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Mối quan hệ</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Nghề nghiệp</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelatives.map((relative) => (
                <TableRow key={relative.id}>
                  <TableCell className="font-medium">
                    {relative.ho_ten}
                  </TableCell>
                  <TableCell>{relative.moi_quan_he}</TableCell>
                  <TableCell>
                    {relative.ngay_sinh
                      ? new Date(relative.ngay_sinh).toLocaleDateString("vi-VN")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {relative.phone && <div>{relative.phone}</div>}
                      {relative.address && (
                        <div className="text-gray-500 truncate max-w-32">
                          {relative.address}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{relative.nghe_nghiep || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(relative)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(relative.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRelatives.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "Không tìm thấy thân nhân nào"
                : "Chưa có thân nhân nào"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
