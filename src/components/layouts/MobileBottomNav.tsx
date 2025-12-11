'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Search, DollarSign, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Trang chủ', icon: Home },
  { href: '/tao-don', label: 'Tạo đơn', icon: Package },
  { href: '/tra-cuu', label: 'Tra cứu', icon: Search },
  { href: '/bang-gia', label: 'Bảng giá', icon: DollarSign },
  { href: '/lien-he', label: 'Liên hệ', icon: Phone },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full px-1 py-2 transition-colors',
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-500 hover:text-primary-500'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-1', isActive && 'text-primary-500')} />
              <span className={cn(
                'text-[10px] font-medium leading-tight text-center',
                isActive && 'font-semibold'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
