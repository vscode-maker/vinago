'use client';

import { motion } from 'framer-motion';
import { Truck, Container, Package } from 'lucide-react';
import Card from '@/components/ui/Card';

const vehicleTypes = [
  {
    id: 'thung-kin',
    name: 'Xe Thùng Kín',
    description: 'Phù hợp hàng lẻ, yêu cầu an toàn, hạn chế mưa ướt hoặc cần niêm seal',
    icon: Container,
  },
  {
    id: '2-san',
    name: 'Xe 2 Sàn',
    description: 'Phù hợp ghép chậu gốm sứ, cây cảnh hoặc nội thất tránh hàng đè lên nhau',
    icon: Truck,
  },
  {
    id: 'mui-bat',
    name: 'Xe Mui Bạt',
    description: 'Mui bạt tháo rời, phù hợp ghép máy móc cần lên xuống bằng xe cẩu',
    icon: Truck,
  },
  {
    id: 'qua-kho',
    name: 'Xe Quá Khổ',
    description: 'Xe Rờ Mooc lùn ghép hàng lẻ có kích thước lớn, siêu trường siêu trọng',
    icon: Container,
  },
  {
    id: 'thung-lung',
    name: 'Xe Thùng Lửng',
    description: 'Phù hợp ghép gạch, máy móc cấu kiện lớn, dùng xe nâng từ bên hông',
    icon: Package,
  },
  {
    id: 'container',
    name: 'Xe Container',
    description: 'Ghép tất cả các loại hàng lẻ bằng container, an toàn nhất, giá siêu rẻ',
    icon: Container,
  },
];

export default function VehicleTypesSection() {
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
            <Truck className="w-5 h-5" />
            <span className="font-semibold text-sm">Đa dạng phương tiện</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loại Xe Tải
            <span className="text-primary-500"> Ghép Hàng Chuyên Dụng</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đội xe đa dạng, phù hợp với mọi loại hàng hóa và nhu cầu vận chuyển
          </p>
        </motion.div>

        {/* Vehicle Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleTypes.map((vehicle, index) => {
            const IconComponent = vehicle.icon;

            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="bordered" padding="lg" hover className="h-full group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
