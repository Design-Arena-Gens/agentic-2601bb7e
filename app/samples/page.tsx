"use client";
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { samples, workflows } from '@/lib/mockData';
import { StatusPill } from '@/components/StatusPill';
import { QRCodeCanvas } from 'qrcode.react';

export default function SamplesPage() {
  const params = useSearchParams();
  const q = params.get('q')?.toLowerCase() ?? '';
  const idFilter = params.get('id') ?? '';

  const filtered = useMemo(() => {
    return samples.filter(s => {
      if (idFilter && s.id !== idFilter) return false;
      if (!q) return true;
      const hay = [s.id, s.name, s.externalId, s.lockboxId, s.lockboxSlot].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [q, idFilter]);

  const selected = idFilter ? samples.find(s => s.id === idFilter) : undefined;

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
      <div className="card xl:col-span-2">
        <div className="card-header">
          <div className="font-semibold">Samples</div>
          <div className="text-sm text-gray-500">{filtered.length} shown</div>
        </div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Lockbox</th>
                <th className="py-2 pr-4">Workflow</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t border-gray-100">
                  <td className="py-2 pr-4 font-mono"><a className="text-brand-dark" href={`/samples?id=${s.id}`}>{s.id}</a></td>
                  <td className="py-2 pr-4">{s.name}</td>
                  <td className="py-2 pr-4"><StatusPill status={s.status} /></td>
                  <td className="py-2 pr-4">{s.lockboxId ? `${s.lockboxId} ? ${s.lockboxSlot}` : '-'}</td>
                  <td className="py-2 pr-4">{s.workflowId ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="font-semibold">Details</div>
          <div className="text-xs text-gray-500">QR & metadata</div>
        </div>
        <div className="card-body">
          {!selected ? (
            <div className="text-sm text-gray-500">Select a sample to view details.</div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="font-mono text-gray-700">{selected.id}</div>
              <div className="text-gray-800">{selected.name}</div>
              <div className="text-gray-600">Status: <StatusPill status={selected.status} /></div>
              <div className="text-gray-600">Lockbox: {selected.lockboxId ? `${selected.lockboxId} ? ${selected.lockboxSlot}` : '-'}</div>
              <div className="text-gray-600">Workflow: {selected.workflowId ?? '-'}</div>
              <div className="pt-2">
                <QRCodeCanvas value={selected.id} size={140} includeMargin />
              </div>
              <div className="text-xs text-gray-500">
                Collected: {new Date(selected.collectedAt).toLocaleString()}<br/>
                Received: {new Date(selected.receivedAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
