import type React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Eye, Trash2, Users } from "lucide-react";
import { createOfficer, getOfficers, updateOfficer } from "@/api/officer";
import { Officer } from "@/interfaces";

export default function OfficerList() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [formData, setFormData] = useState({
    ho_ten: "",
    chuc_vu: "",
    department: "",
    phone: "",
    email: "",
    address: "",
    status: "active" as "active" | "inactive",
    notes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = () => {
    getOfficers()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setOfficers(data.data);
      })
      .catch((error) => console.error("Error fetching officers:", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingOfficer) {
      updateOfficer(editingOfficer.id, formData)
        .then(() => {
          loadOfficers();
          setIsDialogOpen(false);
        })
        .catch((error) => console.error("Error updating officer:", error));
    } else {
      const newOfficer: Officer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      createOfficer(newOfficer)
        .then(() => {
          loadOfficers();
          setIsDialogOpen(false);
        })
        .catch((error) => console.error("Error creating officer:", error));
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ho_ten: "",
      chuc_vu: "",
      department: "",
      phone: "",
      email: "",
      address: "",
      status: "active",
      notes: "",
    });
    setEditingOfficer(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setFormData({
      ho_ten: officer.ho_ten,
      chuc_vu: officer.chuc_vu,
      department: officer.department,
      phone: officer.phone,
      email: officer.email,
      address: officer.address,
      status: officer.status,
      notes: officer.notes,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa cán bộ này?")) {
      // Call API to delete officer
    }
  };

  const filteredOfficers = officers.filter((officer) =>
    officer.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý cán bộ</h1>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cán bộ trong tổ chức
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingOfficer(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm cán bộ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOfficer ? "Chỉnh sửa cán bộ" : "Thêm cán bộ mới"}
              </DialogTitle>
              <DialogDescription>
                {editingOfficer
                  ? "Cập nhật thông tin cán bộ"
                  : "Nhập thông tin cán bộ mới"}
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
                  <Label htmlFor="position">Chức vụ *</Label>
                  <Input
                    id="position"
                    value={formData.chuc_vu}
                    onChange={(e) =>
                      setFormData({ ...formData, chuc_vu: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
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
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
                <Button type="submit">
                  {editingOfficer ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách cán bộ</CardTitle>
          <CardDescription>Tổng cộng {officers.length} cán bộ</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm cán bộ..."
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
                <TableHead>Chức vụ</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOfficers.map((officer) => (
                <TableRow key={officer.id}>
                  <TableCell className="font-medium">
                    {officer.ho_ten}
                  </TableCell>
                  <TableCell>{officer.chuc_vu}</TableCell>
                  <TableCell>{officer.department}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {officer.phone && <div>{officer.phone}</div>}
                      {officer.email && (
                        <div className="text-gray-500">{officer.email}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        officer.status === "active" ? "default" : "secondary"
                      }
                    >
                      {officer.status === "active"
                        ? "Hoạt động"
                        : "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/officers/${officer.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(officer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/officers/${officer.id}/relatives`)
                        }
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(officer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOfficers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "Không tìm thấy cán bộ nào" : "Chưa có cán bộ nào"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
