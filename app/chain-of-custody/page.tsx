import { custodyEvents } from '@/lib/mockData';

export default function ChainOfCustodyPage() {
  const grouped = custodyEvents.reduce<Record<string, typeof custodyEvents>>( (acc, ev) => {
    (acc[ev.sampleId] ||= []).push(ev);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([sampleId, events]) => (
        <div key={sampleId} className="card">
          <div className="card-header">
            <div className="font-semibold">Sample {sampleId}</div>
            <div className="text-xs text-gray-500">{events.length} events</div>
          </div>
          <div className="card-body">
            <ol className="relative border-l border-gray-200 pl-6">
              {events.sort((a,b)=>a.timestamp.localeCompare(b.timestamp)).map(e => (
                <li key={e.id} className="mb-6">
                  <span className="absolute -left-[5px] mt-1 h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div className="text-sm text-gray-800">
                    <span className="uppercase text-xs tracking-wide text-gray-500 mr-2">{e.type}</span>
                    by <span className="font-medium">{e.actor}</span>
                    {e.lockboxId && (
                      <span className="ml-2 text-gray-600">? {e.lockboxId} {e.lockboxSlot ? `(${e.lockboxSlot})` : ''}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</div>
                  {e.details && <div className="text-xs text-gray-600 mt-1">{e.details}</div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  )
}
