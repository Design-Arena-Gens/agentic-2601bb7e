import Link from 'next/link'
import { custodyEvents, lockboxes, samples, workflows } from '@/lib/mockData'
import { StatusPill } from '@/components/StatusPill'

export default function Page() {
  const newestEvents = custodyEvents.slice(-5).reverse();
  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
      <div className="card xl:col-span-2">
        <div className="card-header">
          <div className="font-semibold">Recent Samples</div>
          <Link href="/samples" className="text-sm text-brand-dark">View all</Link>
        </div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Lockbox</th>
              </tr>
            </thead>
            <tbody>
              {samples.slice(0, 6).map(s => (
                <tr key={s.id} className="border-t border-gray-100">
                  <td className="py-2 pr-4 font-mono"><Link className="text-brand-dark" href={`/samples?id=${s.id}`}>{s.id}</Link></td>
                  <td className="py-2 pr-4">{s.name}</td>
                  <td className="py-2 pr-4"><StatusPill status={s.status} /></td>
                  <td className="py-2 pr-4">{s.lockboxId ? `${s.lockboxId} ? ${s.lockboxSlot}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="font-semibold">Events</div>
          <Link href="/chain-of-custody" className="text-sm text-brand-dark">Timeline</Link>
        </div>
        <div className="card-body">
          <ol className="space-y-3 text-sm">
            {newestEvents.map(e => (
              <li key={e.id} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                <div>
                  <div className="text-gray-700"><span className="font-mono">{e.sampleId}</span> {e.type} by {e.actor}</div>
                  <div className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card xl:col-span-3">
        <div className="card-header">
          <div className="font-semibold">Lockboxes</div>
          <Link href="/lockboxes" className="text-sm text-brand-dark">Manage</Link>
        </div>
        <div className="card-body grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockboxes.map(lb => (
            <div key={lb.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{lb.name}</div>
                <div className="text-xs text-gray-500">{lb.location}</div>
              </div>
              <div className="mt-2 text-xs text-gray-600">{lb.rows}x{lb.cols} ? {lb.temperatureC ?? 'N/A'}?C</div>
              <Link className="text-sm text-brand-dark mt-2 inline-block" href={`/lockboxes#${lb.id}`}>{lb.id}</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card xl:col-span-3">
        <div className="card-header">
          <div className="font-semibold">Workflows</div>
          <Link href="/workflows" className="text-sm text-brand-dark">View workflows</Link>
        </div>
        <div className="card-body grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map(w => (
            <div key={w.id} className="border rounded-lg p-4">
              <div className="font-medium">{w.name}</div>
              <div className="text-xs text-gray-500">{w.id}</div>
              <div className="mt-3 space-y-2">
                {w.steps.map(st => (
                  <div key={st.id} className="flex items-center justify-between text-sm">
                    <span>{st.name}</span>
                    <span className="text-xs uppercase tracking-wide text-gray-500">{st.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
