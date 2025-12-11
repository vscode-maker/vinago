'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  MapPin,
  Package,
  Weight,
  Ruler,
  Truck,
  DollarSign,
  ArrowRight,
  Check,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PRICING_CONFIG, ROUTES, CARGO_TYPES, VEHICLE_TYPES } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

export default function PriceCalculator() {
  const [transportType, setTransportType] = useState<'ghep' | 'nguyen-chuyen'>('ghep');
  const [selectedRoute, setSelectedRoute] = useState(ROUTES[0]);
  const [cargoType, setCargoType] = useState(CARGO_TYPES[0]);
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[2]);

  // Form data
  const [weight, setWeight] = useState<number>(100);
  const [length, setLength] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);
  const [packages, setPackages] = useState<number>(1);
  const [distance, setDistance] = useState<number>(selectedRoute.distance);

  // Extra services
  const [bocXep, setBocXep] = useState(false);
  const [giaoTanNoi, setGiaoTanNoi] = useState(true);
  const [baoGoi, setBaoGoi] = useState(false);
  const [hoaToc, setHoaToc] = useState(false);

  // Calculated values
  const [volume, setVolume] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [priceBreakdown, setPriceBreakdown] = useState<{
    cuocChinh?: { label: string; value: number };
    phuPhi: { label: string; value: number }[];
    tongPhuPhi: number;
    tongCong: number;
  }>({ phuPhi: [], tongPhuPhi: 0, tongCong: 0 });

  // Tự động tính khối
  useEffect(() => {
    const calculatedVolume = parseFloat((length * width * height * packages).toFixed(2));
    setVolume(calculatedVolume);
  }, [length, width, height, packages]);

  // Update distance khi đổi tuyến
  useEffect(() => {
    setDistance(selectedRoute.distance);
  }, [selectedRoute]);

  // Tính giá
  useEffect(() => {
    let basePrice = 0;
    const breakdown: typeof priceBreakdown = { phuPhi: [], tongPhuPhi: 0, tongCong: 0 };

    if (transportType === 'ghep') {
      const isHanoiToHCM = selectedRoute.from === 'Hà Nội' && selectedRoute.to === 'TP.HCM';
      const chargeBy = cargoType.chargeBy;

      if (chargeBy === 'weight') {
        const priceConfig = isHanoiToHCM
          ? PRICING_CONFIG.weight.hanoiToHCM
          : PRICING_CONFIG.weight.hcmToHanoi;

        const pricePerKg = weight >= 3000 ? priceConfig.over3T : priceConfig.under3T;
        basePrice = weight * pricePerKg;
        breakdown.cuocChinh = {
          label: `${formatNumber(weight)} kg × ${formatNumber(pricePerKg)}đ/kg`,
          value: basePrice,
        };
      } else {
        const priceConfig = isHanoiToHCM
          ? PRICING_CONFIG.volume.hanoiToHCM
          : PRICING_CONFIG.volume.hcmToHanoi;

        const pricePerVolume = volume >= 20 ? priceConfig.over20 : priceConfig.under15;
        basePrice = volume * pricePerVolume;
        breakdown.cuocChinh = {
          label: `${volume} m³ × ${formatNumber(pricePerVolume)}đ/m³`,
          value: basePrice,
        };
      }
    } else {
      const vehicleConfig = PRICING_CONFIG.wholeVehicle[vehicleType.id as keyof typeof PRICING_CONFIG.wholeVehicle];
      basePrice = vehicleConfig.basePrice + distance * vehicleConfig.perKm;
      breakdown.cuocChinh = {
        label: `Cơ bản ${formatNumber(vehicleConfig.basePrice)}đ + ${formatNumber(distance)}km × ${formatNumber(vehicleConfig.perKm)}đ/km`,
        value: basePrice,
      };
    }

    // Phụ phí
    let extraTotal = 0;

    if (bocXep) {
      extraTotal += PRICING_CONFIG.extraFees.bocXep;
      breakdown.phuPhi.push({ label: 'Bốc xếp', value: PRICING_CONFIG.extraFees.bocXep });
    }
    if (giaoTanNoi) {
      extraTotal += PRICING_CONFIG.extraFees.giaoTanNoi;
      breakdown.phuPhi.push({ label: 'Giao tận nơi', value: PRICING_CONFIG.extraFees.giaoTanNoi });
    }
    if (baoGoi) {
      extraTotal += PRICING_CONFIG.extraFees.baoGoi;
      breakdown.phuPhi.push({ label: 'Đóng gói', value: PRICING_CONFIG.extraFees.baoGoi });
    }
    if (hoaToc) {
      extraTotal += PRICING_CONFIG.extraFees.hoaToc;
      breakdown.phuPhi.push({ label: 'Hỏa tốc', value: PRICING_CONFIG.extraFees.hoaToc });
    }

    breakdown.tongPhuPhi = extraTotal;
    breakdown.tongCong = basePrice + extraTotal;

    setTotalPrice(breakdown.tongCong);
    setPriceBreakdown(breakdown);
  }, [
    transportType,
    selectedRoute,
    cargoType,
    vehicleType,
    weight,
    volume,
    distance,
    bocXep,
    giaoTanNoi,
    baoGoi,
    hoaToc,
  ]);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Calculator className="w-5 h-5" />
            <span className="font-semibold text-sm">Tính giá ngay</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bảng Tính Giá Cước
            <span className="text-primary-500"> Tự Động</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nhập thông tin hàng hóa và nhận báo giá chính xác ngay lập tức
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Loại vận chuyển */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary-500" />
                Hình thức vận chuyển
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTransportType('ghep')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    transportType === 'ghep'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <Package className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Ghép hàng</div>
                  <div className="text-xs text-gray-500">Tiết kiệm chi phí</div>
                </button>
                <button
                  onClick={() => setTransportType('nguyen-chuyen')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    transportType === 'nguyen-chuyen'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <Truck className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Nguyên chuyến</div>
                  <div className="text-xs text-gray-500">Nhanh chóng</div>
                </button>
              </div>
            </Card>

            {/* Tuyến đường */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                Tuyến đường
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm đi → Điểm đến
                  </label>
                  <select
                    value={`${selectedRoute.from}-${selectedRoute.to}`}
                    onChange={(e) => {
                      const [from, to] = e.target.value.split('-');
                      const route = ROUTES.find((r) => r.from === from && r.to === to);
                      if (route) setSelectedRoute(route);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {ROUTES.map((route, idx) => (
                      <option key={idx} value={`${route.from}-${route.to}`}>
                        {route.from} → {route.to} ({route.distance}km)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khoảng cách (km)
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>

            {/* Thông tin hàng hóa */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-500" />
                Thông tin hàng hóa
              </h3>

              {transportType === 'ghep' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại hàng
                  </label>
                  <select
                    value={cargoType.id}
                    onChange={(e) => {
                      const type = CARGO_TYPES.find((t) => t.id === e.target.value);
                      if (type) setCargoType(type);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {CARGO_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {transportType === 'nguyen-chuyen' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại xe
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {VEHICLE_TYPES.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVehicleType(v)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          vehicleType.id === v.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <Truck className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs font-semibold">{v.capacity}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-primary-500" />
                    Trọng lượng (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số kiện
                  </label>
                  <input
                    type="number"
                    value={packages}
                    onChange={(e) => setPackages(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary-500" />
                    Dài (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rộng (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cao (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Số khối tự động:</span>
                  <span className="text-lg font-bold text-primary-600">{volume} m³</span>
                </div>
              </div>
            </Card>

            {/* Dịch vụ bổ sung */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Dịch vụ bổ sung</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={bocXep}
                    onChange={(e) => setBocXep(e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="flex-1 group-hover:text-primary-600 transition-colors">
                    Bốc xếp hàng hóa
                  </span>
                  <span className="font-semibold text-primary-600">
                    +{formatNumber(PRICING_CONFIG.extraFees.bocXep)}đ
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={giaoTanNoi}
                    onChange={(e) => setGiaoTanNoi(e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="flex-1 group-hover:text-primary-600 transition-colors">
                    Giao hàng tận nơi
                  </span>
                  <span className="font-semibold text-primary-600">
                    +{formatNumber(PRICING_CONFIG.extraFees.giaoTanNoi)}đ
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={baoGoi}
                    onChange={(e) => setBaoGoi(e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="flex-1 group-hover:text-primary-600 transition-colors">
                    Đóng gói hàng hóa
                  </span>
                  <span className="font-semibold text-primary-600">
                    +{formatNumber(PRICING_CONFIG.extraFees.baoGoi)}đ
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hoaToc}
                    onChange={(e) => setHoaToc(e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                  />
                  <span className="flex-1 group-hover:text-primary-600 transition-colors">
                    Vận chuyển hỏa tốc
                  </span>
                  <span className="font-semibold text-primary-600">
                    +{formatNumber(PRICING_CONFIG.extraFees.hoaToc)}đ
                  </span>
                </label>
              </div>
            </Card>
          </motion.div>

          {/* Price Summary - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-2xl text-white">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-6 h-6" />
                <h3 className="text-xl font-bold">Chi tiết giá cước</h3>
              </div>

              <div className="space-y-4 mb-6">
                {/* Cước chính */}
                <div className="pb-4 border-b border-primary-400/30">
                  <div className="text-sm text-primary-100 mb-1">Cước vận chuyển</div>
                  <div className="text-xs text-primary-200 mb-2">
                    {priceBreakdown.cuocChinh?.label}
                  </div>
                  <div className="text-2xl font-bold">
                    {formatNumber(priceBreakdown.cuocChinh?.value || 0)}đ
                  </div>
                </div>

                {/* Phụ phí */}
                {priceBreakdown.phuPhi.length > 0 && (
                  <div className="pb-4 border-b border-primary-400/30">
                    <div className="text-sm text-primary-100 mb-2">Phụ phí</div>
                    <div className="space-y-2">
                      {priceBreakdown.phuPhi.map((fee, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            {fee.label}
                          </span>
                          <span className="font-semibold">+{formatNumber(fee.value)}đ</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tổng cộng */}
                <div className="pt-2">
                  <div className="text-sm text-primary-100 mb-2">Tổng cộng</div>
                  <div className="text-4xl font-bold mb-1">{formatNumber(totalPrice)}đ</div>
                  <div className="text-xs text-primary-200">(Đã bao gồm VAT)</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-primary-600 hover:bg-primary-50 group"
                >
                  Tạo đơn ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button className="w-full bg-primary-700/50 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all">
                  Lưu báo giá
                </button>
              </div>

              <div className="mt-6 p-4 bg-primary-700/30 rounded-xl text-xs text-primary-100">
                💡 Giá trên là giá tham khảo. Liên hệ hotline để được tư vấn chi tiết và nhận ưu đãi
                tốt nhất!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
