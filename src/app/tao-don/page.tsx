'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  User,
  MapPin,
  Phone,
  FileText,
  Truck,
  Weight,
  Ruler,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { CARGO_TYPES, VEHICLE_TYPES, ROUTES, PRICING_CONFIG } from '@/lib/constants';
import { formatNumber, generateOrderId } from '@/lib/utils';

const steps = [
  { id: 1, title: 'Người gửi', icon: User },
  { id: 2, title: 'Người nhận', icon: MapPin },
  { id: 3, title: 'Hàng hóa', icon: Package },
  { id: 4, title: 'Thanh toán', icon: CreditCard },
];

export default function CreateOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    // Sender
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderNote: '',
    // Receiver
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverNote: '',
    // Cargo
    cargoType: CARGO_TYPES[0].id,
    packages: 1,
    weight: 10,
    length: 1,
    width: 1,
    height: 1,
    // Transport
    transportType: 'ghep',
    vehicleType: VEHICLE_TYPES[0].id,
    route: ROUTES[0].id,
    // Services
    bocXep: false,
    giaoTanNoi: true,
    baoGoi: false,
    hoaToc: false,
  });

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const volume = formData.length * formData.width * formData.height * formData.packages;

  // Calculate price
  const calculateTotal = () => {
    let basePrice = 0;
    const selectedCargo = CARGO_TYPES.find((c) => c.id === formData.cargoType);
    const selectedRoute = ROUTES.find((r) => r.id === formData.route);

    if (formData.transportType === 'ghep') {
      if (selectedCargo?.chargeBy === 'weight') {
        const pricePerKg = formData.weight >= 3000 ? 1600 : 1800;
        basePrice = formData.weight * pricePerKg;
      } else {
        const pricePerVolume = volume >= 20 ? 450000 : 500000;
        basePrice = volume * pricePerVolume;
      }
    } else {
      const vehicleConfig =
        PRICING_CONFIG.wholeVehicle[formData.vehicleType as keyof typeof PRICING_CONFIG.wholeVehicle];
      if (vehicleConfig && selectedRoute) {
        basePrice = vehicleConfig.basePrice + selectedRoute.distance * vehicleConfig.perKm;
      }
    }

    let extraFees = 0;
    if (formData.bocXep) extraFees += PRICING_CONFIG.extraFees.bocXep;
    if (formData.giaoTanNoi) extraFees += PRICING_CONFIG.extraFees.giaoTanNoi;
    if (formData.baoGoi) extraFees += PRICING_CONFIG.extraFees.baoGoi;
    if (formData.hoaToc) extraFees += PRICING_CONFIG.extraFees.hoaToc;

    return basePrice + extraFees;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderId(generateOrderId());
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card padding="lg" className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Tạo đơn thành công!</h1>
              <p className="text-gray-600 mb-6">Mã đơn hàng của bạn là:</p>
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-3xl font-bold text-primary-600">{orderId}</p>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = `/tra-cuu?code=${orderId}`}>
                  Tra cứu đơn hàng
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Tạo đơn mới
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
            Tạo Đơn <span className="text-primary-500">Vận Chuyển</span>
          </h1>
          <p className="text-gray-600">Điền thông tin để tạo đơn hàng mới</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-primary-500 text-white'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-primary-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ minWidth: '50px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card padding="lg">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Sender Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-500" />
                  Thông tin người gửi
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Họ và tên"
                    placeholder="Nhập họ tên người gửi"
                    value={formData.senderName}
                    onChange={(e) => updateFormData('senderName', e.target.value)}
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={formData.senderPhone}
                    onChange={(e) => updateFormData('senderPhone', e.target.value)}
                    leftIcon={<Phone className="w-5 h-5" />}
                  />
                </div>
                <Input
                  label="Địa chỉ lấy hàng"
                  placeholder="Nhập địa chỉ chi tiết"
                  value={formData.senderAddress}
                  onChange={(e) => updateFormData('senderAddress', e.target.value)}
                  leftIcon={<MapPin className="w-5 h-5" />}
                />
                <Input
                  label="Ghi chú"
                  placeholder="Ghi chú thêm (không bắt buộc)"
                  value={formData.senderNote}
                  onChange={(e) => updateFormData('senderNote', e.target.value)}
                  leftIcon={<FileText className="w-5 h-5" />}
                />
              </div>
            )}

            {/* Step 2: Receiver Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  Thông tin người nhận
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Họ và tên"
                    placeholder="Nhập họ tên người nhận"
                    value={formData.receiverName}
                    onChange={(e) => updateFormData('receiverName', e.target.value)}
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={formData.receiverPhone}
                    onChange={(e) => updateFormData('receiverPhone', e.target.value)}
                    leftIcon={<Phone className="w-5 h-5" />}
                  />
                </div>
                <Input
                  label="Địa chỉ giao hàng"
                  placeholder="Nhập địa chỉ chi tiết"
                  value={formData.receiverAddress}
                  onChange={(e) => updateFormData('receiverAddress', e.target.value)}
                  leftIcon={<MapPin className="w-5 h-5" />}
                />
                <Input
                  label="Ghi chú"
                  placeholder="Ghi chú thêm (không bắt buộc)"
                  value={formData.receiverNote}
                  onChange={(e) => updateFormData('receiverNote', e.target.value)}
                  leftIcon={<FileText className="w-5 h-5" />}
                />
              </div>
            )}

            {/* Step 3: Cargo Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary-500" />
                  Thông tin hàng hóa
                </h2>

                {/* Transport Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình thức vận chuyển
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => updateFormData('transportType', 'ghep')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.transportType === 'ghep'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Package className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                      <div className="font-semibold">Ghép hàng</div>
                    </button>
                    <button
                      onClick={() => updateFormData('transportType', 'nguyen-chuyen')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.transportType === 'nguyen-chuyen'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Truck className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                      <div className="font-semibold">Nguyên chuyến</div>
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Tuyến đường"
                    value={formData.route}
                    onChange={(e) => updateFormData('route', e.target.value)}
                    options={ROUTES.map((r) => ({
                      value: r.id,
                      label: `${r.from} → ${r.to}`,
                    }))}
                  />
                  <Select
                    label="Loại hàng"
                    value={formData.cargoType}
                    onChange={(e) => updateFormData('cargoType', e.target.value)}
                    options={CARGO_TYPES.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                  />
                </div>

                {formData.transportType === 'nguyen-chuyen' && (
                  <Select
                    label="Loại xe"
                    value={formData.vehicleType}
                    onChange={(e) => updateFormData('vehicleType', e.target.value)}
                    options={VEHICLE_TYPES.map((v) => ({
                      value: v.id,
                      label: `${v.name} - ${v.dimensions}`,
                    }))}
                  />
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    label="Số kiện"
                    type="number"
                    value={formData.packages}
                    onChange={(e) => updateFormData('packages', Number(e.target.value))}
                    leftIcon={<Package className="w-5 h-5" />}
                  />
                  <Input
                    label="Trọng lượng (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateFormData('weight', Number(e.target.value))}
                    leftIcon={<Weight className="w-5 h-5" />}
                  />
                  <Input
                    label="Dài (m)"
                    type="number"
                    step="0.1"
                    value={formData.length}
                    onChange={(e) => updateFormData('length', Number(e.target.value))}
                    leftIcon={<Ruler className="w-5 h-5" />}
                  />
                  <Input
                    label="Rộng (m)"
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) => updateFormData('width', Number(e.target.value))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Cao (m)"
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) => updateFormData('height', Number(e.target.value))}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số khối (m³)
                    </label>
                    <div className="px-4 py-3 bg-primary-50 rounded-xl font-semibold text-primary-600">
                      {volume.toFixed(2)} m³
                    </div>
                  </div>
                </div>

                {/* Extra Services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Dịch vụ bổ sung
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Checkbox
                      label="Bốc xếp hàng hóa"
                      description={`+${formatNumber(PRICING_CONFIG.extraFees.bocXep)}đ`}
                      checked={formData.bocXep}
                      onChange={(e) => updateFormData('bocXep', e.target.checked)}
                    />
                    <Checkbox
                      label="Giao hàng tận nơi"
                      description={`+${formatNumber(PRICING_CONFIG.extraFees.giaoTanNoi)}đ`}
                      checked={formData.giaoTanNoi}
                      onChange={(e) => updateFormData('giaoTanNoi', e.target.checked)}
                    />
                    <Checkbox
                      label="Đóng gói hàng hóa"
                      description={`+${formatNumber(PRICING_CONFIG.extraFees.baoGoi)}đ`}
                      checked={formData.baoGoi}
                      onChange={(e) => updateFormData('baoGoi', e.target.checked)}
                    />
                    <Checkbox
                      label="Vận chuyển hỏa tốc"
                      description={`+${formatNumber(PRICING_CONFIG.extraFees.hoaToc)}đ`}
                      checked={formData.hoaToc}
                      onChange={(e) => updateFormData('hoaToc', e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary-500" />
                  Xác nhận đơn hàng
                </h2>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Người gửi:</span>
                    <span className="font-medium">{formData.senderName || 'Chưa nhập'}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Người nhận:</span>
                    <span className="font-medium">{formData.receiverName || 'Chưa nhập'}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Hình thức:</span>
                    <span className="font-medium">
                      {formData.transportType === 'ghep' ? 'Ghép hàng' : 'Nguyên chuyến'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Trọng lượng:</span>
                    <span className="font-medium">{formData.weight} kg</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Số khối:</span>
                    <span className="font-medium">{volume.toFixed(2)} m³</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatNumber(calculateTotal())}đ
                    </span>
                  </div>
                </div>

                <Checkbox
                  label="Tôi đồng ý với điều khoản dịch vụ và chính sách vận chuyển"
                />
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep}>
                Tiếp theo
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                <CheckCircle className="w-5 h-5" />
                Tạo đơn hàng
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
