import React, { useState, useEffect } from "react";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiShoppingCart,
  HiUsers,
  HiCurrencyDollar,
  HiCollection,
  HiCube,
} from "react-icons/hi";
import { AiOutlineEye, AiOutlineShopping } from "react-icons/ai";
import { HandleDashboard } from "../../DAL/Collection";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [dashboardData, setDashboardData] = useState([]);
  const navigate = useNavigate();


  const stats = [
    {
      title: "Total Revenue",
      value: `${dashboardData.totalRevenue} PKR`,
      change: "+12.5%",
      trend: "up",
      icon: HiCurrencyDollar,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      description: "All time revenue",
    },
    {
      title: "Total Products",
      value: dashboardData.products,
      change: "+5.2%",
      trend: "up",
      icon: HiCube,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      description: "Active products",
    },
    {
      title: "Total Categories",
      value: dashboardData.categories,
      change: "+2",
      trend: "up",
      icon: HiCollection,
      color: "from-purple-500 to-fuchsia-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
      description: "Product categories",
    },
    {
      title: "Total Brands",
      value: dashboardData.brands,
      change: "-3.4%",
      trend: "up",
      icon: HiCollection,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      description: "Brands",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New order",
      description: "Order #ORD-0012 placed",
      time: "2 min ago",
      type: "order",
      status: "completed",
    },
    {
      id: 2,
      action: "Product added",
      description: "Tissot Ballade added to catalog",
      time: "1 hour ago",
      type: "product",
      status: "success",
    },
    {
      id: 3,
      action: "Category updated",
      description: "Men's category updated",
      time: "2 hours ago",
      type: "category",
      status: "updated",
    },
    {
      id: 4,
      action: "Low stock alert",
      description: "Only 5 units left for Product #123",
      time: "5 hours ago",
      type: "alert",
      status: "warning",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Tissot Ballade 60mm",
      category: "Men",
      sales: 234,
      revenue: "$12,450",
      stock: 15,
      growth: "+12%",
    },
    {
      id: 2,
      name: "Casio Edifice",
      category: "Men",
      sales: 189,
      revenue: "$8,920",
      stock: 8,
      growth: "+8%",
    },
    {
      id: 3,
      name: "Fossil Jacqueline",
      category: "Women",
      sales: 156,
      revenue: "$7,840",
      stock: 22,
      growth: "+15%",
    },
    {
      id: 4,
      name: "Seiko Presage",
      category: "Men",
      sales: 143,
      revenue: "$15,230",
      stock: 5,
      growth: "+23%",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return <AiOutlineShopping className="text-white" />;
      case "product":
        return <HiCube className="text-white" />;
      case "category":
        return <HiCollection className="text-white" />;
      case "alert":
        return <HiTrendingDown className="text-white" />;
      default:
        return <AiOutlineEye className="text-white" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "success":
        return "bg-blue-100 text-blue-700";
      case "updated":
        return "bg-purple-100 text-purple-700";
      case "warning":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getIconBgColor = (type) => {
    switch (type) {
      case "order":
        return "bg-gradient-to-br from-blue-500 to-indigo-600";
      case "product":
        return "bg-gradient-to-br from-emerald-500 to-teal-600";
      case "category":
        return "bg-gradient-to-br from-purple-500 to-fuchsia-600";
      case "alert":
        return "bg-gradient-to-br from-amber-500 to-orange-500";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600";
    }
  };

  const HandleData = async () => {
    const resp = await HandleDashboard();
    if (resp?.success === true) {
      setDashboardData(resp.data);
    }
  };
  useEffect(() => {
    HandleData();
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 p-6 md:ml-66 mt-10 md:mt-4">
   
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 font-medium">
              Welcome to your e-commerce dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${stat.color} shadow-md`}
                  >
                    <Icon className="text-white text-lg" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <HiTrendingUp />
                    ) : (
                      <HiTrendingDown />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-700 font-semibold mb-1">{stat.title}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activities
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group/item"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl ${getIconBgColor(
                      activity.type
                    )} shadow-md`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 truncate">
                          {activity.action}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            activity.status
                          )}`}
                        >
                          {activity.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

     
        <div className="group relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Selling Products
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200/60 hover:border-blue-300 hover:shadow-md transition-all duration-200 group/item"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-inner">
                      <HiCube className="text-blue-600 text-xl" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{product.revenue}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-sm text-gray-500">
                        {product.sales} sales
                      </p>
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                        {product.growth}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.stock > 10
                          ? "bg-emerald-100 text-emerald-700"
                          : product.stock > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {product.stock} in stock
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      <div className="group relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => navigate("/addProduct")} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/60 hover:border-blue-300 hover:shadow-md transition-all duration-200 group/action bg-linear-to-r from-white to-blue-50/50">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md group-hover/action:scale-110 transition-transform duration-200">
                <HiCube className="text-white text-xl" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Add New Product</p>
                <p className="text-sm text-gray-500">
                  Create a new product listing
                </p>
              </div>
            </button>

            <button onClick={() => navigate("/categories")} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/60 hover:border-emerald-300 hover:shadow-md transition-all duration-200 group/action bg-linear-to-r from-white to-emerald-50/50">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md group-hover/action:scale-110 transition-transform duration-200">
                <HiCollection className="text-white text-xl" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Manage Categories</p>
                <p className="text-sm text-gray-500">
                  Organize product categories
                </p>
              </div>
            </button>

            <button onClick={() => navigate("/orders")}  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/60 hover:border-purple-300 hover:shadow-md transition-all duration-200 group/action bg-linear-to-r from-white to-purple-50/50">
              <div className="p-3 bg-linear-to-br from-purple-500 to-fuchsia-600 rounded-xl shadow-md group-hover/action:scale-110 transition-transform duration-200">
                <HiShoppingCart className="text-white text-xl" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">View Orders</p>
                <p className="text-sm text-gray-500">Check recent orders</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
