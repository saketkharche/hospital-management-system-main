import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Accurate global mortality data based on WHO 2021 Global Health Estimates
const DISEASES_MORTALITY_DATA = [
  { disease: "Ischaemic Heart Disease", deaths: 9100000 },
  { disease: "COVID-19", deaths: 8800000 },
  { disease: "Stroke", deaths: 6800000 },
  { disease: "COPD", deaths: 3400000 },
  { disease: "Lower Respiratory Infections", deaths: 2500000 },
  { disease: "Lung Cancer", deaths: 1900000 },
  { disease: "Alzheimer's & Dementia", deaths: 1800000 },
  { disease: "Diabetes", deaths: 1600000 },
  { disease: "Kidney Disease", deaths: 1400000 },
  { disease: "Hypertensive Heart Disease", deaths: 1200000 },
];

// Create professional blue color gradients for each bar
const getBarColor = (index, total) => {
  const colors = [
    "rgba(30, 58, 138, 0.9)",    // Dark blue for heart disease
    "rgba(37, 99, 235, 0.9)",    // Blue for COVID-19
    "rgba(59, 130, 246, 0.9)",   // Medium blue for stroke
    "rgba(96, 165, 250, 0.9)",   // Light blue for COPD
    "rgba(30, 64, 175, 0.9)",    // Navy blue for respiratory infections
    "rgba(29, 78, 216, 0.9)",    // Royal blue for lung cancer
    "rgba(37, 99, 235, 0.8)",    // Blue variant for dementia
    "rgba(59, 130, 246, 0.8)",   // Medium blue variant for diabetes
    "rgba(96, 165, 250, 0.8)",   // Light blue variant for kidney disease
    "rgba(147, 197, 253, 0.9)",  // Lighter blue for hypertensive heart disease
  ];
  return colors[index % colors.length];
};

// Create a vertical gradient with light on top and shadow on bottom for 3D effect
const create3DBarGradient = (ctx, chartArea, color, index) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, color);
  gradient.addColorStop(0.7, "#ffffff88");
  gradient.addColorStop(1, color);
  return gradient;
};

// Enhanced shadow plugin with glow effect
const shadowPlugin = {
  id: "shadowPlugin",
  beforeDatasetsDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();

    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      // Outer glow
      ctx.shadowColor = getBarColor(index, chart.data.datasets[0].data.length);
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw glow rectangle
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(bar.x - bar.width / 2, bar.y, bar.width, chart.chartArea.bottom - bar.y);

      // Drop shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 6;
      ctx.shadowOffsetY = 8;

      // Draw shadow rectangle
      ctx.fillRect(bar.x - bar.width / 2, bar.y, bar.width, chart.chartArea.bottom - bar.y);
    });

    ctx.restore();
  }
};

const AccurateMortalityChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: DISEASES_MORTALITY_DATA.map(d => d.disease),
        datasets: [
          {
            label: "Deaths (2021 WHO Data)",
            data: DISEASES_MORTALITY_DATA.map(d => d.deaths),
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              const dataIndex = context.dataIndex;

              if (!chartArea) {
                return "rgba(0,0,0,0)";
              }
              
              const baseColor = getBarColor(dataIndex, DISEASES_MORTALITY_DATA.length);
              return create3DBarGradient(ctx, chartArea, baseColor, dataIndex);
            },
            borderColor: function(context) {
              const dataIndex = context.dataIndex;
              return getBarColor(dataIndex, DISEASES_MORTALITY_DATA.length).replace('0.9', '1');
            },
            borderWidth: 3,
            borderRadius: 16,
            borderSkipped: false,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2200,
          easing: "easeOutElastic",
          delay: (context) => context.dataIndex * 100,
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#222",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            titleFont: { size: 18, weight: "bold" },
            bodyFont: { size: 16 },
            padding: 15,
            cornerRadius: 12,
            displayColors: true,
            callbacks: {
              title: function(context) {
                return `💀 ${context[0].label}`;
              },
              label: function(context) {
                const millions = (context.parsed.y / 1000000).toFixed(1);
                return `Annual Deaths: ${millions}M people`;
              },
              afterLabel: function(context) {
                const total = 68000000; // Total global deaths in 2021
                const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                return `${percentage}% of global deaths`;
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => {
                if (value >= 1000000) {
                  return (value / 1000000).toFixed(1) + "M";
                }
                return value.toLocaleString();
              },
              color: "#555",
              font: {
                size: 14,
                weight: "600",
              },
              maxTicksLimit: 8,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              borderDash: [2, 8],
              lineWidth: 1,
            },
          },
          x: {
            ticks: {
              color: "#666",
              font: {
                size: 12,
                weight: "600",
              },
              maxRotation: 45,
              minRotation: 0,
            },
            grid: {
              display: false,
            },
          },
        },
        hover: {
          animationDuration: 300,
          mode: 'index',
          intersect: false,
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
      },
      plugins: [shadowPlugin],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ 
      maxWidth: "1200px", 
      height: "750px",
      margin: "2rem auto", 
      padding: "1.5rem",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      borderRadius: "16px",
      border: "1px solid #cbd5e1",
      boxShadow: "0 10px 30px rgba(30, 58, 138, 0.1)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Custom title overlay */}
      <div style={{
        textAlign: "center",
        marginBottom: "2rem",
        paddingTop: "1rem"
      }}>
        <h1 style={{
          color: "#1e3a8a",
          fontSize: "28px",
          fontWeight: "700",
          margin: "0 0 8px 0",
          fontFamily: "'Segoe UI', -apple-system, sans-serif"
        }}>
          🌍 Global Mortality Statistics
        </h1>
        <p style={{
          color: "#475569",
          fontSize: "16px",
          fontWeight: "500",
          margin: "0 0 4px 0"
        }}>
          Top 10 Leading Causes of Death Worldwide
        </p>
        <p style={{
          color: "#64748b",
          fontSize: "14px",
          fontWeight: "400",
          margin: 0
        }}>
          WHO Global Health Estimates 2021 • 68M Total Deaths
        </p>
      </div>
      
      <div style={{ 
        height: "580px", 
        background: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(30, 58, 138, 0.08)"
      }}>
        <canvas ref={chartRef} />
      </div>
      
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AccurateMortalityChart;