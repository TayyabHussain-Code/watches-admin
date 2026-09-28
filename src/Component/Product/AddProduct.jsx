import React, { useEffect, useState } from "react";
import { HiUpload, HiX, HiCheck } from "react-icons/hi";
import {
  HandleAddProduct,
  HandleBrandList,
  HandleCateogryList,
} from "../../DAL/Collection";

const AddProduct = () => {
  const [sucessAlert, setSucessAlert] = useState(null);
  const showSuccess = (msg) => {
    setSucessAlert(msg);
    setTimeout(() => setSucessAlert(null), 2000);
  };

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    stockStatus: "",
    originalPrice: "",
    discountedPrice: "",
    stockQuantity: "",
    features: [],
  });

  const [cateograytList, setCateograytList] = useState([]);
  const [brandsList, setBrandList] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const HandleCatogriesData = async () => {
    const catRes = await HandleCateogryList();
    if (catRes?.success === true) setCateograytList(catRes.data);
  };

  const HandleBrandData = async () => {
    const brandRes = await HandleBrandList();
    if (brandRes?.success === true) setBrandList(brandRes.data);
  };

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFeatureChange = (i, v) => {
    const f = [...formData.features];
    f[i] = v;
    setFormData((p) => ({ ...p, features: f }));
  };

  const addFeature = () => {
    setFormData((p) => ({ ...p, features: [...p.features, ""] }));
  };

  const removeFeature = (i) => {
    const f = formData.features.filter((_, x) => x !== i);
    setFormData((p) => ({ ...p, features: f }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((p) => [...p, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((p) => p.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();

    fd.append("name", formData.productName);
    fd.append("categoryId", formData.category);
    fd.append("brandId", formData.brand);
    fd.append("stockStatus", formData.stockStatus);
    fd.append("price", formData.originalPrice);
    fd.append("discount", formData.discountedPrice);
    fd.append("stock", formData.stockQuantity);
    fd.append("description", JSON.stringify(formData.features));
    console.log(formData.features, "jaddu");

    images.forEach((img) => fd.append("images", img.file));

    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1]);
    }
    const resp = await HandleAddProduct(fd);
    if(resp.success){
      showSuccess("Product added successfully");
    }
 

    setFormData({
      productName: "",
      category: "",
      brand: "",
      stockStatus: "",
      originalPrice: "",
      discountedPrice: "",
      stockQuantity: "",
      features: [""],
    });

    setImages([]);
    setLoading(false);
  };

  const isFormValid =
    formData.productName &&
    formData.category &&
    formData.brand &&
    formData.originalPrice &&
    formData.stockQuantity &&
    formData.stockStatus;

  useEffect(() => {
    HandleCatogriesData();
    HandleBrandData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 md:ml-66 mt-10 md:mt-4 ">
      {sucessAlert && (
        <div
          className={`p-4 mb-4 text-sm rounded-base md:w-84 fixed right-0.5 text-[#065f46] bg-[#d1fae5] text-[#065f46]"
          }`}
          role="alert"
        >
          <span className="font-medium">Success!</span> {sucessAlert}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600 font-medium">
            Create a new product listing with all necessary details
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Product Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select a category</option>
                  {cateograytList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select a brand</option>
                  {brandsList.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Status *
                </label>
                <select
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select a Status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price ($) *
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount on Price ($)
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Key Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  + Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter feature"
                    />

                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <HiX size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Product Images
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <HiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer ${
                    images.length >= 4 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <span className="text-blue-600 hover:text-blue-500 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={images.length >= 4}
                />
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB each (Max 4 images)
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Uploaded Images ({images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <HiX size={14} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              onClick={() => {
                setFormData({
                  productName: "",
                  category: "",
                  brand: "",
                  stockStatus: "",
                  originalPrice: "",
                  discountedPrice: "",
                  stockQuantity: "",
                  features: [""],
                });
                setImages([]);
              }}
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <HiCheck size={18} />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
