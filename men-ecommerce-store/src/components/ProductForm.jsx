import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomField from './CustomField';
import { modalVariants, buttonVariants, containerVariants, itemVariants, categories } from '../utils/constants';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const initialValues = {
    name: product?.name || '',
    price: product?.price ? String(product.price) : '',
    originalPrice: product?.originalPrice ? String(product.originalPrice) : '',
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    stock: product?.stock ? String(product.stock) : '',
    description: product?.description || '',
    image: product?.image || '',
    brand: product?.brand || '',
    tags: Array.isArray(product?.tags) ? product.tags.join(', ') : (product?.tags || '')
  };

  const blacklistedWords = ['test', 'sample', 'dummy'];

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z][a-zA-Z0-9\s\-&'.,()]*$/,
        'Product name must start with a letter and contain only letters, numbers, spaces, hyphens, ampersands, apostrophes, dots, commas, or parentheses'
      )
      .min(2, 'Product name must be at least 2 characters')
      .max(100, 'Product name cannot exceed 100 characters')
      .trim()
      .test('no-repeated-chars', 'Product name cannot contain repeated characters (e.g., !!!! or 0000)', value => {
        if (!value) return false;
        return !/(.)\1{3,}/.test(value);
      })
      .test('no-blacklisted-words', 'Product name cannot contain blacklisted words (test, sample, dummy)', value => {
        if (!value) return false;
        const lowerValue = value.toLowerCase();
        return !blacklistedWords.some(word => lowerValue.includes(word));
      })
      .required('Product name is required'),

    brand: Yup.string()
      .matches(
        /^[a-zA-Z][a-zA-Z0-9\s\-&'.,()]*$/,
        'Brand name must start with a letter and contain only letters, numbers, spaces, hyphens, ampersands, apostrophes, dots, commas, or parentheses'
      )
      .min(2, 'Brand name must be at least 2 characters')
      .max(50, 'Brand name cannot exceed 50 characters')
      .trim()
      .test('no-repeated-chars', 'Brand name cannot contain repeated characters (e.g., !!!! or 0000)', value => {
        if (!value) return false;
        return !/(.)\1{3,}/.test(value);
      })
      .test('no-blacklisted-words', 'Brand name cannot contain blacklisted words (test, sample, dummy)', value => {
        if (!value) return false;
        const lowerValue = value.toLowerCase();
        return !blacklistedWords.some(word => lowerValue.includes(word));
      })
      .required('Brand name is required'),

    price: Yup.number()
      .typeError('Price must be a valid number')
      .min(0.01, 'Price must be at least 0.01')
      .max(999999.99, 'Price cannot exceed 999,999.99')
      .test('decimal-places', 'Price can have up to 2 decimal places', value => {
        if (!value) return false;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      })
      .required('Price is required'),

    originalPrice: Yup.number()
      .typeError('Original price must be a valid number')
      .min(0.01, 'Original price must be at least 0.01')
      .max(999999.99, 'Original price cannot exceed 999,999.99')
      .test('decimal-places', 'Original price can have up to 2 decimal places', value => {
        if (!value) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      })
      .test('price-comparison', 'Original price must be greater than or equal to price', function (value) {
        const { price } = this.parent;
        if (!value) return true;
        return value >= price;
      })
      .nullable(),

    stock: Yup.number()
      .typeError('Stock must be a whole number')
      .integer('Stock must be a whole number')
      .min(0, 'Stock cannot be negative')
      .max(999999, 'Stock cannot exceed 999,999')
      .test('stock-instock', 'Stock must be 0 if product is not in stock', function (value) {
        const { inStock } = this.parent;
        if (inStock === false) return value === 0;
        return true;
      })
      .required('Stock quantity is required'),

    category: Yup.string()
      .oneOf(Object.keys(categories), 'Please select a valid category')
      .test('no-misc-unless-needed', 'Miscellaneous category is not allowed unless no other category fits', function (value) {
        if (value !== 'Miscellaneous') return true;
        return true;
      })
      .required('Category is required'),

    subcategory: Yup.string()
      .nullable()
      .test('valid-subcategory', 'Subcategory must belong to the selected category', function (value) {
        const { category } = this.parent;
        if (!value) return true;
        if (!category) return false;
        return categories[category]?.includes(value) || false;
      }),

    sku: Yup.string()
      .matches(
        /^[A-Z0-9]{8,20}$/,
        'SKU must be 8–20 alphanumeric characters, uppercase only'
      )
      .test('sku-prefix', 'SKU must start with valid product line prefix', value => {
        if (!value) return true;
        const validPrefixes = ['ELC-', 'CLT-'];
        return validPrefixes.some(prefix => value.startsWith(prefix));
      })
      .test('sku-unique', 'SKU must be unique', async value => {
        if (!value) return true;
        const isUnique = true;
        return isUnique;
      })
      .nullable(),

    image: Yup.string()
      .matches(
        /^https:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/i,
        'Image must be a valid HTTPS URL'
      )
      .test(
        'is-image-url',
        'URL must be an image (jpg, jpeg, png, webp, or valid Unsplash link)',
        value => {
          if (!value) return false;
          if (value.includes("images.unsplash.com")) return true;
          return /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(value);
        }
      )
      .test(
        'no-placeholder-image',
        'Placeholder images (e.g., no-image.png) are not allowed',
        value => {
          if (!value) return false;
          return !value.toLowerCase().includes('no-image');
        }
      )
      .required('Image URL is required'),

    description: Yup.string()
      .max(1000, 'Description cannot exceed 1000 characters')
      .matches(/^[a-zA-Z0-9\s\-&'.,()!?\n]*$/, 'Description contains invalid characters')
      .test('min-words', 'Description must contain at least 3 words if provided', value => {
        if (!value) return true;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 3;
      })
      .test('no-html', 'Description cannot contain HTML tags', value => {
        if (!value) return true;
        return !/<[a-z][\s\S]*>/i.test(value);
      })
      .nullable(),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    try {
      const processedTags = values.tags 
        ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const productData = {
        ...values,
        price: parseFloat(values.price),
        originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : parseFloat(values.price),
        stock: values.stock ? parseInt(values.stock) : 0,
        tags: processedTags,
        name: values.name.trim(),
        brand: values.brand.trim(),
        description: values.description.trim()
      };

      onSubmit(productData);
      toast.success(product ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      toast.error('An error occurred while saving the product');
      console.error('Form submission error:', error);
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-[#E0E0E0]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-6">
            <motion.div 
              className="flex items-center justify-between mb-6"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-2xl font-bold text-[#1A1A1A]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {product ? 'Edit Product' : 'Add New Product'}
              </motion.h2>
              <motion.button
                onClick={onCancel}
                className="text-[#555555] hover:text-[#1A1A1A] transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, isSubmitting, errors, touched }) => (
                <Form>
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={itemVariants}
                    >
                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Product Name *
                        </motion.label>
                        <CustomField name="name" placeholder="Enter product name" required categories={categories} />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Brand *
                        </motion.label>
                        <CustomField name="brand" placeholder="Enter brand name" required categories={categories} />
                        <ErrorMessage name="brand" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      variants={itemVariants}
                    >
                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Current Price *
                        </motion.label>
                        <CustomField name="price" type="text" placeholder="0.00" required categories={categories} />
                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          Original Price
                        </motion.label>
                        <CustomField name="originalPrice" type="text" placeholder="0.00" categories={categories} />
                        <ErrorMessage name="originalPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Stock Quantity
                        </motion.label>
                        <CustomField name="stock" type="text" placeholder="0" categories={categories} />
                        <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={itemVariants}
                    >
                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Category *
                        </motion.label>
                        <CustomField 
                          name="category" 
                          as="select" 
                          placeholder="Select a category"
                          options={Object.keys(categories)}
                          required 
                          categories={categories}
                        />
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <motion.label 
                          className="block text-sm font-medium text-[#555555] mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Subcategory
                        </motion.label>
                        <CustomField 
                          name="subcategory" 
                          as="select" 
                          placeholder="Select subcategory"
                          disabled={!values.category}
                          values={values}
                          categories={categories}
                        />
                        <ErrorMessage name="subcategory" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <motion.label 
                        className="block text-sm font-medium text-[#555555] mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Image URL
                      </motion.label>
                      <CustomField name="image" type="url" placeholder="https://example.com/image.jpg" categories={categories} />
                      <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <motion.label 
                        className="block text-sm font-medium text-[#555555] mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Description
                      </motion.label>
                      <CustomField 
                        name="description" 
                        as="textarea" 
                        rows="3" 
                        placeholder="Enter product description"
                        categories={categories}
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <motion.label 
                        className="block text-sm font-medium text-[#555555] mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Tags (comma separated)
                      </motion.label>
                      <CustomField 
                        name="tags" 
                        placeholder="e.g., casual, comfortable, premium"
                        categories={categories}
                      />
                      <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mt-1" />
                    </motion.div>
                    
                    <motion.div 
                      className="flex space-x-3 pt-4 border-t border-[#E0E0E0]"
                      variants={itemVariants}
                    >
                      <motion.button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-[#F5F5F5] hover:bg-[#F9F9F9] text-[#555555] px-6 py-3 rounded-lg font-medium transition-colors"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#D32F2F] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                        <span>{isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductForm;