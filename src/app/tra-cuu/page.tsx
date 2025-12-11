'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  Truck,
  Warehouse,
  MapPin,
  CheckCircle,
  Clock,
  User,
  Phone,
  FileText,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { formatNumber } from '@/lib/utils';

// Mock order data
const mockOrderData = {
  id: 'VNG123456789',
  status: 'in-transit',
  sender: {
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
  },
  receiver: {
    name: 'Trần Văn B',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận Cầu Giấy, Hà Nội',
  },
  cargo: {
    type: 'Hàng nặng',
    weight: 150,
    volume: 2.5,
    packages: 3,
  },
  price: 420000,
  createdAt: '2025-12-08T10:00:00',
  estimatedDelivery: '2025-12-12T18:00:00',
  timeline: [
    { status: 'created', title: 'Đã nhận đơn', time: '08/12/2025 10:00', completed: true },
    { status: 'pickup', title: 'Đang lấy hàng', time: '08/12/2025 14:30', completed: true },
    { status: 'warehouse', title: 'Đã nhập kho', time: '08/12/2025 18:00', completed: true },
    { status: 'transit', title: 'Đang vận chuyển', time: '09/12/2025 06:00', completed: true, current: true },
    { status: 'delivering', title: 'Đang giao', time: '', completed: false },
    { status: 'delivered', title: 'Đã giao', time: '', completed: false },
  ],
};

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  created: Package,
  pickup: Truck,
  warehouse: Warehouse,
  transit: Truck,
  delivering: MapPin,
  delivered: CheckCircle,
};

export default function TrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<typeof mockOrderData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!orderCode.trim()) {
      setError('Vui lòng nhập mã đơn hàng');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock: Accept any code starting with VNG
    if (orderCode.toUpperCase().startsWith('VNG')) {
      setOrderData({ ...mockOrderData, id: orderCode.toUpperCase() });
    } else {
      setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn.');
      setOrderData(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tra Cứu <span className="text-primary-500">Đơn Hàng</span>
          </h1>
          <p className="text-gray-600">Nhập mã đơn hàng để theo dõi trạng thái vận chuyển</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card padding="lg" className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Nhập mã đơn hàng (VD: VNG123456789)"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  leftIcon={<Package className="w-5 h-5" />}
                  error={error}
                />
              </div>
              <Button onClick={handleSearch} isLoading={isLoading} size="lg">
                <Search className="w-5 h-5" />
                Tra cứu
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Order Result */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Order Header */}
            <Card padding="lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                  <p className="text-2xl font-bold text-primary-600">{orderData.id}</p>
                </div>
                <div className="flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
                  <Truck className="w-5 h-5" />
                  <span className="font-semibold">Đang vận chuyển</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {orderData.timeline.map((step, index) => {
                    const Icon = statusIcons[step.status];
                    return (
                      <div key={index} className="relative flex items-start gap-4">
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? step.current
                                ? 'bg-primary-500 text-white'
                                : 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pt-2">
                          <p
                            className={`font-semibold ${
                              step.completed ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.time && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-4 h-4" />
                              {step.time}
                            </p>
                          )}
                          {step.current && (
                            <p className="text-sm text-primary-600 font-medium mt-1">
                              Dự kiến giao: 12/12/2025
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sender Info */}
              <Card padding="lg">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-primary-500" />
                  Người gửi
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{orderData.sender.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{orderData.sender.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span>{orderData.sender.address}</span>
                  </div>
                </div>
              </Card>

              {/* Receiver Info */}
              <Card padding="lg">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  Người nhận
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{orderData.receiver.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{orderData.receiver.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span>{orderData.receiver.address}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Cargo Info */}
            <Card padding="lg">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary-500" />
                Thông tin hàng hóa
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Loại hàng</p>
                  <p className="font-semibold text-gray-900">{orderData.cargo.type}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Trọng lượng</p>
                  <p className="font-semibold text-gray-900">{orderData.cargo.weight} kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Số khối</p>
                  <p className="font-semibold text-gray-900">{orderData.cargo.volume} m³</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Số kiện</p>
                  <p className="font-semibold text-gray-900">{orderData.cargo.packages}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-600">Cước vận chuyển:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatNumber(orderData.price)}đ
                </span>
              </div>
            </Card>

            {/* Actions */}
            <Card padding="lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  <FileText className="w-5 h-5" />
                  In phiếu giao hàng
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-5 h-5" />
                  Liên hệ hỗ trợ
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!orderData && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500">Nhập mã đơn hàng để tra cứu trạng thái</p>
            <p className="text-sm text-gray-400 mt-2">VD: VNG123456789</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
