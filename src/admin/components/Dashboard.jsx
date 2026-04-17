import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin-stats', { credentials: 'include' })
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;

  const isAdmin = stats?.currentAdmin?.role === 'admin';

  const card = (label, value, color) => (
    <div style={{ background: '#fff', border: `1px solid #eee`, borderTop: `4px solid ${color}`, borderRadius: 12, padding: 24, minWidth: 180, flex: 1 }}>
      <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 700, color, marginTop: 8 }}>{value}</div>
    </div>
  );

  return (
    <div style={{ padding: 32, background: '#f8f9fc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
        {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
      </h1>
      <p style={{ color: '#666', marginBottom: 28 }}>
        Welcome, {stats?.currentAdmin?.name}
      </p>

      {isAdmin && stats && (
        <>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
            {card('Total Users',    stats.totalUsers,    '#6C63FF')}
            {card('Total Orders',   stats.totalOrders,   '#FF6584')}
            {card('Revenue ($)',    parseFloat(stats.totalRevenue).toFixed(2), '#43B89C')}
            {card('Products',       stats.totalProducts, '#FFB547')}
          </div>

          {stats.recentOrders?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #eee' }}>
              <h3 style={{ marginBottom: 16, fontSize: 16 }}>Recent Orders</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    {['Order #','Customer','Status','Total','Date'].map(h =>
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#888', fontWeight: 500 }}>{h}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#6C63FF' }}>{o.orderNumber}</td>
                      <td style={{ padding: '10px 12px' }}>{o.user?.name || 'N/A'}</td>
                      <td style={{ padding: '10px 12px', textTransform: 'capitalize' }}>{o.status}</td>
                      <td style={{ padding: '10px 12px', color: '#43B89C', fontWeight: 600 }}>${parseFloat(o.total).toFixed(2)}</td>
                      <td style={{ padding: '10px 12px', color: '#888' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {!isAdmin && stats && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {card('My Orders',    stats.myOrders,                           '#6C63FF')}
          {card('Total Spent',  `$${parseFloat(stats.myTotalSpent).toFixed(2)}`, '#43B89C')}
        </div>
      )}
    </div>
  );
};

export default Dashboard;