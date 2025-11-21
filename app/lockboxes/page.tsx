"use client";
import { lockboxes, samplesInLockbox } from '@/lib/mockData';

function Slot({ label, occupied }: { label: string; occupied?: { id: string } }) {
  return (
    <div className={`h-8 w-8 text-[10px] grid place-items-center rounded border ${occupied ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200 text-gray-400'}`}
         title={occupied ? occupied.id : label}>
      {occupied ? '?' : label}
    </div>
  );
}

function BoxGrid({ boxId, rows, cols }: { boxId: string; rows: number; cols: number }) {
  const samples = samplesInLockbox(boxId);
  const bySlot = new Map(samples.map(s => [s.lockboxSlot!, s]));
  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));
  const colLabels = Array.from({ length: cols }, (_, i) => (i + 1).toString());
  return (
    <div className="space-y-2">
      {rowLabels.map(r => (
        <div key={r} className="flex gap-1">
          {colLabels.map(c => {
            const label = `${r}${c}`;
            const occ = bySlot.get(label);
            return <Slot key={label} label={label} occupied={occ} />
          })}
        </div>
      ))}
    </div>
  );
}

export default function LockboxesPage() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {lockboxes.map(lb => (
        <div key={lb.id} id={lb.id} className="card">
          <div className="card-header">
            <div>
              <div className="font-semibold">{lb.name}</div>
              <div className="text-xs text-gray-500">{lb.id} ? {lb.location} ? {lb.temperatureC ?? 'N/A'}?C</div>
            </div>
            <div className="text-sm text-gray-500">{lb.rows} x {lb.cols}</div>
          </div>
          <div className="card-body">
            <BoxGrid boxId={lb.id} rows={lb.rows} cols={lb.cols} />
            <div className="mt-4 text-xs text-gray-600">
              Occupied: {samplesInLockbox(lb.id).length} / {lb.rows * lb.cols}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
