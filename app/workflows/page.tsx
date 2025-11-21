import { workflows } from '@/lib/mockData';

function StatusBadge({ status }: { status: 'pending' | 'in_progress' | 'done' | 'blocked' }) {
  const color = {
    pending: 'bg-gray-100 text-gray-700 border-gray-200',
    in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blocked: 'bg-rose-50 text-rose-700 border-rose-200',
  }[status];
  return <span className={`text-xs px-2 py-1 rounded-full border ${color}`}>{status}</span>
}

export default function WorkflowsPage() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map(w => (
        <div key={w.id} className="card">
          <div className="card-header">
            <div>
              <div className="font-semibold">{w.name}</div>
              <div className="text-xs text-gray-500">{w.id}</div>
            </div>
          </div>
          <div className="card-body space-y-3">
            {w.steps.map(st => (
              <div key={st.id} className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-gray-800">{st.name}</div>
                  <div className="text-xs text-gray-500">
                    {st.startedAt && `Started ${new Date(st.startedAt).toLocaleDateString()}`}
                    {st.completedAt && ` ? Done ${new Date(st.completedAt).toLocaleDateString()}`}
                  </div>
                </div>
                <StatusBadge status={st.status} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
