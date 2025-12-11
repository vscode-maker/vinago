import {
  HeroSection,
  ServicesSection,
  PricingSection,
  PriceCalculator,
  VehicleTypesSection,
  DeliveryTimeSection,
  LocationsSection,
  TipsSection,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <PriceCalculator />
      <VehicleTypesSection />
      <DeliveryTimeSection />
      <LocationsSection />
      <TipsSection />
      <CTASection />
    </>
  );
}
