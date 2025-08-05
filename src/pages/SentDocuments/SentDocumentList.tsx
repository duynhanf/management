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
import {
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  FileText,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

interface Document {
  id: string
  type: "incoming" | "outgoing"
  documentNumber: string
  title: string
  sender: string
  receiver: string
  department: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "draft" | "pending" | "approved" | "rejected" | "completed"
  content: string
  attachments: string[]
  createdDate: string
  receivedDate?: string
  sentDate?: string
  dueDate?: string
  processedBy: string
  notes: string
  createdAt: string
}

export default function SentDocumentList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("incoming")
  const [formData, setFormData] = useState({
    type: "incoming" as "incoming" | "outgoing",
    documentNumber: "",
    title: "",
    sender: "",
    receiver: "",
    department: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    status: "pending" as "draft" | "pending" | "approved" | "rejected" | "completed",
    content: "",
    receivedDate: "",
    sentDate: "",
    dueDate: "",
    processedBy: "",
    notes: "",
  })

  useEffect(() => {
    loadDocuments()
    initializeSampleData()
  }, [])

  const loadDocuments = () => {
    const savedDocuments = localStorage.getItem("documents")
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments))
    }
  }

  const initializeSampleData = () => {
    const existingDocs = localStorage.getItem("documents")

    if (!existingDocs) {
      const sampleDocuments: Document[] = [
        // Văn bản đến
        {
          id: "1",
          type: "incoming",
          documentNumber: "CV001/2024",
          title: "Công văn về tăng cường công tác bảo đảm an ninh trật tự",
          sender: "Bộ Công an",
          receiver: "Công an thành phố",
          department: "Phòng Cảnh sát Hình sự",
          priority: "high",
          status: "pending",
          content:
            "Căn cứ tình hình an ninh trật tự hiện tại, Bộ Công an yêu cầu các đơn vị tăng cường các biện pháp bảo đảm an ninh trật tự...",
          attachments: [],
          createdDate: "2024-01-15",
          receivedDate: "2024-01-15",
          dueDate: "2024-01-25",
          processedBy: "Đại tá Nguyễn Văn Minh",
          notes: "Cần xử lý khẩn cấp",
          createdAt: new Date("2024-01-15").toISOString(),
        },
        {
          id: "2",
          type: "incoming",
          documentNumber: "TB002/2024",
          title: "Thông báo về việc tổ chức hội nghị tổng kết năm 2023",
          sender: "UBND thành phố",
          receiver: "Công an thành phố",
          department: "Văn phòng",
          priority: "medium",
          status: "completed",
          content:
            "UBND thành phố thông báo về việc tổ chức hội nghị tổng kết công tác năm 2023 và triển khai nhiệm vụ năm 2024...",
          attachments: ["chuong_trinh_hoi_nghi.pdf"],
          createdDate: "2024-01-10",
          receivedDate: "2024-01-10",
          dueDate: "2024-01-20",
          processedBy: "Thượng tá Trần Thị Hoa",
          notes: "Đã hoàn thành báo cáo",
          createdAt: new Date("2024-01-10").toISOString(),
        },
        {
          id: "3",
          type: "incoming",
          documentNumber: "KH003/2024",
          title: "Kế hoạch triển khai chiến dịch đảm bảo ATGT Tết Nguyên đán",
          sender: "Cục Cảnh sát Giao thông",
          receiver: "Phòng Cảnh sát Giao thông",
          department: "Phòng Cảnh sát Giao thông",
          priority: "urgent",
          status: "approved",
          content: "Triển khai kế hoạch đảm bảo an toàn giao thông trong dịp Tết Nguyên đán 2024...",
          attachments: ["ke_hoach_tet_2024.pdf", "phuong_an_phan_luong.xlsx"],
          createdDate: "2024-01-08",
          receivedDate: "2024-01-08",
          dueDate: "2024-01-18",
          processedBy: "Trung tá Hồ Văn Phúc",
          notes: "Đã phê duyệt và triển khai",
          createdAt: new Date("2024-01-08").toISOString(),
        },
        {
          id: "4",
          type: "incoming",
          documentNumber: "HD004/2024",
          title: "Hướng dẫn về công tác phòng chống tội phạm mạng",
          sender: "Cục An ninh mạng và phòng chống tội phạm công nghệ cao",
          receiver: "Phòng An ninh mạng",
          department: "Phòng An ninh mạng",
          priority: "high",
          status: "pending",
          content: "Hướng dẫn các biện pháp phòng chống tội phạm mạng và bảo vệ thông tin cá nhân...",
          attachments: ["huong_dan_an_ninh_mang.pdf"],
          createdDate: "2024-01-12",
          receivedDate: "2024-01-12",
          dueDate: "2024-01-22",
          processedBy: "Trung tá Đặng Văn Hải",
          notes: "Đang nghiên cứu triển khai",
          createdAt: new Date("2024-01-12").toISOString(),
        },

        // Văn bản đi
        {
          id: "5",
          type: "outgoing",
          documentNumber: "BC001/2024",
          title: "Báo cáo tình hình an ninh trật tự tháng 12/2023",
          sender: "Công an thành phố",
          receiver: "Bộ Công an",
          department: "Văn phòng",
          priority: "medium",
          status: "completed",
          content: "Báo cáo tổng hợp tình hình an ninh trật tự trên địa bàn thành phố trong tháng 12/2023...",
          attachments: ["bao_cao_thang_12.pdf", "bang_thong_ke.xlsx"],
          createdDate: "2024-01-05",
          sentDate: "2024-01-05",
          processedBy: "Đại tá Nguyễn Văn Minh",
          notes: "Đã gửi đúng hạn",
          createdAt: new Date("2024-01-05").toISOString(),
        },
        {
          id: "6",
          type: "outgoing",
          documentNumber: "DE001/2024",
          title: "Đề xuất bổ sung trang thiết bị cho lực lượng CSGT",
          sender: "Phòng Cảnh sát Giao thông",
          receiver: "Bộ Công an",
          department: "Phòng Cảnh sát Giao thông",
          priority: "high",
          status: "pending",
          content: "Đề xuất bổ sung các trang thiết bị cần thiết để nâng cao hiệu quả công tác đảm bảo trật tự ATGT...",
          attachments: ["de_xuat_trang_thiet_bi.pdf", "bang_gia_du_toan.xlsx"],
          createdDate: "2024-01-14",
          sentDate: "2024-01-14",
          processedBy: "Trung tá Hồ Văn Phúc",
          notes: "Chờ phê duyệt từ cấp trên",
          createdAt: new Date("2024-01-14").toISOString(),
        },
        {
          id: "7",
          type: "outgoing",
          documentNumber: "TB001/2024",
          title: "Thông báo kết quả điều tra vụ án hình sự số 01/2024",
          sender: "Phòng Cảnh sát Hình sự",
          receiver: "Viện Kiểm sát nhân dân",
          department: "Phòng Cảnh sát Hình sự",
          priority: "urgent",
          status: "completed",
          content: "Thông báo kết quả điều tra và chuyển hồ sơ vụ án hình sự để xem xét truy tố...",
          attachments: ["ho_so_vu_an.pdf", "bien_ban_dieu_tra.pdf"],
          createdDate: "2024-01-11",
          sentDate: "2024-01-11",
          processedBy: "Trung tá Phạm Văn Thành",
          notes: "Đã chuyển hồ sơ đầy đủ",
          createdAt: new Date("2024-01-11").toISOString(),
        },
        {
          id: "8",
          type: "outgoing",
          documentNumber: "YC001/2024",
          title: "Yêu cầu hỗ trợ kỹ thuật trong điều tra tội phạm mạng",
          sender: "Phòng An ninh mạng",
          receiver: "Cục Kỹ thuật nghiệp vụ",
          department: "Phòng An ninh mạng",
          priority: "high",
          status: "approved",
          content: "Yêu cầu hỗ trợ kỹ thuật chuyên môn trong việc điều tra các vụ án tội phạm mạng phức tạp...",
          attachments: ["yeu_cau_ho_tro.pdf"],
          createdDate: "2024-01-13",
          sentDate: "2024-01-13",
          processedBy: "Trung tá Đặng Văn Hải",
          notes: "Đã được chấp thuận hỗ trợ",
          createdAt: new Date("2024-01-13").toISOString(),
        },
      ]

      localStorage.setItem("documents", JSON.stringify(sampleDocuments))
      setDocuments(sampleDocuments)
    }
  }

  const saveDocuments = (newDocuments: Document[]) => {
    localStorage.setItem("documents", JSON.stringify(newDocuments))
    setDocuments(newDocuments)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDoc) {
      // Update existing document
      const updatedDocuments = documents.map((doc) => (doc.id === editingDoc.id ? { ...doc, ...formData } : doc))
      saveDocuments(updatedDocuments)
    } else {
      // Add new document
      const newDocument: Document = {
        id: Date.now().toString(),
        ...formData,
        attachments: [],
        createdDate: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      }
      saveDocuments([...documents, newDocument])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: activeTab as "incoming" | "outgoing",
      documentNumber: "",
      title: "",
      sender: "",
      receiver: "",
      department: "",
      priority: "medium",
      status: "pending",
      content: "",
      receivedDate: "",
      sentDate: "",
      dueDate: "",
      processedBy: "",
      notes: "",
    })
    setEditingDoc(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (doc: Document) => {
    setEditingDoc(doc)
    setFormData({
      type: doc.type,
      documentNumber: doc.documentNumber,
      title: doc.title,
      sender: doc.sender,
      receiver: doc.receiver,
      department: doc.department,
      priority: doc.priority,
      status: doc.status,
      content: doc.content,
      receivedDate: doc.receivedDate || "",
      sentDate: doc.sentDate || "",
      dueDate: doc.dueDate || "",
      processedBy: doc.processedBy,
      notes: doc.notes,
    })
    setIsDialogOpen(true)
  }

  const handleView = (doc: Document) => {
    setViewingDoc(doc)
    setIsViewDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa văn bản này?")) {
      const updatedDocuments = documents.filter((doc) => doc.id !== id)
      saveDocuments(updatedDocuments)
    }
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      draft: <Edit className="h-4 w-4" />,
      pending: <Clock className="h-4 w-4" />,
      approved: <CheckCircle className="h-4 w-4" />,
      rejected: <XCircle className="h-4 w-4" />,
      completed: <CheckCircle className="h-4 w-4" />,
    }
    return icons[status as keyof typeof icons] || icons.pending
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesTab = doc.type === activeTab
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.receiver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus
    const matchesPriority = filterPriority === "all" || doc.priority === filterPriority

    return matchesTab && matchesSearch && matchesStatus && matchesPriority
  })

  const getStats = () => {
    const incoming = documents.filter((d) => d.type === "incoming")
    const outgoing = documents.filter((d) => d.type === "outgoing")
    const pending = documents.filter((d) => d.status === "pending")
    const urgent = documents.filter((d) => d.priority === "urgent")

    return { incoming: incoming.length, outgoing: outgoing.length, pending: pending.length, urgent: urgent.length }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý văn bản</h1>
          <p className="text-gray-600 mt-2">Quản lý văn bản đến và văn bản đi</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingDoc(null)
                setFormData({ ...formData, type: activeTab as "incoming" | "outgoing" })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm văn bản
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDoc ? "Chỉnh sửa văn bản" : `Thêm văn bản ${activeTab === "incoming" ? "đến" : "đi"}`}
              </DialogTitle>
              <DialogDescription>
                {editingDoc ? "Cập nhật thông tin văn bản" : "Nhập thông tin văn bản mới"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Số văn bản *</Label>
                  <Input
                    id="documentNumber"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="VD: CV001/2024"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban xử lý</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                      <SelectItem value="Phòng Cảnh sát Hình sự">Phòng Cảnh sát Hình sự</SelectItem>
                      <SelectItem value="Phòng Cảnh sát Giao thông">Phòng Cảnh sát Giao thông</SelectItem>
                      <SelectItem value="Phòng An ninh mạng">Phòng An ninh mạng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề văn bản *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sender">{formData.type === "incoming" ? "Nơi gửi" : "Nơi gửi"}</Label>
                  <Input
                    id="sender"
                    value={formData.sender}
                    onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiver">{formData.type === "incoming" ? "Nơi nhận" : "Nơi nhận"}</Label>
                  <Input
                    id="receiver"
                    value={formData.receiver}
                    onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Độ ưu tiên</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: "low" | "medium" | "high" | "urgent") =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "draft" | "pending" | "approved" | "rejected" | "completed") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Nháp</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="approved">Đã duyệt</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processedBy">Người xử lý</Label>
                  <Input
                    id="processedBy"
                    value={formData.processedBy}
                    onChange={(e) => setFormData({ ...formData, processedBy: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {formData.type === "incoming" && (
                  <div className="space-y-2">
                    <Label htmlFor="receivedDate">Ngày nhận</Label>
                    <Input
                      id="receivedDate"
                      type="date"
                      value={formData.receivedDate}
                      onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                    />
                  </div>
                )}
                {formData.type === "outgoing" && (
                  <div className="space-y-2">
                    <Label htmlFor="sentDate">Ngày gửi</Label>
                    <Input
                      id="sentDate"
                      type="date"
                      value={formData.sentDate}
                      onChange={(e) => setFormData({ ...formData, sentDate: e.target.value })}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Hạn xử lý</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Nội dung văn bản</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
                <Button type="submit">{editingDoc ? "Cập nhật" : "Thêm mới"}</Button>
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
                <p className="text-sm font-medium text-gray-600">Văn bản đến</p>
                <p className="text-2xl font-bold text-blue-600">{stats.incoming}</p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Văn bản đi</p>
                <p className="text-2xl font-bold text-green-600">{stats.outgoing}</p>
              </div>
              <Upload className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khẩn cấp</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách văn bản</CardTitle>
              <CardDescription>Quản lý và theo dõi văn bản đến/đi</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm văn bản..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="draft">Nháp</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="incoming">Văn bản đến ({stats.incoming})</TabsTrigger>
              <TabsTrigger value="outgoing">Văn bản đi ({stats.outgoing})</TabsTrigger>
            </TabsList>

            <TabsContent value="incoming" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số văn bản</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Nơi gửi</TableHead>
                    <TableHead>Ngày nhận</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.documentNumber}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{doc.title}</p>
                          <p className="text-sm text-gray-500">{doc.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>{doc.sender}</TableCell>
                      <TableCell>
                        {doc.receivedDate ? new Date(doc.receivedDate).toLocaleDateString("vi-VN") : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getPriorityColor(doc.priority)}`}>
                          {doc.priority === "low" && "Thấp"}
                          {doc.priority === "medium" && "Trung bình"}
                          {doc.priority === "high" && "Cao"}
                          {doc.priority === "urgent" && "Khẩn cấp"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(doc.status)}
                          <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status === "draft" && "Nháp"}
                            {doc.status === "pending" && "Chờ xử lý"}
                            {doc.status === "approved" && "Đã duyệt"}
                            {doc.status === "rejected" && "Từ chối"}
                            {doc.status === "completed" && "Hoàn thành"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(doc)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="outgoing" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số văn bản</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Nơi nhận</TableHead>
                    <TableHead>Ngày gửi</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.documentNumber}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{doc.title}</p>
                          <p className="text-sm text-gray-500">{doc.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>{doc.receiver}</TableCell>
                      <TableCell>{doc.sentDate ? new Date(doc.sentDate).toLocaleDateString("vi-VN") : "-"}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getPriorityColor(doc.priority)}`}>
                          {doc.priority === "low" && "Thấp"}
                          {doc.priority === "medium" && "Trung bình"}
                          {doc.priority === "high" && "Cao"}
                          {doc.priority === "urgent" && "Khẩn cấp"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(doc.status)}
                          <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status === "draft" && "Nháp"}
                            {doc.status === "pending" && "Chờ xử lý"}
                            {doc.status === "approved" && "Đã duyệt"}
                            {doc.status === "rejected" && "Từ chối"}
                            {doc.status === "completed" && "Hoàn thành"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(doc)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Không tìm thấy văn bản nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết văn bản</DialogTitle>
            <DialogDescription>
              {viewingDoc?.type === "incoming" ? "Văn bản đến" : "Văn bản đi"} - {viewingDoc?.documentNumber}
            </DialogDescription>
          </DialogHeader>

          {viewingDoc && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Số văn bản</Label>
                  <p className="text-lg font-medium">{viewingDoc.documentNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Phòng ban xử lý</Label>
                  <p className="text-lg">{viewingDoc.department}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Tiêu đề</Label>
                <p className="text-lg font-medium">{viewingDoc.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    {viewingDoc.type === "incoming" ? "Nơi gửi" : "Nơi gửi"}
                  </Label>
                  <p className="text-lg">{viewingDoc.sender}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    {viewingDoc.type === "incoming" ? "Nơi nhận" : "Nơi nhận"}
                  </Label>
                  <p className="text-lg">{viewingDoc.receiver}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Độ ưu tiên</Label>
                  <div className="mt-1">
                    <Badge className={getPriorityColor(viewingDoc.priority)}>
                      {viewingDoc.priority === "low" && "Thấp"}
                      {viewingDoc.priority === "medium" && "Trung bình"}
                      {viewingDoc.priority === "high" && "Cao"}
                      {viewingDoc.priority === "urgent" && "Khẩn cấp"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Trạng thái</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(viewingDoc.status)}>
                      {viewingDoc.status === "draft" && "Nháp"}
                      {viewingDoc.status === "pending" && "Chờ xử lý"}
                      {viewingDoc.status === "approved" && "Đã duyệt"}
                      {viewingDoc.status === "rejected" && "Từ chối"}
                      {viewingDoc.status === "completed" && "Hoàn thành"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    {viewingDoc.type === "incoming" ? "Ngày nhận" : "Ngày gửi"}
                  </Label>
                  <p className="text-lg">
                    {viewingDoc.type === "incoming"
                      ? viewingDoc.receivedDate
                        ? new Date(viewingDoc.receivedDate).toLocaleDateString("vi-VN")
                        : "-"
                      : viewingDoc.sentDate
                        ? new Date(viewingDoc.sentDate).toLocaleDateString("vi-VN")
                        : "-"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Hạn xử lý</Label>
                  <p className="text-lg">
                    {viewingDoc.dueDate ? new Date(viewingDoc.dueDate).toLocaleDateString("vi-VN") : "-"}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Người xử lý</Label>
                <p className="text-lg">{viewingDoc.processedBy}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Nội dung văn bản</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{viewingDoc.content}</p>
                </div>
              </div>

              {viewingDoc.attachments && viewingDoc.attachments.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tệp đính kèm</Label>
                  <div className="mt-2 space-y-2">
                    {viewingDoc.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{attachment}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewingDoc.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Ghi chú</Label>
                  <div className="mt-2 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingDoc.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Đóng
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEdit(viewingDoc)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
