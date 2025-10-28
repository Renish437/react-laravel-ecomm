import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { apiUrl, adminToken } from "../common/Http";
import { AdminAuthContext } from "../context/AdminAuth";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from "chart.js";

// Register chart elements
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

const Dashboard = () => {
const { admin } = useContext(AdminAuthContext);
const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
const [loading, setLoading] = useState(true);
const [orderChart, setOrderChart] = useState(null);
const [productChart, setProductChart] = useState(null);
const [orderByCategoryChart, setOrderByCategoryChart] = useState(null);
const [orderByProductChart, setOrderByProductChart] = useState(null);
const [filter, setFilter] = useState("monthly");

// --- Fetch dashboard stats ---
const fetchStats = async () => {
  try {
    const res = await fetch(`${apiUrl}/stats`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    });
    const data = await res.json();
    if (data.status === 200) setStats(data.data);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
};

// --- Fetch Orders Overview Chart ---
const fetchOrderChart = async (type = "monthly") => {
  try {
    const res = await fetch(`${apiUrl}/order-chart?filter=${type}`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    });
    const data = await res.json();

    if (data.status === 200 && Array.isArray(data.data)) {
      const labels = data.data.map((item) => item.label ?? item.month ?? "N/A");
      const totals = data.data.map((item) => Number(item.total ?? item.count ?? 0));

      setOrderChart({
        labels,
        datasets: [
          {
            label: "Orders",
            data: totals,
            borderColor: "#36A2EB",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointBackgroundColor: "#36A2EB",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      });
    } else {
      setOrderChart(null);
    }
  } catch (err) {
    console.error("Error fetching order chart:", err);
  }
};

// --- Fetch Product Chart (Pie) ---
const fetchProductChart = async () => {
  try {
    const res = await fetch(`${apiUrl}/product-chart`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    });
    const data = await res.json();
    if (data.status === 200) {
      const labels = data.by_category.map((item) => item.label);
      const totals = data.by_category.map((item) => item.total);
      setProductChart({
        labels,
        datasets: [
          {
            data: totals,
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
            hoverOffset: 10,
          },
        ],
      });
    }
  } catch (err) {
    console.error("Error fetching product chart:", err);
  }
};

// --- Orders by Category ---
const fetchOrderByCategory = async () => {
  try {
    const res = await fetch(`${apiUrl}/order-by-category`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    });
    const data = await res.json();
    if (data.status === 200 && data.data.length > 0) {
      const labels = data.data.map((item) => item.label);
      const totals = data.data.map((item) => item.total_orders);
      setOrderByCategoryChart({
        labels,
        datasets: [
          {
            label: "Orders by Category",
            data: totals,
            borderColor: "#9966FF",
            backgroundColor: "rgba(67, 14, 215, 0.2)",
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "#9966FF",
            borderWidth: 2,
          },
        ],
      });
    }
  } catch (err) {
    console.error("Error fetching orders by category:", err);
  }
};

// --- Orders by Product ---
const fetchOrderByProduct = async () => {
  try {
    const res = await fetch(`${apiUrl}/order-by-product`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    });
    const data = await res.json();
    if (data.status === 200 && data.data.length > 0) {
      const labels = data.data.map((item) => item.label?.trim() || "Unknown Product");
      const totals = data.data.map((item) => Number(item.total_sold ?? 0));
      setOrderByProductChart({
        labels,
        datasets: [
          {
            label: "Top Selling Products",
            data: totals,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      });
    } else {
      setOrderByProductChart(null);
    }
  } catch (err) {
    console.error("Error fetching orders by product:", err);
  }
};

// --- Initial fetch ---
useEffect(() => {
  setLoading(true);
  Promise.all([
    fetchStats(),
    fetchProductChart(),
    fetchOrderByCategory(),
    fetchOrderByProduct(),
  ])
    .finally(() => setLoading(false));
}, []);

// --- Fetch orders chart whenever filter changes ---
useEffect(() => {
  fetchOrderChart(filter);
}, [filter]);



  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Dashboard</h4>
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <>
              {/* Top Stats */}
              <div className="row mb-4">
                {["users", "orders", "products"].map((key, idx) => (
                  <div className="col-md-4 mb-3" key={idx}>
                    <div className="card shadow text-center">
                      <div className="card-body">
                        <h2>{stats[key]}</h2>
                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </div>
                      <div className="card-footer">
                        <Link to={`/admin/${key}`}>View {key}</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="row">
                {/* Products by Category */}
                <div className="col-md-6 mb-4">
                  <div className="card shadow p-3">
                    <h5 className="mb-3 text-center">Products by Category</h5>
                    {productChart ? (
                      <Pie
                        key={JSON.stringify(productChart)}
                        data={productChart}
                        options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
                        height={100}
                      />
                    ) : (
                      <p className="text-center">No data available</p>
                    )}
                  </div>
                </div>

                {/* Orders by Category */}
                <div className="col-md-6 mb-4">
                  <div className="card shadow p-3">
                    <h5 className="mb-3 text-center">Orders by Category</h5>
                    {orderByCategoryChart ? (
                      <Line
                        key={JSON.stringify(orderByCategoryChart)}
                        data={orderByCategoryChart}
                        options={{
                          responsive: true,
                          plugins: { legend: { position: "bottom" } },
                          scales: { y: { beginAtZero: true } },
                        }}
                        height={270}
                      />
                    ) : (
                      <p className="text-center">No data available</p>
                    )}
                  </div>
                </div>

{/* <div className="col-md-4 mb-4">
  <div className="card shadow p-3" style={{ minHeight: "350px" }}>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="m-0">Orders Overview</h5>
      <select
        className="form-select w-auto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
    {orderChart ? (
      <Line
        data={orderChart}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" }, tooltip: { enabled: true } },
          scales: { y: { beginAtZero: true } },
        }}
        style={{ height: "100%" }}
      />
    ) : (
      <p className="text-center">No data available</p>
    )}
  </div>
</div> */}


                {/* Top Selling Products */}
                <div className="col-md-12 mb-4">
                  <div className="card shadow p-3">
                    <h5 className="mb-3 text-center">Top Selling Products</h5>
                    {orderByProductChart ? (
                      <Line
                        key={JSON.stringify(orderByProductChart)}
                        data={orderByProductChart}
                        options={{
                          responsive: true,
                          plugins: { legend: { position: "bottom" } },
                          scales: { y: { beginAtZero: true } },
                        }}
                        height={200}
                      />
                    ) : (
                      <p className="text-center">No data available</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
