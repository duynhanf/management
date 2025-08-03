"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Users, Phone, Mail, MapPin, Calendar } from "lucide-react"

interface Officer {
  id: string
  name: string
  position: string
  department: string
  phone: string
  email: string
  address: string
  status: "active" | "inactive"
  notes: string
  createdAt: string
}

export default function OfficerDetailPage() {
  const [officer, setOfficer] = useState<Officer | null>(null)
  const [relativesCount, setRelativesCount] = useState(0)
  const router = useRouter()
  const params = useParams()
  const officerId = params.id as string

  useEffect(() => {
    if (officerId) {
      loadOfficer()
      loadRelativesCount()
    }
  }, [officerId])

  const loadOfficer = () => {
    const officers = JSON.parse(localStorage.getItem("officers") || "[]")
    const foundOfficer = officers.find((o: Officer) => o.id === officerId)
    setOfficer(foundOfficer || null)
  }

  const loadRelativesCount = () => {
    const relatives = JSON.parse(localStorage.getItem("relatives") || "[]")
    const count = relatives.filter((r: any) => r.officerId === officerId).length
    setRelativesCount(count)
  }

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
            <h1 className="text-3xl font-bold text-gray-900">{officer.name}</h1>
            <p className="text-gray-600 mt-1">
              {officer.position} - {officer.department}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/officers/${officer.id}/relatives`)}>
            <Users className="mr-2 h-4 w-4" />
            Quản lý thân nhân ({relativesCount})
          </Button>
          <Button onClick={() => router.push(`/dashboard/officers?edit=${officer.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                  <p className="text-lg font-medium">{officer.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Chức vụ</label>
                  <p className="text-lg">{officer.position}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Phòng ban</label>
                  <p className="text-lg">{officer.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <div className="mt-1">
                    <Badge variant={officer.status === "active" ? "default" : "secondary"}>
                      {officer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {officer.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    <p className="text-lg">{officer.phone}</p>
                  </div>
                </div>
              )}

              {officer.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg">{officer.email}</p>
                  </div>
                </div>
              )}

              {officer.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                    <p className="text-lg">{officer.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {officer.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{officer.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Số thân nhân</span>
                <span className="text-2xl font-bold text-blue-600">{relativesCount}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                  <p className="text-sm">{new Date(officer.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push(`/dashboard/officers/${officer.id}/relatives`)}
              >
                <Users className="mr-2 h-4 w-4" />
                Quản lý thân nhân
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push(`/dashboard/officers?edit=${officer.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa thông tin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
