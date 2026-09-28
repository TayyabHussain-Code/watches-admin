import React, { useState, useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  HandleAddCateogry,
  HandleCateogryList,
  HandleDeleteCateogray,
  HandleIdData,
  HandleUpdateData,
} from "../../DAL/Collection";

const Categories = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sucessAlert, setSucessAlert] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [idData, setIdData] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState("active");

  const showSuccess = (msg) => {
    setSucessAlert(msg);
    setTimeout(() => setSucessAlert(null), 2000);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setCategoryStatus(category.status || "active");
    setEditModalOpen(true);
  };

  const handleAddNew = () => {
    setNewCategory("");
    setCategoryStatus("active");
    setAddModalOpen(true);
  };

  const HandleCatogriesData = async () => {
    const resp = await HandleCateogryList();
    if (resp?.success === true) {
      setCategories(resp.data);
    }
  };

  const HandleNewCat = async () => {
    if (!newCategory.trim()) return;

    const payload = {
      name: newCategory.trim(),
      status: categoryStatus,
    };

    const resp = await HandleAddCateogry(payload);
    if (resp?.success === true) {
      setAddModalOpen(false);
      HandleCatogriesData();
      setNewCategory("");
      showSuccess("Cateogry added successfully");
    }
  };

  const HandleDelete = async (id) => {
    const resp = await HandleDeleteCateogray(id);

    if (resp?.success === true) {
      setIsDelete(true);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      showSuccess("Category deleted successfully");
      setTimeout(() => setIsDelete(false), 2000);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !newCategory) return;

    const payload = {
      name: newCategory,
    };
    const resp = await HandleUpdateData(editingCategory?.id, payload);
    if (resp?.success === true) {
      setEditModalOpen(false);
      HandleCatogriesData();
      showSuccess("Cateogry updated successfully");
    }
  };

  const handleAddSubmit = () => {
    HandleNewCat();
  };

  const handleEditSubmit = () => {
    handleUpdateCategory();
  };

  useEffect(() => {
    HandleCatogriesData();
  }, []);

  const AddCategoryModal = () => (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Category
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter category details below
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={categoryStatus}
              onChange={(e) => setCategoryStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddModalOpen(false)}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSubmit}
              disabled={!newCategory.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EditCategoryModal = () => (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
          <p className="text-sm text-gray-600 mt-1">Update category details</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category ID
            </label>
            <input
              type="text"
              value={editingCategory?.id || ""}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={categoryStatus}
              onChange={(e) => setCategoryStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditModalOpen(false)}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleEditSubmit}
              disabled={!newCategory.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen md:ml-66 p-5 m-4 rounded-lg mt-10 md:mt-4">
      {sucessAlert && (
        <div
          className={`p-4 mb-4 text-sm rounded-base md:w-84 fixed right-0.5 ${
            isDelete ? "bg-red-200 text-red-700" : "bg-[#d1fae5] text-[#065f46]"
          }`}
          role="alert"
        >
          <span className="font-medium">Success!</span> {sucessAlert}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">
          Manage product categories and organization
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
          >
            <AiOutlinePlus className="text-lg" />
            Add Category
          </button>
        </div>
      </div>

      {filteredCategories.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {categories.length}
              </p>
              <p className="text-sm text-gray-600">Total Categories</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {categories.filter((cat) => cat.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Categories</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {categories.reduce(
                  (total, cat) => total + (cat.totalProducts || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 font-mono">{category.id}</p>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <HiOutlineDotsVertical className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    category.status === "active"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                <span
                  className={`text-sm font-medium ${
                    category.status === "active"
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {category.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {category.totalProducts || 0}
                </p>
                <p className="text-xs text-gray-500">products</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(category)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
              >
                <AiOutlineEdit className="text-base" />
                Edit
              </button>
              <button
                onClick={() => HandleDelete(category.id)}
                className="flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <AiOutlineDelete className="text-base" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📂</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No categories found" : "No categories yet"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by creating your first category"}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <AiOutlinePlus />
              Add Category
            </button>
          )}
        </div>
      )}

      {addModalOpen && <AddCategoryModal />}
      {editModalOpen && <EditCategoryModal />}
    </div>
  );
};

export default Categories;
