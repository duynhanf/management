import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Phone, Mail, Calendar, Shield, Users, Camera, Save, Eye, EyeOff } from "lucide-react"

interface UserProfile {
  id: string
  username: string
  name: string
  rank: string
  position: string
  department: string
  phone: string
  email: string
  address: string
  birthDate: string
  joinDate: string
  idNumber: string
  avatar?: string
  bio: string
  emergencyContact: string
  emergencyPhone: string
  createdAt: string
}

interface UserRelative {
  id: string
  userId: string
  name: string
  relationship: string
  birthDate: string
  phone: string
  address: string
  occupation: string
  idNumber: string
  notes: string
  createdAt: string
}

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userRelatives, setUserRelatives] = useState<UserRelative[]>([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isRelativeDialogOpen, setIsRelativeDialogOpen] = useState(false)
  const [editingRelative, setEditingRelative] = useState<UserRelative | null>(null)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: "",
    rank: "",
    position: "",
    department: "",
    phone: "",
    email: "",
    address: "",
    birthDate: "",
    joinDate: "",
    idNumber: "",
    bio: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [relativeForm, setRelativeForm] = useState({
    name: "",
    relationship: "",
    birthDate: "",
    phone: "",
    address: "",
    occupation: "",
    idNumber: "",
    notes: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      loadUserProfile(userData.id)
      loadUserRelatives(userData.id)
    }
  }, [])

  const loadUserProfile = (userId: string) => {
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "[]")
    let profile = profiles.find((p: UserProfile) => p.id === userId)

    if (!profile) {
      // Create default profile if not exists
      profile = {
        id: userId,
        username: "admin",
        name: "Đại tá Nguyễn Văn Minh",
        rank: "Đại tá",
        position: "Giám đốc Công an thành phố",
        department: "Công an thành phố",
        phone: "0123456789",
        email: "giamdoc@catp.gov.vn",
        address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
        birthDate: "1975-05-15",
        joinDate: "2000-08-01",
        idNumber: "025123456789",
        bio: "Có hơn 20 năm kinh nghiệm trong lực lượng Công an nhân dân. Đã trải qua nhiều vị trí công tác khác nhau và có nhiều đóng góp trong công tác bảo đảm an ninh trật tự.",
        emergencyContact: "Trần Thị Hoa",
        emergencyPhone: "0987654321",
        createdAt: new Date().toISOString(),
      }
      profiles.push(profile)
      localStorage.setItem("userProfiles", JSON.stringify(profiles))
    }

    setUserProfile(profile)
    setProfileForm({
      name: profile.name,
      rank: profile.rank,
      position: profile.position,
      department: profile.department,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      birthDate: profile.birthDate,
      joinDate: profile.joinDate,
      idNumber: profile.idNumber,
      bio: profile.bio,
      emergencyContact: profile.emergencyContact,
      emergencyPhone: profile.emergencyPhone,
    })
  }

  const loadUserRelatives = (userId: string) => {
    const relatives = JSON.parse(localStorage.getItem("userRelatives") || "[]")
    let userRels = relatives.filter((r: UserRelative) => r.userId === userId)

    if (userRels.length === 0) {
      // Create sample relatives
      const sampleRelatives: UserRelative[] = [
        {
          id: "rel1",
          userId: userId,
          name: "Trần Thị Hoa",
          relationship: "Vợ",
          birthDate: "1978-03-20",
          phone: "0987654321",
          address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          occupation: "Giáo viên",
          idNumber: "025987654321",
          notes: "Giáo viên Trường THPT Nguyễn Du",
          createdAt: new Date().toISOString(),
        },
        {
          id: "rel2",
          userId: userId,
          name: "Nguyễn Văn Nam",
          relationship: "Con trai",
          birthDate: "2005-12-10",
          phone: "0912345678",
          address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          occupation: "Học sinh",
          idNumber: "025112345678",
          notes: "Học sinh lớp 12A1 Trường THPT Lê Quý Đôn",
          createdAt: new Date().toISOString(),
        },
        {
          id: "rel3",
          userId: userId,
          name: "Nguyễn Thị Mai",
          relationship: "Con gái",
          birthDate: "2008-07-25",
          phone: "",
          address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          occupation: "Học sinh",
          idNumber: "",
          notes: "Học sinh lớp 9B Trường THCS Trần Hưng Đạo",
          createdAt: new Date().toISOString(),
        },
      ]

      relatives.push(...sampleRelatives)
      localStorage.setItem("userRelatives", JSON.stringify(relatives))
      userRels = sampleRelatives
    }

    setUserRelatives(userRels)
  }

  const handleSaveProfile = () => {
    if (!userProfile) return

    const updatedProfile = { ...userProfile, ...profileForm }
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "[]")
    const updatedProfiles = profiles.map((p: UserProfile) => (p.id === userProfile.id ? updatedProfile : p))

    localStorage.setItem("userProfiles", JSON.stringify(updatedProfiles))
    setUserProfile(updatedProfile)
    setIsEditingProfile(false)

    // Update current user info
    const updatedUser = { ...currentUser, name: profileForm.name }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  const handleSaveRelative = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) return

    const relatives = JSON.parse(localStorage.getItem("userRelatives") || "[]")

    if (editingRelative) {
      // Update existing relative
      const updatedRelatives = relatives.map((r: UserRelative) =>
        r.id === editingRelative.id ? { ...r, ...relativeForm } : r,
      )
      localStorage.setItem("userRelatives", JSON.stringify(updatedRelatives))
      setUserRelatives(updatedRelatives.filter((r: UserRelative) => r.userId === currentUser.id))
    } else {
      // Add new relative
      const newRelative: UserRelative = {
        id: Date.now().toString(),
        userId: currentUser.id,
        ...relativeForm,
        createdAt: new Date().toISOString(),
      }
      relatives.push(newRelative)
      localStorage.setItem("userRelatives", JSON.stringify(relatives))
      setUserRelatives([...userRelatives, newRelative])
    }

    resetRelativeForm()
  }

  const resetRelativeForm = () => {
    setRelativeForm({
      name: "",
      relationship: "",
      birthDate: "",
      phone: "",
      address: "",
      occupation: "",
      idNumber: "",
      notes: "",
    })
    setEditingRelative(null)
    setIsRelativeDialogOpen(false)
  }

  const handleEditRelative = (relative: UserRelative) => {
    setEditingRelative(relative)
    setRelativeForm({
      name: relative.name,
      relationship: relative.relationship,
      birthDate: relative.birthDate,
      phone: relative.phone,
      address: relative.address,
      occupation: relative.occupation,
      idNumber: relative.idNumber,
      notes: relative.notes,
    })
    setIsRelativeDialogOpen(true)
  }

  const handleDeleteRelative = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thông tin thân nhân này?")) {
      const relatives = JSON.parse(localStorage.getItem("userRelatives") || "[]")
      const updatedRelatives = relatives.filter((r: UserRelative) => r.id !== id)
      localStorage.setItem("userRelatives", JSON.stringify(updatedRelatives))
      setUserRelatives(userRelatives.filter((r) => r.id !== id))
    }
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.currentPassword !== "123456") {
      alert("Mật khẩu hiện tại không đúng")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp")
      return
    }

    if (passwordForm.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự")
      return
    }

    // In real app, this would call an API
    alert("Đổi mật khẩu thành công!")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsPasswordDialogOpen(false)
  }

  const relationshipOptions = [
    "Vợ/Chồng",
    "Con trai",
    "Con gái",
    "Cha",
    "Mẹ",
    "Anh/Em trai",
    "Chị/Em gái",
    "Ông",
    "Bà",
    "Khác",
  ]

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

  if (!userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và thân nhân</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={`text-sm ${getRankColor(userProfile.rank)}`}>{userProfile.rank}</Badge>
                </div>
                <p className="text-gray-600 mb-1">{userProfile.position}</p>
                <p className="text-sm text-gray-500 mb-4">{userProfile.department}</p>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Ngày sinh: {new Date(userProfile.birthDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span>Ngày nhập ngũ: {new Date(userProfile.joinDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>

                <div className="w-full mt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditingProfile ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="relatives">Thân nhân ({userRelatives.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditingProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rank">Cấp bậc</Label>
                          <Select
                            value={profileForm.rank}
                            onValueChange={(value) => setProfileForm({ ...profileForm, rank: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Đại tá">Đại tá</SelectItem>
                              <SelectItem value="Thượng tá">Thượng tá</SelectItem>
                              <SelectItem value="Trung tá">Trung tá</SelectItem>
                              <SelectItem value="Thiếu tá">Thiếu tá</SelectItem>
                              <SelectItem value="Đại úy">Đại úy</SelectItem>
                              <SelectItem value="Thượng úy">Thượng úy</SelectItem>
                              <SelectItem value="Trung úy">Trung úy</SelectItem>
                              <SelectItem value="Thiếu úy">Thiếu úy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Chức vụ</Label>
                          <Input
                            id="position"
                            value={profileForm.position}
                            onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Đơn vị</Label>
                          <Input
                            id="department"
                            value={profileForm.department}
                            onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                          id="address"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="birthDate">Ngày sinh</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={profileForm.birthDate}
                            onChange={(e) => setProfileForm({ ...profileForm, birthDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="joinDate">Ngày nhập ngũ</Label>
                          <Input
                            id="joinDate"
                            type="date"
                            value={profileForm.joinDate}
                            onChange={(e) => setProfileForm({ ...profileForm, joinDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="idNumber">Số CCCD</Label>
                          <Input
                            id="idNumber"
                            value={profileForm.idNumber}
                            onChange={(e) => setProfileForm({ ...profileForm, idNumber: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Tiểu sử</Label>
                        <Textarea
                          id="bio"
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Người liên hệ khẩn cấp</Label>
                          <Input
                            id="emergencyContact"
                            value={profileForm.emergencyContact}
                            onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">SĐT khẩn cấp</Label>
                          <Input
                            id="emergencyPhone"
                            value={profileForm.emergencyPhone}
                            onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Lưu thay đổi
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Họ và tên</Label>
                          <p className="text-lg font-medium">{userProfile.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Cấp bậc</Label>
                          <div className="mt-1">
                            <Badge className={getRankColor(userProfile.rank)}>{userProfile.rank}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Chức vụ</Label>
                          <p className="text-lg">{userProfile.position}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Đơn vị</Label>
                          <p className="text-lg">{userProfile.department}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Số điện thoại</Label>
                          <p className="text-lg">{userProfile.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Email</Label>
                          <p className="text-lg">{userProfile.email}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Địa chỉ</Label>
                        <p className="text-lg">{userProfile.address}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Ngày sinh</Label>
                          <p className="text-lg">{new Date(userProfile.birthDate).toLocaleDateString("vi-VN")}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Ngày nhập ngũ</Label>
                          <p className="text-lg">{new Date(userProfile.joinDate).toLocaleDateString("vi-VN")}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Số CCCD</Label>
                          <p className="text-lg">{userProfile.idNumber}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Tiểu sử</Label>
                        <p className="text-gray-700 mt-2 leading-relaxed">{userProfile.bio}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Người liên hệ khẩn cấp</Label>
                          <p className="text-lg">{userProfile.emergencyContact}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">SĐT khẩn cấp</Label>
                          <p className="text-lg">{userProfile.emergencyPhone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relatives">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Thông tin thân nhân</CardTitle>
                      <CardDescription>Quản lý thông tin thân nhân của bạn</CardDescription>
                    </div>
                    <Dialog open={isRelativeDialogOpen} onOpenChange={setIsRelativeDialogOpen}>
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

                        <form onSubmit={handleSaveRelative} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Họ và tên *</Label>
                              <Input
                                id="name"
                                value={relativeForm.name}
                                onChange={(e) => setRelativeForm({ ...relativeForm, name: e.target.value })}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="relationship">Mối quan hệ *</Label>
                              <Select
                                value={relativeForm.relationship}
                                onValueChange={(value) => setRelativeForm({ ...relativeForm, relationship: value })}
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
                                value={relativeForm.birthDate}
                                onChange={(e) => setRelativeForm({ ...relativeForm, birthDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Số điện thoại</Label>
                              <Input
                                id="phone"
                                value={relativeForm.phone}
                                onChange={(e) => setRelativeForm({ ...relativeForm, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input
                              id="address"
                              value={relativeForm.address}
                              onChange={(e) => setRelativeForm({ ...relativeForm, address: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="occupation">Nghề nghiệp</Label>
                              <Input
                                id="occupation"
                                value={relativeForm.occupation}
                                onChange={(e) => setRelativeForm({ ...relativeForm, occupation: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="idNumber">Số CCCD</Label>
                              <Input
                                id="idNumber"
                                value={relativeForm.idNumber}
                                onChange={(e) => setRelativeForm({ ...relativeForm, idNumber: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes">Ghi chú</Label>
                            <Textarea
                              id="notes"
                              value={relativeForm.notes}
                              onChange={(e) => setRelativeForm({ ...relativeForm, notes: e.target.value })}
                              rows={3}
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={resetRelativeForm}>
                              Hủy
                            </Button>
                            <Button type="submit">{editingRelative ? "Cập nhật" : "Thêm mới"}</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
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
                      {userRelatives.map((relative) => (
                        <TableRow key={relative.id}>
                          <TableCell className="font-medium">{relative.name}</TableCell>
                          <TableCell>{relative.relationship}</TableCell>
                          <TableCell>
                            {relative.birthDate ? new Date(relative.birthDate).toLocaleDateString("vi-VN") : "-"}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {relative.phone && <div>{relative.phone}</div>}
                              {relative.address && (
                                <div className="text-gray-500 truncate max-w-32">{relative.address}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{relative.occupation || "-"}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditRelative(relative)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteRelative(relative.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {userRelatives.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có thông tin thân nhân nào</p>
                      <p className="text-sm">Thêm thông tin thân nhân để quản lý tốt hơn</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>Nhập mật khẩu hiện tại và mật khẩu mới</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại *</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
                  setIsPasswordDialogOpen(false)
                }}
              >
                Hủy
              </Button>
              <Button type="submit">Đổi mật khẩu</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
