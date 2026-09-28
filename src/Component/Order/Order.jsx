import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiUser,
  FiMail,
  FiPhone,
  FiShoppingCart,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
  FiImage,
} from "react-icons/fi";
import {
  HandleDashboard,
  HandleOrders,
  HandleOrderStatus,
} from "../../DAL/Collection";

const Order = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [inputData, setInputData] = useState('');
  console.log(inputData,"SteData====>")
  const [orderStatus, setOrderStatus] = useState([]);
  const baseUrl = "https://api.dialowatches.com";

  const HandleData = async () => {
    const resp = await HandleOrders();
    if (resp?.success === true) {
      setOrdersList(resp.data);
    }
  };

  const handleInputChange = async (e , id) => {
    const value = e.target.value;
    const resp = await HandleOrderStatus(id, value);
    if (resp?.success === true) {
      setOrderStatus(resp.data);
      HandleData();
    }else{
        setOrderStatus(resp.data);
    }
  };
  

  useEffect(() => {
    HandleData();
  }, []);


  const filteredOrders = ordersList.filter(
    (order) =>
      (activeFilter === "all" || order.status === activeFilter) &&
      (order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.[0]?.product?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white md:ml-61 mt-10 md:mt-4">
      <div className="bg-white border-b border-gray-200">
        <div className=" mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage customer orders and track status
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              {["all", "delivered", "shipped", "processing", "cancelled"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {filter === "all"
                      ? "All Orders"
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>

            <div className="relative w-full lg:w-80">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, customers, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-18 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Price & Qty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm  text-gray-900 font-mono">
                        {order.orderId}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                          <FiUser className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.address}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-900">{order.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiPhone className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-900">{order.phone}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {order.product?.coverImage ? (
                          <img
                            src={`${baseUrl}${order.product.coverImage}`}
                            alt={order.product?.name || "Product image"}
                            className="w-15 h-15 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiPackage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.product?.name || "No product name"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">
                          PKR {order.price || "N/A"}
                        </p>
                        <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Qty: {order.quantity || "0"}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <select
                          name="status"
                        value={order?.status}
                          onChange={(e) => {
                            handleInputChange(e, order.id);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                          <option value="">Select a status</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{order.created}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                Try changing your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
