"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Calendar, TrendingUp, FileText, Shield, User } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalOfficers: 0,
    activeOfficers: 0,
    totalRelatives: 0,
    newThisMonth: 0,
    totalDocuments: 0,
    totalDepartments: 0,
  })

  useEffect(() => {
    // Load statistics from localStorage
    const officers = JSON.parse(localStorage.getItem("officers") || "[]")
    const relatives = JSON.parse(localStorage.getItem("relatives") || "[]")
    const documents = JSON.parse(localStorage.getItem("documents") || "[]")
    const departments = JSON.parse(localStorage.getItem("police_departments") || "[]")

    setStats({
      totalOfficers: officers.length,
      activeOfficers: officers.filter((o: any) => o.status === "active").length,
      totalRelatives: relatives.length,
      newThisMonth: officers.filter((o: any) => {
        const createdDate = new Date(o.createdAt || Date.now())
        const now = new Date()
        return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
      }).length,
      totalDocuments: documents.length,
      totalDepartments: departments.length,
    })
  }, [])

  const statCards = [
    {
      title: "Tổng số cán bộ",
      value: stats.totalOfficers,
      description: "Tổng cán bộ trong hệ thống",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cán bộ đang hoạt động",
      value: stats.activeOfficers,
      description: "Cán bộ có trạng thái hoạt động",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tổng thân nhân",
      value: stats.totalRelatives,
      description: "Tổng số thân nhân được quản lý",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Mới trong tháng",
      value: stats.newThisMonth,
      description: "Cán bộ mới thêm trong tháng",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Tổng văn bản",
      value: stats.totalDocuments,
      description: "Tổng số văn bản được quản lý",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Tổng đơn vị",
      value: stats.totalDepartments,
      description: "Tổng số đơn vị trong tổ chức",
      icon: Shield,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Tổng quan hệ thống quản lý cán bộ Công an</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Các thay đổi mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Hệ thống được khởi tạo với dữ liệu mẫu</p>
                  <p className="text-xs text-gray-500">Vừa xong</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Tạo sơ đồ tổ chức Công an thành phố</p>
                  <p className="text-xs text-gray-500">5 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Thêm {stats.totalOfficers} cán bộ vào hệ thống</p>
                  <p className="text-xs text-gray-500">10 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Khởi tạo {stats.totalDocuments} văn bản mẫu</p>
                  <p className="text-xs text-gray-500">15 phút trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hướng dẫn sử dụng</CardTitle>
            <CardDescription>Các bước cơ bản để sử dụng hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium">Quản lý cán bộ</p>
                  <p className="text-xs text-gray-500">Thêm, sửa, xóa thông tin cán bộ và thân nhân</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium">Sơ đồ tổ chức</p>
                  <p className="text-xs text-gray-500">Xem cấu trúc tổ chức và phân cấp các đơn vị</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium">Quản lý văn bản</p>
                  <p className="text-xs text-gray-500">Theo dõi văn bản đến và văn bản đi</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                  4
                </div>
                <div>
                  <p className="text-sm font-medium">Hồ sơ cá nhân</p>
                  <p className="text-xs text-gray-500">Cập nhật thông tin cá nhân và gia đình</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>Các chức năng thường sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Thêm cán bộ</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Tạo văn bản</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Xem sơ đồ</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium">Cập nhật hồ sơ</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
