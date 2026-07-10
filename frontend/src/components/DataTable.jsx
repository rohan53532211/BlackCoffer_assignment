import React from 'react';

function DataTable({ data, pagination, page, setPage, limit, setLimit, sort, setSort, loading }) {
  const columns = [
    { key: 'title', label: 'Insight Title', sortable: true },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'topic', label: 'Topic', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'intensity', label: 'Intensity', sortable: true },
    { key: 'likelihood', label: 'Likelihood', sortable: true },
    { key: 'relevance', label: 'Relevance', sortable: true },
  ];

  const handleSortClick = (key) => {
    if (sort === key) {
      setSort(`-${key}`);
    } else {
      setSort(key);
    }
    setPage(1);
  };

  const getSortIcon = (key) => {
    if (sort === key) {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      );
    }
    if (sort === `-${key}`) {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      );
    }
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginLeft: 4, opacity: 0.4 }}>
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    );
  };

  return (
    <div className="card table-card">
      <div className="table-card-header">
        <div className="table-limit-selector">
          <span>Show</span>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={col.sortable ? 'sortable' : ''}
                  onClick={() => col.sortable && handleSortClick(col.key)}
                >
                  <div className="th-content">
                    {col.label}
                    {col.sortable && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(limit).fill(0).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex}><div className="skeleton-line" /></td>
                  ))}
                  <td><div className="skeleton-line short" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '30px' }}>
                  No matching records found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <span className="insight-title" title={item.title}>
                      {item.insight || item.title || 'N/A'}
                    </span>
                  </td>
                  <td>{item.sector || 'N/A'}</td>
                  <td>{item.topic || 'N/A'}</td>
                  <td>{item.country || 'N/A'}</td>
                  <td>{item.source || 'N/A'}</td>
                  <td><span className="badge badge-intensity">{item.intensity ?? 0}</span></td>
                  <td><span className="badge badge-likelihood">{item.likelihood ?? 0}</span></td>
                  <td><span className="badge badge-relevance">{item.relevance ?? 0}</span></td>
                  <td>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="external-link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && data.length > 0 && (
        <div className="table-card-footer">
          <div className="table-info">
            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination?.totalRecords || 0)} of {pagination?.totalRecords || 0} entries
          </div>
          <div className="table-pagination">
            <button 
              className="pagination-btn" 
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span className="pagination-current-page">
              Page {page} of {pagination?.totalPages || 1}
            </span>
            <button 
              className="pagination-btn" 
              disabled={page === pagination?.totalPages}
              onClick={() => setPage(prev => Math.min(prev + 1, pagination?.totalPages || 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
