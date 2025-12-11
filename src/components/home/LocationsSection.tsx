'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import Card from '@/components/ui/Card';
import { LOCATIONS } from '@/lib/constants';

export default function LocationsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold text-sm">Điểm gửi hàng</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bến Bãi Xe Tải
            <span className="text-primary-500"> Ghép Hàng Đi Cả Nước</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mạng lưới bến bãi rộng khắp, thuận tiện cho việc gửi và nhận hàng
          </p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCATIONS.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="bordered" padding="lg" hover className="h-full group">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors">
                    <MapPin className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs text-primary-600 font-medium">{location.type}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                      {location.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {location.address}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
