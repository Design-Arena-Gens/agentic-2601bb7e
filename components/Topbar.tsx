"use client";
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Topbar() {
  const router = useRouter();
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center px-4 gap-3">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
        <input
          placeholder="Search samples, lockboxes, IDs..."
          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = (e.target as HTMLInputElement).value;
              router.push(`/samples?q=${encodeURIComponent(q)}`)
            }
          }}
        />
      </div>
      <div className="text-sm text-gray-500 hidden sm:block">v1.0</div>
    </header>
  );
}
