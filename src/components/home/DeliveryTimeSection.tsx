'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Truck } from 'lucide-react';
import { DELIVERY_TIME } from '@/lib/constants';

export default function DeliveryTimeSection() {
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
            <Clock className="w-5 h-5" />
            <span className="font-semibold text-sm">Thời gian giao hàng</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thời Gian Vận Chuyển
            <span className="text-primary-500"> Hàng Ghép</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đa dạng gói dịch vụ theo thời gian, đảm bảo giao hàng đúng hẹn
          </p>
        </motion.div>

        {/* Delivery Time Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Cung đường</th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Truck className="w-5 h-5" />
                      <span>Ghép Thông Thường</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>Bao Xe</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span>Đi Hỏa Tốc</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DELIVERY_TIME.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-primary-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {row.distance}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {row.normal}
                    </td>
                    <td className="px-6 py-4 text-center text-primary-600 font-medium">
                      {row.express}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Zap className="w-4 h-4" />
                        {row.urgent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ghép Thông Thường</p>
              <p className="text-sm text-gray-500">Tiết kiệm chi phí nhất</p>
            </div>
          </div>
          <div className="bg-primary-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-200 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Bao Xe</p>
              <p className="text-sm text-gray-500">Nhanh hơn, an toàn hơn</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold">Hỏa Tốc</p>
              <p className="text-sm text-primary-100">Giao nhanh nhất có thể</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
