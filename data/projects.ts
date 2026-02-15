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
    title: "Thực tập chuyên môn – Công ty TNHH SPX Express",
    description: "Tham gia thực tập trong lĩnh vực logistics và vận tải, hỗ trợ hoạt động vận hành thực tế.",
    category: ["Logistics", "Vận tải", "Vận hành"],
    image: "/SPX_express_logo.png",
    technologies: ["Hệ thống quản lý đơn hàng", "Hệ thống theo dõi vận chuyển", "Quy trình vận hành nội bộ"],
    features: [
      "Hỗ trợ theo dõi tiến độ giao nhận và cập nhật thông tin đơn hàng",
      "Hỗ trợ xử lý các vấn đề phát sinh trong quá trình vận chuyển",
      "Phối hợp với các bộ phận để đảm bảo hoạt động vận hành diễn ra đúng kế hoạch",
      "Tìm hiểu và học hỏi quy trình vận hành thực tế trong lĩnh vực logistics và vận tải"
    ]
  },
  {
    id: 2,
    title: "Báo cáo phân tích doanh nghiệp – Công ty Cổ phần Transimex",
    description: "Thực hiện phân tích chuỗi cung ứng và đánh giá hiệu quả hoạt động doanh nghiệp.",
    category: ["Chuỗi cung ứng", "Phân tích kinh doanh", "Tối ưu hóa"],
    image: "/Transimex.jpg",
    technologies: ["Phân tích chuỗi cung ứng", "Tối ưu chi phí", "Cải tiến quy trình"],
    features: [
      "Đánh giá chuỗi cung ứng và đề xuất chiến lược tối ưu chi phí",
      "Chuẩn bị báo cáo hỗ trợ quản lý nhằm nâng cao hiệu quả hoạt động",
      "Tối ưu quy trình vận hành để tiết kiệm thời gian và chi phí"
    ]
  }
]
