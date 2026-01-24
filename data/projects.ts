export interface Project {
  id: number
  title: string
  description: string
  category: string[]
  image: string
  technologies: string[]
  features: string[]
  results?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Tối ưu hoá chuỗi cung ứng B2B",
    description: "Tối ưu hoá logistics cho doanh nghiệp sản xuất với hệ thống kho vận thông minh",
    category: ["Supply Chain", "Warehouse", "Optimization"],
    image: "/cang_cat_lai.jpg",
    technologies: ["WMS", "TMS", "ERP Integration"],
    features: [
      "Giảm 30% thời gian xử lý đơn hàng",
      "Tối ưu không gian kho bãi",
      "Tích hợp hệ thống theo dõi thời gian thực"
    ],
    results: ["Tiết kiệm 25% chi phí logistics", "Tăng 40% hiệu suất kho"]
  },
  {
    id: 2,
    title: "Hệ thống quản lý vận tải đa phương thức",
    description: "Phát triển nền tảng quản lý vận tải đường bộ, đường biển và đường hàng không",
    category: ["Transportation", "Multimodal", "Tracking"],
    image: "/metro.jpg",
    technologies: ["GPS Tracking", "API Integration", "Cloud Computing"],
    features: [
      "Theo dõi vị trí container thời gian thực",
      "Tự động hoá document processing",
      "Báo cáo analytics tự động"
    ],
    results: ["Giảm 35% thời gian vận chuyển", "Tăng độ chính xác lên 99%"]
  }
]