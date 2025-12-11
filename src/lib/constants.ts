// Pricing configuration
export const PRICING_CONFIG = {
  // Giá theo kg (hàng nặng)
  weight: {
    hanoiToHCM: {
      under3T: 1800,
      over3T: 1600,
    },
    hcmToHanoi: {
      under3T: 1700,
      over3T: 1500,
    },
    other: {
      under3T: 1600,
      over3T: 1400,
    },
  },
  // Giá theo khối (hàng nhẹ)
  volume: {
    hanoiToHCM: {
      under15: 500000,
      over20: 450000,
    },
    hcmToHanoi: {
      under15: 490000,
      over20: 450000,
    },
    other: {
      under15: 480000,
      over20: 440000,
    },
  },
  // Phụ phí
  extraFees: {
    bocXep: 200000, // Bốc xếp
    giaoTanNoi: 150000, // Giao tận nơi
    baoGoi: 100000, // Đóng gói
    hoaToc: 500000, // Hỏa tốc
  },
  // Giá thuê nguyên chuyến theo loại xe
  wholeVehicle: {
    "2tan": { basePrice: 3500000, perKm: 15000, capacity: "2 Tấn" },
    "5tan": { basePrice: 5000000, perKm: 18000, capacity: "5 Tấn" },
    "8tan": { basePrice: 7000000, perKm: 22000, capacity: "8 Tấn" },
    "15tan": { basePrice: 10000000, perKm: 28000, capacity: "15 Tấn" },
    "18tan": { basePrice: 12000000, perKm: 32000, capacity: "18 Tấn" },
  },
};

// Routes - Tuyến chính công ty hoạt động
export const ROUTES = [
  // Tuyến Bắc - Nam
  { id: "hn-hcm", from: "Hà Nội", to: "TP.HCM", distance: 1700 },
  { id: "hcm-hn", from: "TP.HCM", to: "Hà Nội", distance: 1700 },
  { id: "bn-hcm", from: "Bắc Ninh", to: "TP.HCM", distance: 1730 },
  { id: "hcm-bn", from: "TP.HCM", to: "Bắc Ninh", distance: 1730 },
  { id: "bg-hcm", from: "Bắc Giang", to: "TP.HCM", distance: 1760 },
  { id: "hcm-bg", from: "TP.HCM", to: "Bắc Giang", distance: 1760 },
  { id: "ls-hcm", from: "Lạng Sơn", to: "TP.HCM", distance: 1850 },
  { id: "hcm-ls", from: "TP.HCM", to: "Lạng Sơn", distance: 1850 },
  // Tuyến nội vùng Bắc
  { id: "hn-bn", from: "Hà Nội", to: "Bắc Ninh", distance: 35 },
  { id: "hn-bg", from: "Hà Nội", to: "Bắc Giang", distance: 55 },
  { id: "hn-ls", from: "Hà Nội", to: "Lạng Sơn", distance: 155 },
  { id: "bn-bg", from: "Bắc Ninh", to: "Bắc Giang", distance: 25 },
  { id: "bg-ls", from: "Bắc Giang", to: "Lạng Sơn", distance: 100 },
];

// Cargo types
export const CARGO_TYPES = [
  { id: "hang-nang", name: "Hàng nặng", chargeBy: "weight" as const },
  { id: "hang-nhe", name: "Hàng nhẹ", chargeBy: "volume" as const },
  { id: "hang-cong-trinh", name: "Hàng công trình", chargeBy: "weight" as const },
  { id: "hang-y-te", name: "Vật dụng y tế", chargeBy: "volume" as const },
  { id: "hang-hoa-chat", name: "Hóa chất", chargeBy: "weight" as const },
  { id: "hang-vai", name: "Hàng vải", chargeBy: "weight" as const },
  { id: "hang-xop", name: "Hàng xốp", chargeBy: "volume" as const },
  { id: "hang-su-kien", name: "Hàng sự kiện", chargeBy: "weight" as const },
  { id: "hang-do-choi", name: "Hàng đồ chơi", chargeBy: "volume" as const },
  { id: "hang-nuoc-ngot", name: "Hàng nước ngọt", chargeBy: "weight" as const },
];

// Vehicle types
export const VEHICLE_TYPES = [
  { id: "2tan", name: "Xe 2 tấn", capacity: "2T", dimensions: "4.2m x 1.8m x 1.8m" },
  { id: "5tan", name: "Xe 5 tấn", capacity: "5T", dimensions: "6.2m x 2m x 2m" },
  { id: "8tan", name: "Xe 8 tấn", capacity: "8T", dimensions: "8.5m x 2.4m x 2.5m" },
  { id: "15tan", name: "Xe 15 tấn", capacity: "15T", dimensions: "9.2m x 2.35m x 2.5m" },
  { id: "18tan", name: "Xe 18 tấn", capacity: "18T", dimensions: "9.5m x 2.35m x 2.5m" },
];

