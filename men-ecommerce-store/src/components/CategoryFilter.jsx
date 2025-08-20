import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { getCategoryIcon } from '../utils/constants';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, productCounts }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md border border-[#E0E0E0] mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center"
        variants={itemVariants}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Filter className="w-5 h-5 mr-2 text-[#D32F2F]" />
        </motion.div>
        Categories
      </motion.h3>

      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
      >
        {/* All Products */}
        <motion.button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 rounded-full font-medium transition-all shadow-sm ${
            selectedCategory === '' 
              ? 'bg-[#D32F2F] text-white shadow-lg'
              : 'bg-[#F5F5F5] text-[#555555] hover:bg-[#F9F9F9]'
          }`}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          All Products ({Object.values(productCounts).reduce((a, b) => a + b, 0)})
        </motion.button>

        {/* Category Buttons */}
        {categories.map(category => {
          const Icon = getCategoryIcon(category);
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all flex items-center space-x-2 shadow-sm ${
                selectedCategory === category
                  ? 'bg-[#D32F2F] text-white shadow-lg'
                  : 'bg-[#F5F5F5] text-[#555555] hover:bg-[#F9F9F9]'
              }`}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              <span>{category} ({productCounts[category] || 0})</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CategoryFilter;