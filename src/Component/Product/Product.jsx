import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HandleDeleteProduct, HandleProductList } from "../../DAL/Collection";

const Product = () => {
  const baseUrl = "https://api.dialowatches.com";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const [deleteProd, setDeleteProd] = useState([]);
  const [sucessAlert, setSucessAlert] = useState(null);
  const showSuccess = (msg) => {
    setSucessAlert(msg);
    setTimeout(() => setSucessAlert(null), 2000);
  };

  const HandleProduct = async () => {
    const resp = await HandleProductList();
    if (resp?.success === true) {
      setProductList(resp.data);
    }
  };

  const HandleDelete = async (id) => {
    const resp = await HandleDeleteProduct(id);
    if (resp?.success === true) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showSuccess("Product Deleted successfully");
    }
  };

  useEffect(() => {
    HandleProduct();
  }, []);

  return (
    <div className="bg-white min-h-screen p-5 m-2 rounded-lg md:ml-66 mt-10 md:mt-4 ">
      {sucessAlert && (
        <div
          className={`p-4 mb-4 text-sm rounded-base md:w-84 fixed right-0.5 text-red-700 bg-red-200 text-[#065f46]"
          }`}
          role="alert"
        >
          <span className="font-medium">Success!</span> {sucessAlert}
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      <div className=" mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <button
            onClick={() => navigate("/addProduct")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
          >
            <AiOutlinePlus className="text-lg" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productList.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() =>
                    navigate("/productsDetails", { state: { id: product.id } })
                  }
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden ">
                        <img
                          src={`${baseUrl}${product.coverImage}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 font-mono">
                          {product.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.stock > 10
                            ? "bg-green-500"
                            : product.stock > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={`font-medium ${
                          product.stock > 10
                            ? "text-green-700"
                            : product.stock > 0
                            ? "text-yellow-700"
                            : "text-red-700"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.totalprice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate("/updateProduct", {
                            state: { id: product.id },
                          });
                        }}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <AiOutlineEdit className="text-base" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          HandleDelete(product.id);
                        }}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <AiOutlineDelete className="text-base" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {productList.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first product.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <AiOutlinePlus />
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
