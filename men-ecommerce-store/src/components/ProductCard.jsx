import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Star, Heart, Package, X, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { getCategoryIcon } from '../utils/constants';

// --- THEME COLORS ---
const theme = {
  bg: "bg-white",
  cardBorder: "border border-[#E0E0E0]",
  heading: "text-[#1A1A1A]",
  text: "text-[#555555]",
  accent: "text-[#D32F2F]",
  accentBg: "bg-[#D32F2F]",
  hoverBg: "hover:bg-[#F9F9F9]",
  gold: "text-[#C9A14A]",
};

// --- Confirmation Modal ---
const ConfirmationModal = ({ onConfirm, onCancel, productName, showConfirmModal }) => (
  <AnimatePresence>
    {showConfirmModal && (
      <motion.div
        key={`confirmation-modal-${productName}`}
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
            exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
          <div className="text-center">
            <motion.div
              className="bg-red-100 text-red-600 rounded-full p-3 inline-flex mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <AlertTriangle className="w-8 h-8" />
            </motion.div>
            <motion.h3
              id="confirm-delete-title"
              className="text-2xl font-bold text-[#1A1A1A] mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Confirm Deletion
            </motion.h3>
            <motion.p
              className="text-[#555555] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Are you sure you want to delete <span className="font-semibold text-[#1A1A1A]">"{productName}"</span>? This action cannot be undone.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.button
              onClick={onConfirm}
              className="w-full bg-[#D32F2F] text-white py-3 rounded-lg font-semibold hover:bg-[#B71C1C] transition-colors shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Yes, Delete it
            </motion.button>
            <motion.button
              onClick={onCancel}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProductCard = ({ product, onEdit, onDelete, onToggleFeatured, viewMode = 'grid' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: "text-[#D32F2F]", bg: "bg-red-100", text: "Out of Stock" };
    if (stock <= 10) return { color: "text-orange-600", bg: "bg-orange-100", text: "Low Stock" };
    if (stock <= 25) return { color: "text-yellow-600", bg: "bg-yellow-100", text: "Medium Stock" };
    return { color: "text-green-600", bg: "bg-green-100", text: "In Stock" };
  };

  const stockStatus = getStockStatus(product.stock);

  const handleDeleteClick = () => setShowConfirmModal(true);
  const handleConfirmDelete = () => { onDelete(product.id); setShowConfirmModal(false); };
  const handleCancelDelete = () => setShowConfirmModal(false);

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      toast.success("Product added to favorites!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info("Product removed from favorites!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("Product is out of stock!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success("Product added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 10, transition: { duration: 0.2 } },
  };

  if (viewMode === 'list') {
    return (
      <React.Fragment>
        <motion.div
          key={`product-card-${product.id}`}
          className="bg-white border border-[#E0E0E0] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <div className="flex items-center p-6">
            <motion.div
              className="relative mr-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
              <AnimatePresence>
                {product.featured && (
                  <motion.div
                    key={`featured-badge-${product.id}`}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-[#C9A14A] to-[#D4AF37] text-white p-1 rounded-full"
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{product.name}</h3>
                  <p className="text-sm text-[#555555]">{product.brand} • {product.category}</p>
                </motion.div>
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-[#1A1A1A]">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <React.Fragment>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        <motion.span
                          key={`discount-badge-list-${product.id}`}
                          className="bg-[#D32F2F]/10 text-[#D32F2F] px-2 py-1 rounded-full text-xs font-medium"
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {discount}% OFF
                        </motion.span>
                      </React.Fragment>
                    )}
                  </div>
                  <motion.div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {product.stock} units
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center space-x-4 text-sm text-[#555555]">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span>{product.rating} ({product.reviews})</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => onToggleFeatured(product.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      product.featured ? "bg-[#C9A14A]/20 text-[#C9A14A] hover:bg-[#C9A14A]/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div variants={iconVariants}>
                      <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                    </motion.div>
                  </motion.button>
                  <motion.button
                    onClick={() => onEdit(product)}
                    className="p-2 bg-[#D32F2F]/10 text-[#D32F2F] hover:bg-[#D32F2F]/20 rounded-lg transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div variants={iconVariants}>
                      <Edit className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  <motion.button
                    onClick={handleDeleteClick}
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div variants={iconVariants}>
                      <Trash2 className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <ConfirmationModal 
          onConfirm={handleConfirmDelete} 
          onCancel={handleCancelDelete} 
          productName={product.name} 
          showConfirmModal={showConfirmModal}
        />
      </React.Fragment>
    );
  }

  // GRID VIEW
  return (
    <React.Fragment>
      <motion.div
        key={`product-card-${product.id}`}
        className="bg-white border border-[#E0E0E0] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            <AnimatePresence>
              {product.featured && (
                <motion.div
                  key={`featured-badge-${product.id}`}
                  className="bg-gradient-to-r from-[#C9A14A] to-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </motion.div>
              )}
              {discount > 0 && (
                <motion.div
                  key={`discount-badge-${product.id}`}
                  className="bg-[#D32F2F] text-white px-3 py-1 rounded-full text-xs font-bold"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {discount}% OFF
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <motion.button
              onClick={handleLikeClick}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isLiked ? `bg-[#D32F2F] text-white` : "bg-white/80 text-gray-600 hover:bg-white"}`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label={isLiked ? "Unlike product" : "Like product"}
            >
              <motion.div variants={iconVariants}>
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#555555]">{product.brand}</span>
              <motion.div
                className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
              >
                {product.stock} left
              </motion.div>
            </div>
            <motion.h3
              className="text-lg font-bold text-[#1A1A1A] mb-1 group-hover:text-[#D32F2F] transition-colors"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {product.name}
            </motion.h3>
            <p className="text-[#555555] text-sm mb-3 line-clamp-2">{product.description}</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#1A1A1A]">${product.price}</span>
              {product.originalPrice > product.price && <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>}
            </div>
            <div className="flex items-center text-sm text-[#555555]">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span>{product.rating} ({product.reviews})</span>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center text-sm text-[#555555] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {React.createElement(getCategoryIcon(product.category), { className: "w-4 h-4 mr-2" })}
            <span>{product.category} • {product.subcategory}</span>
          </motion.div>

          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <motion.button
              onClick={() => onToggleFeatured(product.id)}
              className={`p-2 rounded-lg transition-colors ${
                product.featured ? "bg-[#C9A14A]/20 text-[#C9A14A] hover:bg-[#C9A14A]/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div variants={iconVariants}>
                <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
              </motion.div>
            </motion.button>
            <motion.button
              onClick={() => onEdit(product)}
              className="flex-1 bg-[#D32F2F]/10 hover:bg-[#D32F2F]/20 text-[#D32F2F] px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div variants={iconVariants}>
                <Edit className="w-4 h-4" />
              </motion.div>
              <span>Edit</span>
            </motion.button>
            <motion.button
              onClick={handleDeleteClick}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div variants={iconVariants}>
                <Trash2 className="w-4 h-4" />
              </motion.div>
              <span>Delete</span>
            </motion.button>
          </motion.div>

          <motion.button
            onClick={handleAddToCart}
            className={`w-full mt-3 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#D32F2F] text-white hover:bg-[#B71C1C]"
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={product.stock === 0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Package className="w-4 h-4" />
            <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
          </motion.button>
        </motion.div>
      </motion.div>
      
      <ConfirmationModal 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
        productName={product.name} 
        showConfirmModal={showConfirmModal}
      />
    </React.Fragment>
  );
};

export default ProductCard;