import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HandleBrandList,
  HandleCateogryList,
  HandleProductDataUpdate,
  HandleProductId,
} from "../../DAL/Collection";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [product, setProduct] = useState({});
  const [sucessAlert, setSucessAlert] = useState(null);
  const showSuccess = (msg) => {
    setSucessAlert(msg);
    setTimeout(() => setSucessAlert(null), 2000);
  };

  const [cat, setCat] = useState([]);
  const [brand, setBrand] = useState([]);
  const baseUrl = "https://api.dialowatches.com";
  const id = state?.id;

  const HandleDetail = async () => {
    const resp = await HandleProductId(id);
    if (resp?.success === true) {
      setProduct(resp.data);
    }
  };

  const HandleCatDropdown = async () => {
    const resp = await HandleCateogryList();
    if (resp?.success === true) {
      setCat(resp.data);
    }
  };

  const HandleBrandDropdown = async () => {
    const resp = await HandleBrandList();
    if (resp?.success === true) {
      setBrand(resp.data);
    }
  };

  useEffect(() => {
    HandleDetail();
    HandleCatDropdown();
    HandleBrandDropdown();
  }, []);

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...product.description];
    updatedFeatures[index] = value;
    setProduct((prev) => ({
      ...prev,
      description: updatedFeatures,
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = product.description.filter((_, i) => i !== index);
    setProduct((prev) => ({
      ...prev,
      description: updatedFeatures,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = cat.find((c) => c.id === selectedCategoryId);
    setProduct((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
  };

  const handleBrandChange = (e) => {
    const selectedBrandId = e.target.value;
    const selectedBrand = brand.find((b) => b.id === selectedBrandId);
    setProduct((prev) => ({
      ...prev,
      brand: selectedBrand,
    }));
  };

  const preparePayload = () => {
    const stockStatusMap = {
      "In Stock": "in_stock",
      "Out of Stock": "out_of_stock",
      "Low Stock": "low_stock",
    };

    return {
      name: product.name || "",
      price: product.price || 0,
      categoryId: product?.category?.id || "",
      brandId: product?.brand?.id || "",
      stock: product.stock || 0,
      stockStatus: stockStatusMap[product.stockStatus] || "in_stock",
      discount: product.totalprice,
      images: [],
      description: product.description || [],
    };
  };

  const handleSave = async () => {
    const payload = preparePayload();
    showSuccess("Product updated successfully");

    const resp = await HandleProductDataUpdate(id, payload);
    if (resp?.success === true) {
      navigate("/products");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-screen p-5 m-2 rounded-lg md:ml-66">
      {sucessAlert && (
        <div
          className={`p-4 mb-4 text-sm rounded-base md:w-84 fixed right-0.5 text-[#065f46] bg-[#d1fae5] text-[#065f46]"
          }`}
          role="alert"
        >
          <span className="font-medium">Success!</span> {sucessAlert}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Update
        </h1>
        <div className="w-20 h-1 bg-gray-400 rounded"></div>
      </div>

      <div className="overflow-hidden">
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
                <div
                  key={index}
                  className="group relative bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Product Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={product.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={product?.category?.id || ""}
                      onChange={handleCategoryChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="">Select a category</option>
                      {cat.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <select
                      value={product?.brand?.id || ""}
                      onChange={handleBrandChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="">Select a brand</option>
                      {brand.map((brandItem) => (
                        <option key={brandItem.id} value={brandItem.id}>
                          {brandItem.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Status
                    </label>
                    <select
                      value={product.stockStatus || ""}
                      onChange={(e) =>
                        handleInputChange("stockStatus", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Stock (units)
                    </label>
                    <input
                      type="number"
                      value={product.stock || ""}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Pricing
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={product.price || ""}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discounted Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={product.totalprice || ""}
                      onChange={(e) =>
                        handleInputChange("totalprice", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Description
              </h2>
              <div className="space-y-4">
                {product?.description?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 shrink-0"></div>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                 
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
