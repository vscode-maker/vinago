'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';
import { COMPANY_INFO } from '@/lib/constants';

export default function CTASection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary-600 to-primary-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Bạn cần vận chuyển hàng hóa?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-lg">
              Liên hệ ngay với Vinago để được tư vấn miễn phí và nhận báo giá tốt nhất.
              Chúng tôi sẵn sàng phục vụ 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tao-don">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 group"
                >
                  <Truck className="w-5 h-5" />
                  Tạo đơn ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  <Phone className="w-5 h-5" />
                  {COMPANY_INFO.phone}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">10+</p>
              <p className="text-primary-100">Năm kinh nghiệm</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">63</p>
              <p className="text-primary-100">Tỉnh thành</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</p>
              <p className="text-primary-100">Đơn hàng/tháng</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">99%</p>
              <p className="text-primary-100">Khách hài lòng</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
