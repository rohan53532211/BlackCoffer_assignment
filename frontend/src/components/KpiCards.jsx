import React from 'react';

function KpiCards({ stats, loading }) {
  const cards = [
    {
      title: 'Total Insights',
      value: stats?.totalRecords || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      colorClass: 'primary'
    },
    {
      title: 'Sectors',
      value: stats?.sectors || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      colorClass: 'success'
    },
    {
      title: 'Topics',
      value: stats?.topics || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      colorClass: 'warning'
    },
    {
      title: 'Countries',
      value: stats?.countries || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-7.3 16.8L12 22l7.3-3.2A10 10 0 0 0 12 2z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      colorClass: 'danger'
    },
    {
      title: 'Regions',
      value: stats?.regions || 0,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      ),
      colorClass: 'info'
    }
  ];

  if (loading) {
    return (
      <div className="kpi-grid">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="kpi-card skeleton">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="kpi-grid">
      {cards.map((card, i) => (
        <div key={i} className="kpi-card">
          <div className="kpi-card-content">
            <span className="kpi-card-title">{card.title}</span>
            <h3 className="kpi-card-value">{card.value}</h3>
          </div>
          <div className={`kpi-card-icon ${card.colorClass}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
