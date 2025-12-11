'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Youtube,
  CheckCircle,
  Truck,
  Headphones,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { COMPANY_INFO, LOCATIONS } from '@/lib/constants';

export default function LienHePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Hotline',
      value: COMPANY_INFO.phone,
      description: 'Gọi ngay để được tư vấn miễn phí',
      action: `tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`,
      color: 'bg-green-500',
    },
    {
      icon: Mail,
      title: 'Email',
      value: COMPANY_INFO.email,
      description: 'Gửi email, phản hồi trong 24h',
      action: `mailto:${COMPANY_INFO.email}`,
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      title: 'Zalo',
      value: 'Vinago Official',
      description: 'Chat trực tiếp qua Zalo',
      action: COMPANY_INFO.social.zalo,
      color: 'bg-blue-600',
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      value: '24/7',
      description: 'Hỗ trợ khách hàng mọi lúc',
      color: 'bg-primary-500',
    },
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
              <Headphones className="w-5 h-5" />
              <span className="font-semibold text-sm">Hỗ trợ 24/7</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Liên Hệ <span className="text-primary-500">Với Chúng Tôi</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đội ngũ tư vấn viên sẵn sàng hỗ trợ bạn mọi lúc mọi nơi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {item.action ? (
                  <a href={item.action} target="_blank" rel="noopener noreferrer">
                    <Card hover className="h-full text-center p-6 group">
                      <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-xl font-bold text-primary-600 mb-2">{item.value}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </Card>
                  </a>
                ) : (
                  <Card className="h-full text-center p-6">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-primary-600 mb-2">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Gửi Yêu Cầu Tư Vấn
                </h2>
                <p className="text-gray-600 mb-6">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Gửi yêu cầu thành công!
                    </h3>
                    <p className="text-green-700">
                      Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Họ và tên"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Số điện thoại"
                        type="tel"
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Input
                      label="Tiêu đề"
                      placeholder="Tôi muốn gửi hàng từ Hà Nội vào Sài Gòn"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nội dung chi tiết
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả chi tiết về hàng hóa, số lượng, thời gian mong muốn..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Gửi yêu cầu tư vấn
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Company Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Company Info */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{COMPANY_INFO.fullName}</h2>
                    <p className="text-gray-500">Vận chuyển hàng ghép toàn quốc</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Trụ sở chính</p>
                      <p className="text-gray-600">{COMPANY_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Điện thoại</p>
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-primary-600 font-bold text-lg hover:underline">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary-600 hover:underline">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t">
                  <p className="font-medium text-gray-900 mb-3">Kết nối với chúng tôi</p>
                  <div className="flex gap-3">
                    <a
                      href={COMPANY_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={COMPANY_INFO.social.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={COMPANY_INFO.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">Google Maps</p>
                    <p className="text-sm">Bản đồ sẽ được tích hợp sau</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Hệ Thống Bến Bãi
              <span className="text-primary-500"> Toàn Quốc</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mạng lưới bến bãi rộng khắp, thuận tiện gửi nhận hàng
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map((location, idx) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card variant="bordered" className="p-4 h-full hover:border-primary-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{location.name}</h3>
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mb-2">
                        {location.type}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Bạn cần hỗ trợ ngay?
          </h2>
          <p className="text-primary-100 mb-6">
            Gọi ngay hotline để được tư vấn miễn phí và nhận báo giá tốt nhất
          </p>
          <a
            href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg"
          >
            <Phone className="w-6 h-6" />
            Gọi ngay: {COMPANY_INFO.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
