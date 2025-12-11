'use client';

import { motion } from 'framer-motion';
import { Package, Weight, ArrowLeftRight } from 'lucide-react';

const pricingData = {
  hanoiToHCM: [
    { type: 'Hàng nặng', under3T: '1.800/Kg', over3T: '1.600/Kg' },
    { type: 'Hàng nhẹ', under3T: '500.000/Khối', over3T: '450.000/Khối' },
    { type: 'Hàng công trình', under3T: '1.700/Kg', over3T: '1.500/Kg' },
    { type: 'Hàng vật dụng y tế', under3T: '480.000/Khối', over3T: '450.000/Khối' },
    { type: 'Hàng hóa chất', under3T: '1.700/Kg', over3T: '1.400/Kg' },
  ],
  hcmToHanoi: [
    { type: 'Hàng vải', under3T: '1.700/Kg', over3T: '1.500/Kg' },
    { type: 'Hàng xốp', under3T: '490.000/Khối', over3T: '450.000/Khối' },
    { type: 'Hàng sự kiện', under3T: '1.500/Kg', over3T: '1.300/Kg' },
    { type: 'Hàng đồ chơi', under3T: '480.000/Khối', over3T: '440.000/Khối' },
    { type: 'Hàng nước ngọt', under3T: '1.500/Kg', over3T: '1.200/Kg' },
  ],
};

export default function PricingSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Weight className="w-5 h-5" />
            <span className="font-semibold text-sm">Bảng giá minh bạch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bảng Giá Ghép Hàng Hai Chiều
            <span className="text-primary-500"> Bắc - Nam</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Giá cước minh bạch, cạnh tranh nhất thị trường. Nhiều ưu đãi khi gửi số lượng lớn
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hà Nội → TP.HCM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary-100"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold mb-1">Hà Nội</h3>
                  <p className="text-primary-100 text-sm">Điểm đi</p>
                </div>
                <ArrowLeftRight className="w-8 h-8" />
                <div className="text-right">
                  <h3 className="text-xl font-bold mb-1">TP.HCM</h3>
                  <p className="text-primary-100 text-sm">Điểm đến</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Loại hàng
                    </th>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingData.hanoiToHCM.map((item, idx) => (
                    <tr key={idx} className="hover:bg-primary-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-600 font-semibold">
                        {item.under3T}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-600 font-semibold">
                        {item.over3T}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* TP.HCM → Hà Nội */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary-100"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl font-bold mb-1">TP.HCM</h3>
                  <p className="text-primary-100 text-sm">Điểm đi</p>
                </div>
                <ArrowLeftRight className="w-8 h-8" />
                <div className="text-right">
                  <h3 className="text-xl font-bold mb-1">Hà Nội</h3>
                  <p className="text-primary-100 text-sm">Điểm đến</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Loại hàng
                    </th>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingData.hcmToHanoi.map((item, idx) => (
                    <tr key={idx} className="hover:bg-primary-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-600 font-semibold">
                        {item.under3T}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-600 font-semibold">
                        {item.over3T}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6 text-center"
        >
          <p className="text-gray-700">
            💡 <span className="font-semibold">Lưu ý:</span> Giá trên chưa bao gồm phí bốc xếp, đóng gói.
            Liên hệ <span className="text-primary-600 font-bold">0966 139 388</span> để được tư vấn chi tiết.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
