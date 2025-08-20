import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowUp, Shirt, Watch, Footprints, Sparkles, Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, color: '#D32F2F' },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 10 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer
      className="bg-[#1A1A1A] text-white py-20 px-4 md:px-8 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <motion.div variants={sectionVariants}>
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Shirt className="w-8 h-8 text-[#D32F2F]" />
            <span>Men's Fashion Store</span>
          </h3>
          <p className="text-gray-400 mb-4">
            Discover premium men's fashion including clothes, watches, shoes, and perfumes. Quality and style redefined.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mt-4"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <ArrowUp className="w-5 h-5" />
            <span>Back to Top</span>
          </motion.button>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={sectionVariants}>
          <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {['Home', 'Products', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <motion.li key={link} variants={linkVariants} initial="rest" whileHover="hover" whileTap="tap">
                <a href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="text-gray-400 hover:text-[#D32F2F] transition-colors">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div variants={sectionVariants}>
          <h4 className="text-xl font-semibold mb-6">Categories</h4>
          <ul className="space-y-3">
            {[
              { name: 'Clothes', icon: Shirt },
              { name: 'Watches', icon: Watch },
              { name: 'Shoes', icon: Footprints },
              { name: 'Perfumes', icon: Sparkles },
            ].map((category) => (
              <motion.li
                key={category.name}
                className="flex items-center space-x-2"
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div variants={iconVariants}>
                  <category.icon className="w-5 h-5 text-[#D32F2F]" />
                </motion.div>
                <a href={`#${category.name.toLowerCase()}`} className="text-gray-400 hover:text-[#D32F2F] transition-colors">
                  {category.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact & Newsletter */}
        <motion.div variants={sectionVariants}>
          <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-5 h-5 text-[#D32F2F]" />
              <span>support@mensfashion.com</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-400">
              <Phone className="w-5 h-5 text-[#D32F2F]" />
              <span>+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-5 h-5 text-[#D32F2F]" />
              <span>123 Fashion St, New York, NY</span>
            </li>
          </ul>

          <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#D32F2F] transition-colors"
            />
            <motion.button
              type="submit"
              className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        variants={sectionVariants}
      >
        <p className="text-gray-400 text-center md:text-left">
          © 2025 Men's Fashion Store. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <motion.a href="#" variants={linkVariants} initial="rest" whileHover="hover" whileTap="tap">
            <Facebook className="w-6 h-6 text-gray-400 hover:text-[#D32F2F]" />
          </motion.a>
          <motion.a href="#" variants={linkVariants} initial="rest" whileHover="hover" whileTap="tap">
            <Twitter className="w-6 h-6 text-gray-400 hover:text-[#D32F2F]" />
          </motion.a>
          <motion.a href="#" variants={linkVariants} initial="rest" whileHover="hover" whileTap="tap">
            <Instagram className="w-6 h-6 text-gray-400 hover:text-[#D32F2F]" />
          </motion.a>
        </div>
        <div className="flex items-center space-x-4">
          <CreditCard className="w-6 h-6 text-gray-400" />
          <span className="text-gray-400">Secure Payments</span>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;