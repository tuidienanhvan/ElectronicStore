import { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatisticsLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/electronic_gadgets.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-purple-600">Loading data...</div>
      </div>
    );
  }

  // Calculate chart data
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.sold;
    return acc;
  }, {});

  const topProducts = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const averageRatingByCategory = Object.entries(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { total: 0, count: 0 };
      }
      acc[product.category].total += product.rating;
      acc[product.category].count += 1;
      return acc;
    }, {})
  ).reduce((acc, [category, data]) => {
    acc[category] = data.total / data.count;
    return acc;
  }, {});

  // Chart configurations
  const salesByCategory = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Units Sold',
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const topProductsChart = {
    labels: topProducts.map(product => product.product_title),
    datasets: [
      {
        label: 'Best Selling Products',
        data: topProducts.map(product => product.sold),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const ratingChart = {
    labels: Object.keys(averageRatingByCategory),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(averageRatingByCategory),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sales Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
          <Pie data={salesByCategory} options={chartOptions} />
        </div>

        {/* Top 5 Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top 5 Best Sellers</h2>
          <Bar data={topProductsChart} options={chartOptions} />
        </div>

        {/* Average Rating by Category */}
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Average Rating by Category</h2>
          <Line data={ratingChart} options={chartOptions} />
        </div>

        {/* Overview Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Total Products</h3>
              <p className="text-2xl font-bold text-purple-600">{products.length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Total Sales</h3>
              <p className="text-2xl font-bold text-blue-600">
                {products.reduce((sum, product) => sum + product.sold, 0)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Avg Rating</h3>
              <p className="text-2xl font-bold text-green-600">
                {(products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800">Categories</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {new Set(products.map(product => product.category)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsLayout;
