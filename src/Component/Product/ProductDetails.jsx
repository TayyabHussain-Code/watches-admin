import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleProductId } from "../../DAL/Collection";
import { useLocation } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [product, setProduct] = useState({});
  const baseUrl = "https://api.dialowatches.com";
  const id = state?.id;
  console.log(id, "idiaw");
  const HandleDetail = async () => {
    const resp = await HandleProductId(id);
    if (resp?.success === true) {
      setProduct(resp.data);
    }
  };
  useEffect(() => {
    HandleDetail();
  }, []);

  return (
    <div className="bg-white min-h-screen p-5 m-2 rounded-lg md:ml-66">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Details
        </h1>
        <div className="w-20 h-1 bg-gray-400 rounded"></div>
      </div>

      <div className=" overflow-hidden">
        <div className="p-4">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Product Images
              </h2>
              <span className="text-sm text-gray-500">4 images</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="group relative bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="aspect-square mb-4 overflow-hidden rounded-md bg-white">
                  <img
                    src={`${baseUrl}${product.coverImage}`}
                    className="h-full w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              {product?.otherImages?.map((desc, index) => (
                  <div key={index} className="group relative bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="aspect-square mb-4 overflow-hidden rounded-md bg-white">
                  <img
                    src={`${baseUrl}${desc}`}
                    className="h-full w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
                  ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Product Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">
                      Product ID
                    </span>
                    <span className="text-gray-900 font-mono text-sm">
                      {product.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Name</span>
                    <span className="text-gray-900">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Category</span>
                    <span className="text-gray-900">
                      {product.category?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Brand</span>
                    <span className="text-gray-900">{product.brand?.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">
                      Stock Status
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {product.stockStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">
                      Available Stock
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Pricing
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Original</span>
                    <span className="text-gray-900">{product.price} PKR</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">
                      Discounted Price
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {product.totalprice} PKR
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {product?.description?.map((desc, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Products List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
