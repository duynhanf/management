"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Users, ChevronDown, ChevronRight, Shield } from "lucide-react"

interface Department {
  id: string
  name: string
  description: string
  parentId: string | null
  level: number
  order: number
  createdAt: string
}

interface Officer {
  id: string
  name: string
  position: string
  department: string
  departmentId: string
  rank: string
  isManager: boolean
  managerType?: "truong" | "pho" | "canbo"
}

export default function OrganizationPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [officers, setOfficers] = useState<Officer[]>([])
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: null,
  })

  useEffect(() => {
    loadData()
    initializeSampleData()
  }, [])

  const loadData = () => {
    const savedDepartments = localStorage.getItem("police_departments")
    const savedOfficers = localStorage.getItem("police_officers")

    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments))
    }
    if (savedOfficers) {
      setOfficers(JSON.parse(savedOfficers))
    }
  }

  const initializeSampleData = () => {
    const existingDepts = localStorage.getItem("police_departments")
    const existingOfficers = localStorage.getItem("police_officers")

    if (!existingDepts) {
      const sampleDepartments: Department[] = [
        {
          id: "1",
          name: "Công an thành phố",
          description: "Cơ quan công an cấp thành phố",
          parentId: null,
          level: 0,
          order: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Phòng Cảnh sát Hình sự",
          description: "Điều tra, xử lý các vụ án hình sự",
          parentId: "1",
          level: 1,
          order: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Phòng Cảnh sát Giao thông",
          description: "Đảm bảo trật tự an toàn giao thông",
          parentId: "1",
          level: 1,
          order: 2,
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Phòng An ninh mạng",
          description: "Bảo vệ an ninh mạng và chống tội phạm công nghệ cao",
          parentId: "1",
          level: 1,
          order: 3,
          createdAt: new Date().toISOString(),
        },
      ]

      localStorage.setItem("police_departments", JSON.stringify(sampleDepartments))
      setDepartments(sampleDepartments)
    }

    if (!existingOfficers) {
      const sampleOfficers: Officer[] = [
        // Công an thành phố - Lãnh đạo
        {
          id: "1",
          name: "Đại tá Nguyễn Văn Minh",
          position: "Giám đốc Công an thành phố",
          department: "Công an thành phố",
          departmentId: "1",
          rank: "Đại tá",
          isManager: true,
          managerType: "truong",
        },
        {
          id: "2",
          name: "Thượng tá Trần Thị Hoa",
          position: "Phó Giám đốc Công an thành phố",
          department: "Công an thành phố",
          departmentId: "1",
          rank: "Thượng tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "3",
          name: "Thượng tá Lê Văn Đức",
          position: "Phó Giám đốc Công an thành phố",
          department: "Công an thành phố",
          departmentId: "1",
          rank: "Thượng tá",
          isManager: true,
          managerType: "pho",
        },

        // Phòng Cảnh sát Hình sự
        {
          id: "4",
          name: "Trung tá Phạm Văn Thành",
          position: "Trưởng phòng Cảnh sát Hình sự",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Trung tá",
          isManager: true,
          managerType: "truong",
        },
        {
          id: "5",
          name: "Thiếu tá Hoàng Thị Lan",
          position: "Phó Trưởng phòng Cảnh sát Hình sự",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "6",
          name: "Thiếu tá Vũ Văn Nam",
          position: "Phó Trưởng phòng Cảnh sát Hình sự",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "7",
          name: "Đại úy Đặng Văn Hùng",
          position: "Điều tra viên",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "8",
          name: "Đại úy Bùi Thị Mai",
          position: "Điều tra viên",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "9",
          name: "Thượng úy Ngô Văn Tùng",
          position: "Cán bộ điều tra",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "10",
          name: "Thượng úy Mai Thị Hương",
          position: "Cán bộ điều tra",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "11",
          name: "Trung úy Lý Văn Quang",
          position: "Cán bộ nghiệp vụ",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "12",
          name: "Trung úy Chu Thị Nga",
          position: "Cán bộ nghiệp vụ",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "13",
          name: "Thiếu úy Đinh Văn Long",
          position: "Cán bộ trực ban",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thiếu úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "14",
          name: "Thiếu úy Đỗ Thị Oanh",
          position: "Cán bộ văn thư",
          department: "Phòng Cảnh sát Hình sự",
          departmentId: "2",
          rank: "Thiếu úy",
          isManager: false,
          managerType: "canbo",
        },

        // Phòng Cảnh sát Giao thông
        {
          id: "15",
          name: "Trung tá Hồ Văn Phúc",
          position: "Trưởng phòng Cảnh sát Giao thông",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Trung tá",
          isManager: true,
          managerType: "truong",
        },
        {
          id: "16",
          name: "Thiếu tá Trương Thị Kim",
          position: "Phó Trưởng phòng Cảnh sát Giao thông",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "17",
          name: "Thiếu tá Phan Văn Dũng",
          position: "Phó Trưởng phòng Cảnh sát Giao thông",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "18",
          name: "Đại úy Lâm Văn Tài",
          position: "Cán bộ tuần tra",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "19",
          name: "Đại úy Võ Thị Linh",
          position: "Cán bộ tuần tra",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "20",
          name: "Thượng úy Nguyễn Văn Khoa",
          position: "Cán bộ điều khiển giao thông",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "21",
          name: "Thượng úy Lê Thị Hạnh",
          position: "Cán bộ xử lý vi phạm",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "22",
          name: "Trung úy Phạm Văn Sơn",
          position: "Cán bộ nghiệp vụ",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "23",
          name: "Trung úy Hoàng Thị Bích",
          position: "Cán bộ hành chính",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "24",
          name: "Thiếu úy Vũ Văn Đạt",
          position: "Cán bộ trực ban",
          department: "Phòng Cảnh sát Giao thông",
          departmentId: "3",
          rank: "Thiếu úy",
          isManager: false,
          managerType: "canbo",
        },

        // Phòng An ninh mạng
        {
          id: "25",
          name: "Trung tá Đặng Văn Hải",
          position: "Trưởng phòng An ninh mạng",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Trung tá",
          isManager: true,
          managerType: "truong",
        },
        {
          id: "26",
          name: "Thiếu tá Bùi Thị Thảo",
          position: "Phó Trưởng phòng An ninh mạng",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "27",
          name: "Thiếu tá Ngô Văn Minh",
          position: "Phó Trưởng phòng An ninh mạng",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Thiếu tá",
          isManager: true,
          managerType: "pho",
        },
        {
          id: "28",
          name: "Đại úy Mai Văn Tuấn",
          position: "Chuyên viên an ninh mạng",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "29",
          name: "Đại úy Lý Thị Phương",
          position: "Chuyên viên điều tra tội phạm mạng",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Đại úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "30",
          name: "Thượng úy Chu Văn Bình",
          position: "Cán bộ kỹ thuật",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "31",
          name: "Thượng úy Đinh Thị Lan",
          position: "Cán bộ phân tích dữ liệu",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Thượng úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "32",
          name: "Trung úy Đỗ Văn Cường",
          position: "Cán bộ nghiệp vụ",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "33",
          name: "Trung úy Hồ Thị Yến",
          position: "Cán bộ hành chính",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Trung úy",
          isManager: false,
          managerType: "canbo",
        },
        {
          id: "34",
          name: "Thiếu úy Trương Văn Hùng",
          position: "Cán bộ trực ban",
          department: "Phòng An ninh mạng",
          departmentId: "4",
          rank: "Thiếu úy",
          isManager: false,
          managerType: "canbo",
        },
      ]

      localStorage.setItem("police_officers", JSON.stringify(sampleOfficers))
      setOfficers(sampleOfficers)
    }
  }

  const saveDepartments = (newDepartments: Department[]) => {
    localStorage.setItem("police_departments", JSON.stringify(newDepartments))
    setDepartments(newDepartments)
  }

  const buildDepartmentTree = (parentId: string | null = null): Department[] => {
    return departments
      .filter((dept) => dept.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map((dept) => ({
        ...dept,
        children: buildDepartmentTree(dept.id),
      })) as any
  }

  const toggleExpanded = (deptId: string) => {
    const newExpanded = new Set(expandedDepts)
    if (newExpanded.has(deptId)) {
      newExpanded.delete(deptId)
    } else {
      newExpanded.add(deptId)
    }
    setExpandedDepts(newExpanded)
  }

  const getOfficersInDepartment = (deptId: string) => {
    return officers.filter((officer) => officer.departmentId === deptId)
  }

  const getRankColor = (rank: string) => {
    const rankColors: { [key: string]: string } = {
      "Đại tá": "bg-red-100 text-red-800",
      "Thượng tá": "bg-orange-100 text-orange-800",
      "Trung tá": "bg-yellow-100 text-yellow-800",
      "Thiếu tá": "bg-green-100 text-green-800",
      "Đại úy": "bg-blue-100 text-blue-800",
      "Thượng úy": "bg-indigo-100 text-indigo-800",
      "Trung úy": "bg-purple-100 text-purple-800",
      "Thiếu úy": "bg-pink-100 text-pink-800",
    }
    return rankColors[rank] || "bg-gray-100 text-gray-800"
  }

  const getManagerTypeIcon = (managerType: string) => {
    switch (managerType) {
      case "truong":
        return "👑"
      case "pho":
        return "⭐"
      default:
        return "👤"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDept) {
      const updatedDepartments = departments.map((dept) =>
        dept.id === editingDept.id
          ? {
              ...dept,
              ...formData,
              parentId: formData.parentId || null,
            }
          : dept,
      )
      saveDepartments(updatedDepartments)
    } else {
      const parentDept = formData.parentId ? departments.find((d) => d.id === formData.parentId) : null
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData,
        parentId: formData.parentId || null,
        level: parentDept ? parentDept.level + 1 : 0,
        order: departments.filter((d) => d.parentId === (formData.parentId || null)).length + 1,
        createdAt: new Date().toISOString(),
      }
      saveDepartments([...departments, newDepartment])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      parentId: null,
    })
    setEditingDept(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (dept: Department) => {
    setEditingDept(dept)
    setFormData({
      name: dept.name,
      description: dept.description,
      parentId: dept.parentId,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đơn vị này? Tất cả đơn vị con cũng sẽ bị xóa.")) {
      const deleteRecursive = (deptId: string) => {
        const childDepts = departments.filter((d) => d.parentId === deptId)
        childDepts.forEach((child) => deleteRecursive(child.id))
        return departments.filter((d) => d.id !== deptId)
      }

      const updatedDepartments = deleteRecursive(id)
      saveDepartments(updatedDepartments)
    }
  }

  const renderDepartmentNode = (dept: any, level = 0) => {
    const hasChildren = dept.children && dept.children.length > 0
    const isExpanded = expandedDepts.has(dept.id)
    const deptOfficers = getOfficersInDepartment(dept.id)

    // Sắp xếp cán bộ: Trưởng -> Phó -> Cán bộ
    const sortedOfficers = deptOfficers.sort((a, b) => {
      const order = { truong: 1, pho: 2, canbo: 3 }
      return order[a.managerType as keyof typeof order] - order[b.managerType as keyof typeof order]
    })

    return (
      <div key={dept.id} className="mb-4">
        <Card
          className={`${level > 0 ? "ml-8" : ""} transition-all duration-200 hover:shadow-md border-l-4 ${
            level === 0 ? "border-l-red-500" : "border-l-blue-500"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {hasChildren && (
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(dept.id)} className="p-1 h-6 w-6">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
                {!hasChildren && <div className="w-6" />}

                <Shield className={`h-6 w-6 ${level === 0 ? "text-red-600" : "text-blue-600"}`} />

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-lg text-gray-900">{dept.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {deptOfficers.length} cán bộ
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(dept)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(dept.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hiển thị cán bộ trong đơn vị */}
            {sortedOfficers.length > 0 && (
              <div className="space-y-2 pl-9">
                {sortedOfficers.map((officer) => (
                  <div key={officer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getManagerTypeIcon(officer.managerType || "canbo")}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{officer.name}</span>
                          <Badge className={`text-xs ${getRankColor(officer.rank)}`}>{officer.rank}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{officer.position}</p>
                      </div>
                    </div>
                    {officer.isManager && (
                      <Badge variant="secondary" className="text-xs">
                        {officer.managerType === "truong" ? "Trưởng" : "Phó"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Render children */}
        {hasChildren && isExpanded && (
          <div className="mt-2">{dept.children.map((child: any) => renderDepartmentNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  const departmentTree = buildDepartmentTree()
  const totalDepartments = departments.length
  const totalOfficers = officers.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sơ đồ tổ chức Công an</h1>
          <p className="text-gray-600 mt-2">
            Cơ cấu tổ chức lực lượng Công an - {totalDepartments} đơn vị, {totalOfficers} cán bộ
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingDept(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm đơn vị
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDept ? "Chỉnh sửa đơn vị" : "Thêm đơn vị mới"}</DialogTitle>
              <DialogDescription>
                {editingDept ? "Cập nhật thông tin đơn vị" : "Nhập thông tin đơn vị mới"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên đơn vị *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả chức năng</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentId">Đơn vị cấp trên</Label>
                <Select
                  value={formData.parentId}
                  onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đơn vị cấp trên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Không có (Cấp cao nhất)</SelectItem>
                    {departments
                      .filter((d) => d.id !== editingDept?.id)
                      .map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
                <Button type="submit">{editingDept ? "Cập nhật" : "Thêm mới"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn vị</p>
                <p className="text-2xl font-bold text-blue-600">{totalDepartments}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng cán bộ</p>
                <p className="text-2xl font-bold text-green-600">{totalOfficers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trưởng phòng</p>
                <p className="text-2xl font-bold text-purple-600">
                  {officers.filter((o) => o.managerType === "truong").length}
                </p>
              </div>
              <Badge className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                👑
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Phó phòng</p>
                <p className="text-2xl font-bold text-orange-600">
                  {officers.filter((o) => o.managerType === "pho").length}
                </p>
              </div>
              <Badge className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                ⭐
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Cơ cấu tổ chức</CardTitle>
          <CardDescription>Sơ đồ phân cấp các đơn vị và cán bộ Công an</CardDescription>
        </CardHeader>
        <CardContent>
          {departmentTree.length > 0 ? (
            <div className="space-y-2">{departmentTree.map((dept) => renderDepartmentNode(dept))}</div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Chưa có đơn vị nào</p>
              <p className="text-sm">Thêm đơn vị đầu tiên để bắt đầu xây dựng sơ đồ tổ chức</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => {
                const allExpanded = new Set(departments.map((d) => d.id))
                setExpandedDepts(allExpanded)
              }}
            >
              <ChevronDown className="h-6 w-6" />
              <span>Mở rộng tất cả</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => setExpandedDepts(new Set())}
            >
              <ChevronRight className="h-6 w-6" />
              <span>Thu gọn tất cả</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-6 w-6" />
              <span>Thêm đơn vị</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Chú thích</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">👑</span>
              <span className="text-sm">Trưởng phòng/đơn vị</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">⭐</span>
              <span className="text-sm">Phó phòng/đơn vị</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">👤</span>
              <span className="text-sm">Cán bộ</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-100 text-red-800 text-xs">Đại tá</Badge>
              <span className="text-sm">Cấp bậc cao nhất</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
