import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import { getCategoryIcon } from '../utils/constants';
import StatsCard from './StatsCard';

const HomePage = ({ products, onNavigateToProducts }) => {
  const featuredProducts = products.filter(p => p.featured);
  const categories = ['Clothes', 'Watches', 'Shoes', 'Perfumes'];
  
  const categoryStats = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return {
      name: category,
      count: categoryProducts.length,
      icon: getCategoryIcon(category),
      totalValue: categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
    };
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: { scale: 1.03, transition: { duration: 0.3 } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className="space-y-8 bg-[#F5F5F5] min-h-screen p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div 
        className="bg-[#1A1A1A] text-white p-8 rounded-2xl relative overflow-hidden shadow-xl"
        variants={itemVariants}
      >
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Men's Fashion Store
          </motion.h1>
          <motion.p 
            className="text-xl mb-6 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover premium men's fashion, watches, shoes, and fragrances
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={onNavigateToProducts}
              className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Manage Products
            </motion.button>
            <div className="flex items-center space-x-6 text-white/90">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm">Total Products</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="text-2xl font-bold">{featuredProducts.length}</div>
                <div className="text-sm">Featured</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full transform translate-x-32 -translate-y-32"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-48 h-48 bg-red-700/10 rounded-full transform -translate-x-24 translate-y-24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      {/* Category Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categoryStats.map((category, index) => {
          const colors = [
            { color: 'text-[#D32F2F]', bg: 'bg-red-50' },
            { color: 'text-gray-800', bg: 'bg-gray-100' },
            { color: 'text-black', bg: 'bg-gray-200' },
            { color: 'text-[#C9A14A]', bg: 'bg-yellow-50' }
          ];
          return (
            <motion.div
              key={category.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <StatsCard
                icon={category.icon}
                title={category.name}
                value={`${category.count} items`}
                color={colors[index].color}
                bgColor={colors[index].bg}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Featured Products */}
      <AnimatePresence>
        {featuredProducts.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h2 
                className="text-2xl font-bold text-[#1A1A1A] flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Star className="w-6 h-6 mr-2 text-[#D32F2F]" />
                </motion.div>
                Featured Products
              </motion.h2>
              <motion.button
                onClick={onNavigateToProducts}
                className="text-[#D32F2F] hover:text-red-700 font-medium flex items-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View All Products
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                </motion.div>
              </motion.button>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredProducts.slice(0, 6).map(product => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <div className="relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-3 left-3">
                      <motion.div
                        className="bg-[#D32F2F] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </motion.div>
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="absolute top-3 right-3">
                        <motion.div
                          className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold"
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    className="p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.div
                      className="mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <span className="text-sm font-medium text-gray-500">{product.brand}</span>
                      <motion.h3
                        className="text-lg font-bold text-[#1A1A1A] mb-1"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {product.name}
                      </motion.h3>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center justify-between mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-[#1A1A1A]">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <Star className="w-4 h-4 text-[#D32F2F] fill-current mr-1" />
                        </motion.div>
                        <span>{product.rating}</span>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center text-sm text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      {React.createElement(getCategoryIcon(product.category), { className: "w-4 h-4 mr-2" })}
                      <span>{product.category}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;