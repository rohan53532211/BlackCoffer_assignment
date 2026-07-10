import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Doughnut, Scatter, Radar, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

function DashboardCharts({ chartData, scatterData, theme }) {
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#434968' : '#dbdade';
  const textColor = isDark ? '#b6bee3' : '#5d596c';

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: { family: 'Public Sans', size: 12 }
        }
      },
      tooltip: {
        padding: 10,
        cornerRadius: 4,
        bodyFont: { family: 'Public Sans' },
        titleFont: { family: 'Public Sans', weight: 'bold' }
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'Public Sans' } }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'Public Sans' } }
      }
    }
  };

  const radialOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: { family: 'Public Sans', size: 12 }
        }
      }
    },
    scales: {
      r: {
        grid: { color: gridColor },
        angleLines: { color: gridColor },
        pointLabels: {
          color: textColor,
          font: { family: 'Public Sans', size: 10 }
        },
        ticks: {
          color: textColor,
          backdropColor: 'transparent',
          font: { family: 'Public Sans' }
        }
      }
    }
  };

  const topicData = {
    labels: chartData.topic.slice(0, 15).map(item => item.label),
    datasets: [{
      label: 'Average Intensity',
      data: chartData.topic.slice(0, 15).map(item => item.intensity),
      backgroundColor: '#7367f0',
      borderRadius: 4
    }]
  };

  const yearLikelihoodData = {
    labels: [...chartData.end_year].sort((a, b) => a.label.localeCompare(b.label)).map(item => item.label),
    datasets: [{
      label: 'Average Likelihood',
      data: [...chartData.end_year].sort((a, b) => a.label.localeCompare(b.label)).map(item => item.likelihood),
      borderColor: '#ff9f43',
      backgroundColor: 'rgba(255, 159, 67, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const countryData = {
    labels: chartData.country.slice(0, 10).map(item => item.label),
    datasets: [{
      label: 'Insights Count',
      data: chartData.country.slice(0, 10).map(item => item.count),
      backgroundColor: '#28c76f',
      borderRadius: 4
    }]
  };

  const sectorData = {
    labels: chartData.sector.slice(0, 8).map(item => item.label),
    datasets: [{
      data: chartData.sector.slice(0, 8).map(item => item.count),
      backgroundColor: [
        '#7367f0', '#28c76f', '#ff9f43', '#ea5455',
        '#00bad1', '#ffc107', '#6c757d', '#17a2b8'
      ],
      borderWidth: 0
    }]
  };

  const yearRelevanceData = {
    labels: [...chartData.end_year].sort((a, b) => a.label.localeCompare(b.label)).map(item => item.label),
    datasets: [{
      label: 'Average Relevance',
      data: [...chartData.end_year].sort((a, b) => a.label.localeCompare(b.label)).map(item => item.relevance),
      borderColor: '#00bad1',
      backgroundColor: 'rgba(0, 186, 209, 0.1)',
      fill: true,
      tension: 0.3
    }]
  };

  const mappedScatterPoints = scatterData.map(item => ({
    x: item.intensity || 0,
    y: item.likelihood || 0
  }));

  const scatterChartData = {
    datasets: [{
      label: 'Intensity vs Likelihood',
      data: mappedScatterPoints,
      backgroundColor: '#ea5455',
      pointRadius: 6
    }]
  };

  const radarChartData = {
    labels: chartData.sector.slice(0, 7).map(item => item.label),
    datasets: [
      {
        label: 'Intensity',
        data: chartData.sector.slice(0, 7).map(item => item.intensity),
        borderColor: '#7367f0',
        backgroundColor: 'rgba(115, 103, 240, 0.2)'
      },
      {
        label: 'Likelihood',
        data: chartData.sector.slice(0, 7).map(item => item.likelihood),
        borderColor: '#28c76f',
        backgroundColor: 'rgba(40, 199, 111, 0.2)'
      },
      {
        label: 'Relevance',
        data: chartData.sector.slice(0, 7).map(item => item.relevance),
        borderColor: '#ff9f43',
        backgroundColor: 'rgba(255, 159, 67, 0.2)'
      }
    ]
  };

  const pestleData = {
    labels: chartData.pestle.slice(0, 6).map(item => item.label),
    datasets: [{
      data: chartData.pestle.slice(0, 6).map(item => item.count),
      backgroundColor: [
        'rgba(115, 103, 240, 0.7)',
        'rgba(40, 199, 111, 0.7)',
        'rgba(255, 159, 67, 0.7)',
        'rgba(234, 84, 85, 0.7)',
        'rgba(0, 186, 209, 0.7)',
        'rgba(108, 117, 125, 0.7)'
      ],
      borderWidth: 1,
      borderColor: gridColor
    }]
  };

  const showRadar = radarChartData.labels.length >= 3;

  const radarFallbackData = {
    labels: radarChartData.labels,
    datasets: radarChartData.datasets.map((ds, index) => {
      const colors = ['#7367f0', '#28c76f', '#ff9f43'];
      return {
        ...ds,
        backgroundColor: colors[index],
        borderRadius: 4
      };
    })
  };

  return (
    <div className="charts-grid">
      <div className="chart-card card col-8">
        <h4 className="chart-title">Topic vs Intensity</h4>
        <div className="chart-container">
          <Bar data={topicData} options={commonOptions} />
        </div>
      </div>
      <div className="chart-card card col-4">
        <h4 className="chart-title">Sector Distribution</h4>
        <div className="chart-container">
          <Doughnut 
            data={sectorData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: textColor, font: { family: 'Public Sans', size: 10 } }
                }
              }
            }} 
          />
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">Year vs Likelihood</h4>
        <div className="chart-container">
          <Line data={yearLikelihoodData} options={commonOptions} />
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">Relevance over Years</h4>
        <div className="chart-container">
          <Line data={yearRelevanceData} options={commonOptions} />
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">Country Distribution (Top 10)</h4>
        <div className="chart-container">
          <Bar 
            data={countryData} 
            options={{
              ...commonOptions,
              indexAxis: 'y'
            }} 
          />
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">Intensity vs Likelihood (Scatter)</h4>
        <div className="chart-container">
          <Scatter data={scatterChartData} options={commonOptions} />
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">{showRadar ? 'Sector Metrics Radar' : 'Sector Metrics Bar'}</h4>
        <div className="chart-container">
          {showRadar ? (
            <Radar data={radarChartData} options={radialOptions} />
          ) : (
            <Bar data={radarFallbackData} options={commonOptions} />
          )}
        </div>
      </div>
      <div className="chart-card card col-6">
        <h4 className="chart-title">PEST Distribution</h4>
        <div className="chart-container">
          <PolarArea data={pestleData} options={radialOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
