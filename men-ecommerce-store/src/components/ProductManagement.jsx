/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import {
  Package,
  DollarSign,
  Star,
  TrendingUp,
  Trash2,
  Search,
  Grid,
  List,
  Plus,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import CategoryFilter from "./CategoryFilter";
import StatsCard from "./StatsCard";
import HomePage from "./HomePage";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
} from "../features/products/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);

  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem("productManagementView");
    return savedView ? savedView : "home";
  });

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: "name", label: "Sort by Name" },
    { value: "price", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "stock", label: "Stock: High to Low" },
    { value: "rating", label: "Rating: High to Low" },
  ];

  useEffect(() => {
    localStorage.setItem("productManagementView", currentView);
  }, [currentView]);

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filterCategory || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "stock":
          return b.stock - a.stock;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const productCounts = categories.reduce((acc, category) => {
    acc[category] = products.filter((p) => p.category === category).length;
    return acc;
  }, {});

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock <= 10
  ).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const featuredProducts = products.filter((p) => p.featured).length;

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
  };

  const handleToggleFeatured = (id) => {
    dispatch(toggleFeatured(id));
    const product = products.find((p) => p.id === id);
    toast.success(
      `Product ${product?.featured ? "removed from" : "added to"} featured!`
    );
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      dispatch(updateProduct({ ...productData, id: editingProduct.id }));
    } else {
      dispatch(addProduct(productData));
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  const getCurrentSortLabel = () => {
    return (
      sortOptions.find((option) => option.value === sortBy)?.label ||
      "Sort by Name"
    );
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  if (currentView === "home") {
    return (
      <motion.div
        className="min-h-screen "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="bg-[#1A1A1A] shadow-sm border-b border-[#E0E0E0] sticky top-0 z-40"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-[#D32F2F] p-2 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShoppingBag className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h1
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Men's Fashion Store
                </motion.h1>
              </motion.div>
              <motion.button
                onClick={() => setCurrentView("products")}
                className="bg-[#D32F2F] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Package className="w-4 h-4" />
                </motion.div>
                <span>Manage Products</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* HomePage */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          variants={itemVariants}
        >
          <HomePage
            products={products}
            onNavigateToProducts={() => setCurrentView("products")}
          />
        </motion.div>
        <ToastContainer position="bottom-right" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[#F5F5F5]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="bg-[#1A1A1A] shadow-sm border-b border-[#E0E0E0] sticky top-0 z-40"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setCurrentView("home")}
                className="bg-[#D32F2F] p-2 rounded-lg hover:bg-red-700 transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ShoppingBag className="w-6 h-6 text-white" />
                </motion.div>
              </motion.button>
              <motion.h1
                className="text-xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                Product Management
              </motion.h1>
            </motion.div>
            <motion.button
              onClick={() => setCurrentView("home")}
              className="bg-[#D32F2F] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <span className="text-lg">←</span>
              </motion.div>
              <span>Back to Home</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={itemVariants}
      >
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants} whileHover="hover">
            <StatsCard
              icon={Package}
              title="Total Products"
              value={totalProducts}
              color="text-[#D32F2F]"
              bgColor="bg-red-50"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <StatsCard
              icon={DollarSign}
              title="Total Value"
              value={`${totalValue.toLocaleString()}`}
              color="text-[#1A1A1A]"
              bgColor="bg-gray-100"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <StatsCard
              icon={Star}
              title="Featured"
              value={featuredProducts}
              color="text-[#C9A14A]"
              bgColor="bg-yellow-50"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <StatsCard
              icon={TrendingUp}
              title="Low Stock"
              value={lowStockProducts}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover">
            <StatsCard
              icon={Trash2}
              title="Out of Stock"
              value={outOfStockProducts}
              color="text-red-600"
              bgColor="bg-red-50"
            />
          </motion.div>
        </motion.div>

        {/* Filters + Actions */}
        <motion.div variants={itemVariants}>
          <CategoryFilter
            categories={categories}
            selectedCategory={filterCategory}
            onCategoryChange={setFilterCategory}
            productCounts={productCounts}
          />
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-[#E0E0E0]"
          variants={itemVariants}
        >
          <div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4"
            onClick={(e) => {
              if (!e.target.closest(".relative")) {
                setShowSortDropdown(false);
              }
            }}
          >
            {/* Search & Sort */}
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1"
              variants={itemVariants}
            >
              <motion.div className="relative flex-1 max-w-md" variants={itemVariants}>
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                                </motion.div>
                <motion.input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent outline-none transition-all"
                  variants={buttonVariants}
                  initial="rest"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(211, 47, 47, 0.5)",
                  }}
                />
              </motion.div>
              <motion.div className="relative" variants={itemVariants}>
                <motion.button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="px-4 py-3 border border-[#E0E0E0] rounded-lg bg-white shadow-sm text-[#1A1A1A] font-medium focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] outline-none transition-all hover:border-[#D32F2F] hover:shadow-md flex items-center justify-between min-w-[200px]"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span>{getCurrentSortLabel()}</span>
                  <motion.div
                    animate={{ rotate: showSortDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {sortOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => handleSortSelect(option.value)}
                          className={`w-full text-left px-4 py-3 hover:bg-red-50 hover:text-[#D32F2F] transition-all ${
                            sortBy === option.value
                              ? "bg-red-50 text-[#D32F2F] font-medium"
                              : "text-[#1A1A1A]"
                          } ${option === sortOptions[0] ? "rounded-t-lg" : ""} ${
                            option === sortOptions[sortOptions.length - 1]
                              ? "rounded-b-lg"
                              : ""
                          }`}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* View Toggle + Add */}
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <motion.div className="flex bg-gray-100 rounded-lg p-1" variants={itemVariants}>
                <motion.button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-[#D32F2F]"
                      : "text-gray-600"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-[#D32F2F]"
                      : "text-gray-600"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </motion.div>
              <motion.button
                onClick={handleAddProduct}
                className="bg-[#D32F2F] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                <span>Add Product</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Product List */}
        <AnimatePresence>
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div
              key="no-products"
              className="text-center py-16 bg-white rounded-xl shadow-sm border border-[#E0E0E0]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-600 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {searchTerm || filterCategory
                  ? "No products found"
                  : "No products yet"}
              </motion.h3>
              <motion.p
                className="text-gray-500 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {searchTerm || filterCategory
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first product"}
              </motion.p>
              {!searchTerm && !filterCategory && (
                <motion.button
                  onClick={handleAddProduct}
                  className="bg-[#D32F2F] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Add Your First Product
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="product-list"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredAndSortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <ProductCard
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onToggleFeatured={handleToggleFeatured}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              key="product-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductForm
                product={editingProduct}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ToastContainer
          position="bottom-right"
          theme="colored"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductManagement;