'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Weight, 
  ArrowRight, 
  Truck, 
  Clock, 
  MapPin, 
  Phone,
  CheckCircle,
  Info
} from 'lucide-react';

// Bảng giá chi tiết tuyến Bắc - Nam (Hà Nội, Bắc Ninh, Bắc Giang, Lạng Sơn → TP.HCM)
const northToSouth = [
  { type: 'Hàng nặng', under3T: '1.800đ/Kg', over3T: '1.600đ/Kg', note: 'Hàng kim loại, máy móc...' },
  { type: 'Hàng nhẹ (theo khối)', under3T: '500.000đ/m³', over3T: '450.000đ/m³', note: 'Hàng bông, xốp, nhựa...' },
  { type: 'Hàng công trình', under3T: '1.700đ/Kg', over3T: '1.500đ/Kg', note: 'Vật liệu xây dựng...' },
  { type: 'Vật dụng y tế', under3T: '480.000đ/m³', over3T: '450.000đ/m³', note: 'Thiết bị y tế, giường bệnh...' },
  { type: 'Hóa chất (an toàn)', under3T: '1.700đ/Kg', over3T: '1.400đ/Kg', note: 'Hóa chất công nghiệp...' },
  { type: 'Hàng điện tử', under3T: '2.000đ/Kg', over3T: '1.800đ/Kg', note: 'Linh kiện, thiết bị điện...' },
  { type: 'Hàng thực phẩm khô', under3T: '1.600đ/Kg', over3T: '1.400đ/Kg', note: 'Bánh kẹo, ngũ cốc...' },
];

// Bảng giá chi tiết tuyến Nam - Bắc (TP.HCM → Hà Nội, Bắc Ninh, Bắc Giang, Lạng Sơn)
const southToNorth = [
  { type: 'Hàng vải', under3T: '1.700đ/Kg', over3T: '1.500đ/Kg', note: 'Vải cuộn, quần áo...' },
  { type: 'Hàng xốp, nhẹ', under3T: '490.000đ/m³', over3T: '450.000đ/m³', note: 'Xốp, mút, bông...' },
  { type: 'Hàng sự kiện', under3T: '1.500đ/Kg', over3T: '1.300đ/Kg', note: 'Dụng cụ triển lãm...' },
  { type: 'Hàng đồ chơi', under3T: '480.000đ/m³', over3T: '440.000đ/m³', note: 'Đồ chơi nhựa, gỗ...' },
  { type: 'Hàng nước ngọt', under3T: '1.500đ/Kg', over3T: '1.200đ/Kg', note: 'Nước giải khát đóng chai...' },
  { type: 'Hàng gia dụng', under3T: '1.600đ/Kg', over3T: '1.400đ/Kg', note: 'Đồ gia dụng, nội thất...' },
  { type: 'Hàng mỹ phẩm', under3T: '520.000đ/m³', over3T: '480.000đ/m³', note: 'Mỹ phẩm, dưỡng da...' },
];

// Bảng giá nội vùng miền Bắc
const intraRegionNorth = [
  { route: 'Hà Nội ↔ Bắc Ninh', distance: '35km', price: '150.000đ/tạ', priceVolume: '100.000đ/m³' },
  { route: 'Hà Nội ↔ Bắc Giang', distance: '55km', price: '180.000đ/tạ', priceVolume: '120.000đ/m³' },
  { route: 'Hà Nội ↔ Lạng Sơn', distance: '155km', price: '250.000đ/tạ', priceVolume: '180.000đ/m³' },
  { route: 'Bắc Ninh ↔ Bắc Giang', distance: '25km', price: '120.000đ/tạ', priceVolume: '80.000đ/m³' },
  { route: 'Bắc Giang ↔ Lạng Sơn', distance: '100km', price: '200.000đ/tạ', priceVolume: '150.000đ/m³' },
];

// Bảng giá thuê nguyên chuyến
const wholeVehiclePricing = [
  { 
    vehicle: 'Xe 2 Tấn', 
    dimensions: '4.2m x 1.8m x 1.8m',
    capacity: '~13.6 m³',
    hnToHcm: '3.500.000đ',
    hcmToHn: '3.200.000đ',
    perKm: '15.000đ/km'
  },
  { 
    vehicle: 'Xe 5 Tấn', 
    dimensions: '6.2m x 2m x 2m',
    capacity: '~24.8 m³',
    hnToHcm: '5.000.000đ',
    hcmToHn: '4.500.000đ',
    perKm: '18.000đ/km'
  },
  { 
    vehicle: 'Xe 8 Tấn', 
    dimensions: '8.5m x 2.4m x 2.5m',
    capacity: '~51 m³',
    hnToHcm: '7.000.000đ',
    hcmToHn: '6.500.000đ',
    perKm: '22.000đ/km'
  },
  { 
    vehicle: 'Xe 15 Tấn', 
    dimensions: '9.2m x 2.35m x 2.5m',
    capacity: '~54 m³',
    hnToHcm: '10.000.000đ',
    hcmToHn: '9.000.000đ',
    perKm: '28.000đ/km'
  },
  { 
    vehicle: 'Xe 18 Tấn', 
    dimensions: '9.5m x 2.35m x 2.5m',
    capacity: '~55.8 m³',
    hnToHcm: '12.000.000đ',
    hcmToHn: '11.000.000đ',
    perKm: '32.000đ/km'
  },
];

// Phụ phí
const extraFees = [
  { name: 'Phí bốc xếp', price: '200.000đ', note: 'Bốc xếp tại điểm gửi/nhận' },
  { name: 'Giao tận nơi', price: '150.000đ - 500.000đ', note: 'Tùy khoảng cách từ bến xe' },
  { name: 'Đóng gói cơ bản', price: '100.000đ', note: 'Bọc màng PE, dán tape' },
  { name: 'Đóng gói cao cấp', price: '200.000đ - 500.000đ', note: 'Đóng thùng gỗ, chống sốc' },
  { name: 'Hỏa tốc (gấp)', price: '500.000đ', note: 'Ưu tiên xếp xe ngay' },
  { name: 'Bảo hiểm hàng hóa', price: '0.5% - 1% giá trị', note: 'Bồi thường 100% nếu hư hỏng' },
];

// Thời gian giao hàng - Tuyến chính
const deliveryTime = [
  { route: 'Hà Nội ↔ TP.HCM', distance: '~1.700km', normal: '3-4 ngày', express: '2 ngày', urgent: '40 giờ' },
  { route: 'Bắc Ninh ↔ TP.HCM', distance: '~1.730km', normal: '3-4 ngày', express: '2 ngày', urgent: '42 giờ' },
  { route: 'Bắc Giang ↔ TP.HCM', distance: '~1.760km', normal: '3-4 ngày', express: '2 ngày', urgent: '44 giờ' },
  { route: 'Lạng Sơn ↔ TP.HCM', distance: '~1.850km', normal: '4 ngày', express: '2.5 ngày', urgent: '48 giờ' },
  { route: 'Hà Nội ↔ Bắc Ninh', distance: '~35km', normal: '2-3 giờ', express: '1 giờ', urgent: '45 phút' },
  { route: 'Hà Nội ↔ Bắc Giang', distance: '~55km', normal: '3-4 giờ', express: '2 giờ', urgent: '1 giờ' },
  { route: 'Hà Nội ↔ Lạng Sơn', distance: '~155km', normal: '4-5 giờ', express: '3 giờ', urgent: '2 giờ' },
];

type TabType = 'ghep-hang' | 'nguyen-chuyen' | 'phu-phi' | 'thoi-gian';

