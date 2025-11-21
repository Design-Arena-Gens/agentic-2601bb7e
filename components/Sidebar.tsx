"use client";
import Link from 'next/link';
import { Boxes, FlaskConical, ListChecks, Workflow, PackageSearch } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'classnames';

const nav = [
  { href: '/', label: 'Overview', icon: Boxes },
  { href: '/samples', label: 'Samples', icon: FlaskConical },
  { href: '/lockboxes', label: 'Lockboxes', icon: PackageSearch },
  { href: '/chain-of-custody', label: 'Chain of Custody', icon: ListChecks },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-gray-200 bg-white hidden md:block">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="font-semibold text-lg">LIMS Lockbox</div>
        <div className="text-xs text-gray-500">Lab Tracking System</div>
      </div>
      <nav className="p-2 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={clsx(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm',
            pathname === href ? 'bg-brand/10 text-brand-dark' : 'hover:bg-gray-100 text-gray-700'
          )}>
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
