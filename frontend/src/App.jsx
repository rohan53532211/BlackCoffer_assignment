import React, { useState, useEffect } from 'react';
import './App.css';
import { getDashboardStats, getFilters, getInsights, getChartData } from './services/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import FilterPanel from './components/FilterPanel';
import DashboardCharts from './components/DashboardCharts';
import DataTable from './components/DataTable';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({});

  const [dashboardStats, setDashboardStats] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [insightsData, setInsightsData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [scatterData, setScatterData] = useState([]);

  const [chartData, setChartData] = useState({
    topic: [],
    sector: [],
    country: [],
    end_year: [],
    pestle: []
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('published');

  const [loadingMetadata, setLoadingMetadata] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [statsRes, filtersRes] = await Promise.all([
          getDashboardStats(),
          getFilters()
        ]);
        setDashboardStats(statsRes.dashboard);
        setFilterOptions(filtersRes.filters);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMetadata(false);
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      try {
        const queryParams = {
          page,
          limit,
          sort,
          ...filters
        };
        if (debouncedSearch.trim() !== '') {
          queryParams.search = debouncedSearch.trim();
        }
        const dataRes = await getInsights(queryParams);
        setInsightsData(dataRes.data || []);
        setPagination(dataRes.pagination || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingInsights(false);
      }
    };
    fetchInsights();
  }, [page, limit, sort, debouncedSearch, filters]);

  useEffect(() => {
    const fetchCharts = async () => {
      setLoadingCharts(true);
      try {
        const [topicRes, sectorRes, countryRes, yearRes, pestleRes, scatterRes] = await Promise.all([
          getChartData('topic', filters),
          getChartData('sector', filters),
          getChartData('country', filters),
          getChartData('end_year', filters),
          getChartData('pestle', filters),
          getInsights({ limit: 100, ...filters })
        ]);
        setChartData({
          topic: topicRes.data || [],
          sector: sectorRes.data || [],
          country: countryRes.data || [],
          end_year: yearRes.data || [],
          pestle: pestleRes.data || []
        });
        setScatterData(scatterRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCharts(false);
      }
    };
    fetchCharts();
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
    setPage(1);
    setSearch('');
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="main-content">
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          setSidebarOpen={setSidebarOpen}
          search={search}
          setSearch={setSearch}
        />
        
        {activeTab === 'dashboard' ? (
          <>
            <KpiCards stats={dashboardStats} loading={loadingMetadata} />
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              options={filterOptions} 
              clearFilters={clearFilters}
            />
            {loadingCharts ? (
              <div className="card loader-container">
                <div className="spinner" />
              </div>
            ) : (
              <DashboardCharts 
                chartData={chartData} 
                scatterData={scatterData}
                theme={theme}
              />
            )}
          </>
        ) : (
          <DataTable 
            data={insightsData}
            pagination={pagination}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            sort={sort}
            setSort={setSort}
            loading={loadingInsights}
          />
        )}
      </div>
    </div>
  );
}

export default App;