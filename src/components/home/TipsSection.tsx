'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Package, Layers, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';

const tips = [
  {
    id: 'ghep-le',
    icon: Package,
    title: 'Gửi ghép hàng lẻ',
    description:
      'Quý khách có nhu cầu gửi hàng đi các tỉnh, nếu khối lượng không nhiều thì nên chọn phương pháp gửi ghép hàng phù hợp, nhằm tiết kiệm chi phí cước tối đa.',
  },
  {
    id: 'nguyen-lo',
    icon: Layers,
    title: 'Gửi hàng sỉ nguyên lô',
    description:
      'Phương pháp này dành cho khách hàng gửi hàng nhiều, nguyên lô, nguyên kiện. Gửi càng nhiều cước càng rẻ và có nhiều chương trình giảm giá cước.',
  },
  {
    id: 'hoa-toc',
    icon: Zap,
    title: 'Gửi hàng đi hỏa tốc',
    description:
      'Là phương pháp gửi hàng đi cấp tốc để kịp tiến độ nhận hàng. Người gửi có thể bao nguyên xe đi thẳng để hàng hóa đến tay khách hàng được nhanh nhất.',
  },
];

export default function TipsSection() {
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
            <Lightbulb className="w-5 h-5" />
            <span className="font-semibold text-sm">Mẹo hay</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mách Bạn Mẹo
            <span className="text-primary-500"> Gửi Hàng Tiết Kiệm</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Một số mẹo giúp bạn tối ưu chi phí vận chuyển
          </p>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;

            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="default" padding="lg" hover className="h-full group text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-500 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
