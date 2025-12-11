'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Search, ArrowRight, Package, Clock, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Truck className="w-5 h-5" />
              <span className="font-semibold text-sm">Vận chuyển hàng ghép #1 Việt Nam</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Vận chuyển{' '}
              <span className="text-gradient">nhanh chóng</span>
              <br />
              An toàn & Tiết kiệm
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Dịch vụ vận chuyển hàng ghép chuyên nghiệp, giao hàng toàn quốc.
              Cam kết giá cước tốt nhất, giao hàng đúng hẹn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/tao-don">
                <Button size="lg" className="w-full sm:w-auto group">
                  <Package className="w-5 h-5" />
                  Tạo đơn ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/tra-cuu">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  Tra cứu đơn hàng
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">1.000+</p>
                  <p className="text-sm text-gray-500">Đơn hàng/ngày</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Hỗ trợ liên tục</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-500">Bảo hiểm</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-3xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Truck className="w-12 h-12 text-white" />
              </div>
              
              {/* Main illustration - with gradient background */}
              <div className="absolute inset-8 bg-gradient-to-br from-primary-50 via-white to-primary-100 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200/40 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-300/30 rounded-full blur-xl" />
                
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-primary-200/50">
                    <Truck className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Giao hàng toàn quốc</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mt-2">63 Tỉnh thành</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Đã giao thành công</p>
                  <p className="text-xs text-gray-500">2 phút trước</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -20 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-20 -left-10 bg-white rounded-xl shadow-lg p-4"
              >
                <p className="font-bold text-primary-500 text-lg">Giá chỉ từ</p>
                <p className="text-2xl font-bold text-gray-900">1.400đ/kg</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
