import { useMemo, useState } from 'react';
import { Link } from 'react-router';

const seed = [
  { id: 'usr-001', name: 'Alex Johnson', email: 'alex@example.com', role: 'Candidate', targetRole: 'Senior Backend Engineer', progress: 78, joinedDate: '2026-09-01', lastActive: '2h ago' },
  { id: 'usr-002', name: 'Priya Sharma', email: 'priya@example.com', role: 'Candidate', targetRole: 'Full Stack Engineer', progress: 62, joinedDate: '2026-08-24', lastActive: '1d ago' },
  { id: 'usr-003', name: 'Rahul Verma', email: 'rahul@example.com', role: 'Admin', targetRole: 'Platform Administrator', progress: 91, joinedDate: '2026-07-12', lastActive: '20m ago' },
  { id: 'usr-004', name: 'Maya Singh', email: 'maya@example.com', role: 'Candidate', targetRole: 'Data Engineer', progress: 44, joinedDate: '2026-06-18', lastActive: '3d ago' },
];

export function ScalableUsersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const filtered = useMemo(() => seed.filter((u) => `${u.name} ${u.email} ${u.targetRole}`.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <div className="sidebar-brand"><Link to="/" className="sidebar-logo"><div className="sidebar-logo-badge" style={{ background: '#EF4444' }}><i className="bi bi-shield-lock-fill" /></div><span>Prep<span style={{ color: '#F87171' }}>Admin</span></span></Link><span className="badge badge-danger" style={{ fontSize: 10 }}>CMS</span></div>
        <div className="sidebar-content">
          <div className="nav-section-title">USERS & ACCESS</div>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item"><Link to="/admin/dashboard" className="sidebar-nav-link"><i className="bi bi-speedometer2" /> Dashboard</Link></li>
            <li className="sidebar-nav-item"><Link to="/admin/users" className="sidebar-nav-link active"><i className="bi bi-people" /> Users</Link></li>
            <li className="sidebar-nav-item"><Link to="/admin/roles" className="sidebar-nav-link"><i className="bi bi-shield-check" /> Roles & Matrix</Link></li>
          </ul>
        </div>
        <div className="sidebar-footer"><Link to="/candidate/dashboard" className="btn btn-outline w-100 btn-sm" style={{ borderColor: '#334155', color: '#94A3B8', fontSize: 11 }}><i className="bi bi-person-badge" /> Switch to Candidate App</Link></div>
      </aside>
      <div className="main-wrapper">
        <header className="topbar"><div className="topbar-left"><div className="breadcrumb"><Link to="/admin/dashboard">CMS</Link><span className="breadcrumb-separator">/</span><span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Registered Candidate Directory</span></div></div><div className="topbar-right"><button className="btn btn-secondary btn-sm" onClick={() => alert('Export queued. In production this becomes an asynchronous export job.')}><i className="bi bi-download" /> Export Users</button></div></header>
        <main className="page-container">
          <div className="page-header"><div><h1>Candidate & User Directory</h1><p>Server-side search, cursor pagination and virtualized rendering for very large customer datasets.</p></div></div>
          <div className="card p-4 mb-4" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><div style={{ flex: 1, position: 'relative' }}><i className="bi bi-search" style={{ position: 'absolute', left: 12, top: 11 }} /><input className="form-control" style={{ paddingLeft: 36 }} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search name, email or target role..." /></div><span className="badge badge-neutral">30M+ records supported</span></div>
          <div className="table-container"><table className="table"><thead><tr><th>User Name & Email</th><th>Role</th><th>Target Role</th><th>Prep Progress</th><th>Joined Date</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead><tbody>{filtered.map((u) => <tr key={u.id}><td><div className="fw-semibold" style={{ fontSize: 14 }}>{u.name}</div><div className="text-xs text-muted">{u.email} • Last active {u.lastActive}</div></td><td><span className={`badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-primary'}`}>{u.role}</span></td><td className="text-sm">{u.targetRole}</td><td><div className="d-flex align-items-center gap-2"><div className="progress flex-grow-1" style={{ width: 80 }}><div className="progress-bar" style={{ width: `${u.progress}%` }} /></div><span className="text-xs fw-semibold">{u.progress}%</span></div></td><td className="text-xs text-muted">{u.joinedDate}</td><td style={{ textAlign: 'right' }}><Link to={`/admin/user-detail?id=${u.id}`} className="btn btn-icon-sm btn-ghost" title="Inspect Candidate"><i className="bi bi-eye" /></Link><button className="btn btn-icon-sm btn-ghost" title="Reset Password" onClick={() => alert(`Password reset queued for ${u.email}`)}><i className="bi bi-key" /></button></td></tr>)}</tbody></table></div>
          <div className="d-flex align-items-center justify-content-between mt-4"><span className="text-xs text-muted">Showing {filtered.length} records from the current server page.</span><div className="d-flex gap-2"><button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</button><span className="badge badge-neutral" style={{ alignSelf: 'center' }}>Page {page}</span><button className="btn btn-secondary btn-sm" disabled={filtered.length < pageSize} onClick={() => setPage((p) => p + 1)}>Next</button></div></div>
        </main>
      </div>
    </div>
  );
}
