import React from 'react';

function FilterPanel({ filters, setFilters, options, clearFilters }) {
  const filterConfig = [
    { key: 'start_year', label: 'Start Year', optionsList: options?.startYears || [] },
    { key: 'end_year', label: 'End Year', optionsList: options?.endYears || [] },
    { key: 'topic', label: 'Topic', optionsList: options?.topics || [] },
    { key: 'sector', label: 'Sector', optionsList: options?.sectors || [] },
    { key: 'region', label: 'Region', optionsList: options?.regions || [] },
    { key: 'pestle', label: 'PEST', optionsList: options?.pestles || [] },
    { key: 'source', label: 'Source', optionsList: options?.sources || [] },
    { key: 'swot', label: 'SWOT', optionsList: options?.swots || [] },
    { key: 'country', label: 'Country', optionsList: options?.countries || [] },
    { key: 'city', label: 'City', optionsList: options?.cities || [] },
  ];

  const handleSelectChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="filter-panel card">
      <div className="filter-panel-header">
        <h4 className="filter-panel-title">Filters</h4>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>
      <div className="filter-grid">
        {filterConfig.map((config) => (
          <div key={config.key} className="filter-group">
            <label className="filter-label">{config.label}</label>
            <select
              className="filter-select"
              value={filters[config.key] || ''}
              onChange={(e) => handleSelectChange(config.key, e.target.value)}
            >
              <option value="">Select {config.label}</option>
              {config.optionsList.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