// Delivery time
export const DELIVERY_TIME = [
  { distance: "Dưới 50km", normal: "4-6 giờ", express: "2 giờ", urgent: "1 giờ" },
  { distance: "50 → 200km", normal: "1 ngày", express: "6 giờ", urgent: "5 giờ" },
  { distance: "200 → 400km", normal: "1-2 ngày", express: "1 ngày", urgent: "8 giờ" },
  { distance: "400 → 600km", normal: "2-3 ngày", express: "1 ngày", urgent: "12 giờ" },
  { distance: "600 → 1.000km", normal: "2-3 ngày", express: "2 ngày", urgent: "24 giờ" },
  { distance: "1.000 → 1.700km", normal: "3-4 ngày", express: "3 ngày", urgent: "40 giờ" },
  { distance: "1.700 → 2.000km", normal: "4-6 ngày", express: "4 ngày", urgent: "50 giờ" },
];

// Locations - Điểm gửi/nhận hàng
export const LOCATIONS = [
  {
    id: "hanoi",
    name: "Hà Nội",
    address: "Bãi hàng cây xăng Vạn Thuận đường Phạm Tu - Nguyễn Xiển (gần viện K Tân Triều)",
    type: "Bãi xe chính",
  },
  {
    id: "bacninh",
    name: "Bắc Ninh",
    address: "Bốc hạ tận nơi",
    type: "Bãi xe",
  },
  {
    id: "bacgiang",
    name: "Bắc Giang",
    address: "Bốc hạ tận nơi",
    type: "Bãi xe",
  },
  {
    id: "langson",
    name: "Lạng Sơn",
    address: "141 Nguyễn Phi Khanh, Tam Thanh, Thành phố Lạng Sơn, Lạng Sơn",
    type: "Bãi xe",
  },
  {
    id: "hcm",
    name: "TP. HCM",
    address: "Bốc hạ tận nơi",
    type: "Bến xe chính",
  },
  {
    id: "danang",
    name: "Đà Nẵng",
    address: "Bốc hạ tận nơi",
    type: "Bến xe",
  },
  {
    id: "nhatrang",
    name: "Nha Trang",
    address: "Bốc hạ tận nơi",
    type: "Bãi xe",
  },
  {
    id: "cantho",
    name: "Cần Thơ",
    address: "Bốc hạ tận nơi",
    type: "Bến xe",
  },
];

// Services
export const SERVICES = [
  {
    id: "ghep-kien",
    title: "Ghép Hàng Theo Kiện",
    description: "Ghép hàng lẻ, hàng ghép theo kiện, theo thùng hoặc theo bao. Đây là hình thức phổ biến nhất.",
    icon: "Package",
  },
  {
    id: "ghep-tan",
    title: "Ghép Hàng Theo Tấn",
    description: "Số lượng hàng nhiều hơn sẽ được tính theo khối và theo tấn. Đơn giá/kg tùy theo yêu cầu.",
    icon: "Weight",
  },
  {
    id: "don-nha",
    title: "Ghép Hàng Dọn Nhà, Văn Phòng",
    description: "Dọn nhà, văn phòng, nhà xưởng trọn gói với đội ngũ bốc xếp chuyên nghiệp.",
    icon: "Home",
  },
  {
    id: "ghep-met",
    title: "Ghép Hàng Theo Mét Xe",
    description: "Hàng được xếp riêng một phần xe, rất an toàn đối với các mặt hàng dễ vỡ.",
    icon: "Ruler",
  },
  {
    id: "ghep-san",
    title: "Ghép Hàng Theo Sàn Xe",
    description: "Chọn nguyên sàn trên hoặc sàn dưới riêng, tiện lợi và giá cước ưu đãi nhất.",
    icon: "Layers",
  },
  {
    id: "qua-kho",
    title: "Ghép Hàng Quá Khổ, Quá Tải",
    description: "Những mặt hàng quá khổ, quá tải vẫn được ghép nếu hàng chưa đủ chuyến.",
    icon: "Maximize",
  },
];

// Navigation
export const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tạo đơn", href: "/tao-don" },
  { label: "Tra cứu", href: "/tra-cuu" },
  { label: "Bảng giá", href: "/bang-gia" },
  { label: "Liên hệ", href: "/lien-he" },
];

// Company info
export const COMPANY_INFO = {
  name: "Vinago",
  fullName: "Vinago - Vận Chuyển Hàng Ghép",
  phone: "0966 139 388",
  email: "hotro@vinago.io",
  website: "https://vinago.io",
  address: "789 Lê Thị Riêng, Phường Thới An, Quận 12, TP. HCM",
  social: {
    facebook: "https://facebook.com/vinago",
    zalo: "https://zalo.me/vinago",
    youtube: "https://youtube.com/@vinago",
  },
};
