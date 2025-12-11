'use client';

import Link from 'next/link';
import { Truck, Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';
import { NAV_ITEMS, COMPANY_INFO, LOCATIONS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Vina<span className="text-primary-500">go</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Dịch vụ vận chuyển hàng ghép chuyên nghiệp, uy tín hàng đầu Việt Nam.
              Cam kết giao hàng an toàn, đúng hẹn với giá cước tốt nhất.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors text-sm font-bold"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Liên kết nhanh</h4>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/huong-dan"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                Hướng dẫn đóng gói
              </Link>
              <Link
                href="/chinh-sach"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                Chính sách vận chuyển
              </Link>
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Bến bãi xe</h4>
            <div className="flex flex-col gap-4">
              {LOCATIONS.slice(0, 4).map((location) => (
                <div key={location.id} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{location.name}</p>
                    <p className="text-gray-400 text-sm">{location.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Liên hệ</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-500 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm">Hotline 24/7</p>
                  <p className="text-white font-bold text-lg">{COMPANY_INFO.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-500 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm">Email</p>
                  <p className="text-white font-medium">{COMPANY_INFO.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {COMPANY_INFO.fullName}. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/dieu-khoan" className="text-gray-400 hover:text-primary-500 transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="/bao-mat" className="text-gray-400 hover:text-primary-500 transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
