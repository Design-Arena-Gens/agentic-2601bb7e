import clsx from 'classnames';
import { SampleStatus } from '@/lib/types';

export function StatusPill({ status }: { status: SampleStatus }) {
  const color = {
    received: 'bg-blue-50 text-blue-700 border-blue-200',
    processing: 'bg-amber-50 text-amber-700 border-amber-200',
    stored: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    disposed: 'bg-rose-50 text-rose-700 border-rose-200',
  }[status];
  return (
    <span className={clsx('text-xs px-2 py-1 rounded-full border inline-flex items-center', color)}>
      {status}
    </span>
  );
}
