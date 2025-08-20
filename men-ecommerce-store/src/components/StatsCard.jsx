/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({ icon: Icon, title, value, color, bgColor, trend }) => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 10 },
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      className={`${bgColor} p-6 rounded-xl border border-gray-100 relative overflow-hidden`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <motion.div className="flex items-center" variants={itemVariants}>
          <motion.div
            className={`${color} p-3 rounded-lg bg-white bg-opacity-20 mr-4`}
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-sm font-medium text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.p>
            <motion.p
              className={`text-2xl font-bold ${color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {value}
            </motion.p>
          </motion.div>
        </motion.div>
        {trend && (
          <motion.div
            className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
            variants={itemVariants}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            </motion.div>
            <span>{Math.abs(trend)}%</span>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default StatsCard;