export default function BangGiaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ghep-hang');

  const tabs = [
    { id: 'ghep-hang' as TabType, label: 'Ghép hàng', icon: Package },
    { id: 'nguyen-chuyen' as TabType, label: 'Nguyên chuyến', icon: Truck },
    { id: 'phu-phi' as TabType, label: 'Phụ phí', icon: Info },
    { id: 'thoi-gian' as TabType, label: 'Thời gian', icon: Clock },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
              <Package className="w-5 h-5" />
              <span className="font-semibold text-sm">Bảng giá minh bạch</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bảng Giá <span className="text-primary-500">Vận Chuyển</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Giá cước minh bạch, cạnh tranh nhất thị trường. Cam kết không phát sinh chi phí.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab: Ghép hàng */}
          {activeTab === 'ghep-hang' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Tuyến Bắc → Nam */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
                  <div className="flex items-center justify-center gap-4 text-white">
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-1" />
                      <span className="font-bold text-lg">Hà Nội, Bắc Ninh, Bắc Giang, Lạng Sơn</span>
                    </div>
                    <ArrowRight className="w-8 h-8" />
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-1" />
                      <span className="font-bold text-lg">TP.HCM</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loại hàng</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary-500" />
                            Dưới 3 Tấn
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Weight className="w-4 h-4 text-primary-500" />
                            Trên 3 Tấn
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {northToSouth.map((item, idx) => (
                        <tr key={idx} className="hover:bg-primary-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.type}</td>
                          <td className="px-6 py-4 text-sm text-primary-600 font-bold">{item.under3T}</td>
                          <td className="px-6 py-4 text-sm text-green-600 font-bold">{item.over3T}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tuyến Nam → Bắc */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
                  <div className="flex items-center justify-center gap-4 text-white">
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-1" />
                      <span className="font-bold text-lg">TP.HCM</span>
                    </div>
                    <ArrowRight className="w-8 h-8" />
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-1" />
                      <span className="font-bold text-lg">Hà Nội, Bắc Ninh, Bắc Giang, Lạng Sơn</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loại hàng</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-primary-500" />
                            Dưới 3 Tấn
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-2">
                            <Weight className="w-4 h-4 text-primary-500" />
                            Trên 3 Tấn
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {southToNorth.map((item, idx) => (
                        <tr key={idx} className="hover:bg-primary-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.type}</td>
                          <td className="px-6 py-4 text-sm text-primary-600 font-bold">{item.under3T}</td>
                          <td className="px-6 py-4 text-sm text-green-600 font-bold">{item.over3T}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bảng giá nội vùng Bắc */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                  <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Giá Ghép Hàng Nội Vùng Miền Bắc
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tuyến đường</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Khoảng cách</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá theo tạ</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá theo khối</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {intraRegionNorth.map((item, idx) => (
                        <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.route}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.distance}</td>
                          <td className="px-6 py-4 text-sm text-primary-600 font-bold">{item.price}</td>
                          <td className="px-6 py-4 text-sm text-green-600 font-bold">{item.priceVolume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Note */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  Lưu ý quan trọng
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Giá trên áp dụng cho hàng hóa thông thường, không bao gồm hàng cấm</li>
                  <li>• Giá chưa bao gồm phí bốc xếp, đóng gói (xem tab Phụ phí)</li>
                  <li>• Hàng trên 3 tấn được áp dụng giá ưu đãi</li>
                  <li>• <strong>Tuyến chính:</strong> Hà Nội - Bắc Ninh - Bắc Giang - Lạng Sơn ↔ TP.HCM</li>
                  <li>• Liên hệ hotline <strong className="text-primary-600">0966 139 388</strong> để được báo giá chính xác</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tab: Nguyên chuyến */}
          {activeTab === 'nguyen-chuyen' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <h2 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <Truck className="w-6 h-6" />
                    Bảng Giá Thuê Xe Nguyên Chuyến
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loại xe</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kích thước thùng</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thể tích</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">HN → HCM</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">HCM → HN</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá/km (tuyến khác)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {wholeVehiclePricing.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Truck className="w-5 h-5 text-blue-500" />
                              <span className="font-bold text-gray-900">{item.vehicle}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.dimensions}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.capacity}</td>
                          <td className="px-6 py-4 text-sm text-primary-600 font-bold">{item.hnToHcm}</td>
                          <td className="px-6 py-4 text-sm text-green-600 font-bold">{item.hcmToHn}</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-semibold">{item.perKm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, title: 'Chủ động lịch trình', desc: 'Xe riêng, đi theo lịch của bạn' },
                  { icon: Truck, title: 'Toàn bộ không gian', desc: 'Sử dụng 100% thùng xe' },
                  { icon: Clock, title: 'Nhanh hơn 30%', desc: 'Không chờ đợi ghép hàng' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <item.icon className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab: Phụ phí */}
          {activeTab === 'phu-phi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                  <h2 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <Info className="w-6 h-6" />
                    Bảng Phụ Phí Dịch Vụ
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid gap-4">
                    {extraFees.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.note}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary-600">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Miễn phí các dịch vụ
                </h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Tư vấn và báo giá qua điện thoại</li>
                  <li>• Theo dõi đơn hàng online 24/7</li>
                  <li>• Thông báo SMS khi hàng đến nơi</li>
                  <li>• Lưu kho 3 ngày đầu tiên</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tab: Thời gian */}
          {activeTab === 'thoi-gian' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                  <h2 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6" />
                    Thời Gian Giao Hàng Dự Kiến
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tuyến đường</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Khoảng cách</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          <span className="px-3 py-1 bg-gray-200 rounded-full">Thường</span>
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">Nhanh</span>
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">Hỏa tốc</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {deliveryTime.map((item, idx) => (
                        <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.route}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.distance}</td>
                          <td className="px-6 py-4 text-sm text-center text-gray-700">{item.normal}</td>
                          <td className="px-6 py-4 text-sm text-center text-primary-600 font-semibold">{item.express}</td>
                          <td className="px-6 py-4 text-sm text-center text-red-600 font-bold">{item.urgent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-3">📋 Giải thích các gói dịch vụ</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Gói Thường:</span>
                    <p className="text-gray-600">Ghép chung với hàng khác, chờ đủ chuyến mới xuất phát</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary-600">Gói Nhanh:</span>
                    <p className="text-gray-600">Ưu tiên xếp xe, có thể xuất phát khi chưa đủ hàng</p>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Gói Hỏa tốc:</span>
                    <p className="text-gray-600">Xe riêng xuất phát ngay, chạy thẳng không ghép</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Cần báo giá chi tiết?
          </h2>
          <p className="text-primary-100 mb-8">
            Liên hệ ngay để được tư vấn và nhận báo giá chính xác nhất cho đơn hàng của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0966139388"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: 0966 139 388
            </a>
            <a 
              href="/tao-don"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-bold rounded-full hover:bg-primary-800 transition-colors"
            >
              <Package className="w-5 h-5" />
              Tạo đơn hàng
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
