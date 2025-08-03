"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Relative {
  id: string
  officerId: string
  name: string
  relationship: string
  birthDate: string
  phone: string
  address: string
  occupation: string
  notes: string
  createdAt: string
}

interface Officer {
  id: string
  name: string
  position: string
  department: string
}

export default function RelativesPage() {
  const [officer, setOfficer] = useState<Officer | null>(null)
  const [relatives, setRelatives] = useState<Relative[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRelative, setEditingRelative] = useState<Relative | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    birthDate: "",
    phone: "",
    address: "",
    occupation: "",
    notes: "",
  })
  const router = useRouter()
  const params = useParams()
  const officerId = params.id as string

  useEffect(() => {
    if (officerId) {
      loadOfficer()
      loadRelatives()
    }
  }, [officerId])

  const loadOfficer = () => {
    const officers = JSON.parse(localStorage.getItem("officers") || "[]")
    const foundOfficer = officers.find((o: Officer) => o.id === officerId)
    setOfficer(foundOfficer || null)
  }

  const loadRelatives = () => {
    const allRelatives = JSON.parse(localStorage.getItem("relatives") || "[]")
    const officerRelatives = allRelatives.filter((r: Relative) => r.officerId === officerId)
    setRelatives(officerRelatives)
  }

  const saveRelatives = (newRelatives: Relative[]) => {
    const allRelatives = JSON.parse(localStorage.getItem("relatives") || "[]")
    const otherRelatives = allRelatives.filter((r: Relative) => r.officerId !== officerId)
    const updatedAllRelatives = [...otherRelatives, ...newRelatives]
    localStorage.setItem("relatives", JSON.stringify(updatedAllRelatives))
    setRelatives(newRelatives)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingRelative) {
      // Update existing relative
      const updatedRelatives = relatives.map((relative) =>
        relative.id === editingRelative.id ? { ...relative, ...formData } : relative,
      )
      saveRelatives(updatedRelatives)
    } else {
      // Add new relative
      const newRelative: Relative = {
        id: Date.now().toString(),
        officerId,
        ...formData,
        createdAt: new Date().toISOString(),
      }
      saveRelatives([...relatives, newRelative])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      relationship: "",
      birthDate: "",
      phone: "",
      address: "",
      occupation: "",
      notes: "",
    })
    setEditingRelative(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (relative: Relative) => {
    setEditingRelative(relative)
    setFormData({
      name: relative.name,
      relationship: relative.relationship,
      birthDate: relative.birthDate,
      phone: relative.phone,
      address: relative.address,
      occupation: relative.occupation,
      notes: relative.notes,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thân nhân này?")) {
      const updatedRelatives = relatives.filter((relative) => relative.id !== id)
      saveRelatives(updatedRelatives)
    }
  }

  const filteredRelatives = relatives.filter(
    (relative) =>
      relative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relative.relationship.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const relationshipOptions = ["Vợ/Chồng", "Con", "Cha", "Mẹ", "Anh/Em trai", "Chị/Em gái", "Ông", "Bà", "Khác"]

  if (!officer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
        <div className="text-center py-8 text-gray-500">Không tìm thấy thông tin cán bộ</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý thân nhân</h1>
            <p className="text-gray-600 mt-1">
              Cán bộ: {officer.name} - {officer.position}
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
              <DialogTitle>{editingRelative ? "Chỉnh sửa thân nhân" : "Thêm thân nhân mới"}</DialogTitle>
              <DialogDescription>
                {editingRelative ? "Cập nhật thông tin thân nhân" : "Nhập thông tin thân nhân mới"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Mối quan hệ *</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => setFormData({ ...formData, relationship: value })}
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
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Nghề nghiệp</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
                <Button type="submit">{editingRelative ? "Cập nhật" : "Thêm mới"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách thân nhân</CardTitle>
          <CardDescription>Tổng cộng {relatives.length} thân nhân</CardDescription>
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
                  <TableCell className="font-medium">{relative.name}</TableCell>
                  <TableCell>{relative.relationship}</TableCell>
                  <TableCell>
                    {relative.birthDate ? new Date(relative.birthDate).toLocaleDateString("vi-VN") : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {relative.phone && <div>{relative.phone}</div>}
                      {relative.address && <div className="text-gray-500 truncate max-w-32">{relative.address}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{relative.occupation || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(relative)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(relative.id)}>
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
              {searchTerm ? "Không tìm thấy thân nhân nào" : "Chưa có thân nhân nào"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
