import React from 'react';
import { motion } from 'framer-motion';
import { Field } from 'formik';

// Motion variants for input animation
const inputVariants = {
  rest: { scale: 1 },
  focus: { 
    scale: 1.02,
    boxShadow: "0 0 0 2px rgba(211, 47, 47, 0.5)",
    transition: { duration: 0.2 }
  }
};

const CustomField = ({ name, type = "text", placeholder, required = false, as, rows, options, disabled, values }) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        const hasError = meta.touched && meta.error;
        const fieldProps = {
          ...field,
          type,
          placeholder,
          disabled,
          className: `w-full border ${hasError ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent outline-none transition-all ${as === 'textarea' ? 'resize-none' : ''}`
        };

        if (as === 'textarea') {
          return (
            <motion.textarea
              {...fieldProps}
              rows={rows}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
            />
          );
        }

        if (as === 'select') {
          return (
            <motion.select
              {...fieldProps}
              variants={inputVariants}
              initial="rest"
              whileFocus="focus"
            >
              <option value="">{placeholder}</option>
              {options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              {name === 'subcategory' && values.category && values.categories[values.category]?.map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </motion.select>
          );
        }

        return (
          <motion.input
            {...fieldProps}
            variants={inputVariants}
            initial="rest"
            whileFocus="focus"
          />
        );
      }}
    </Field>
  );
};

export default CustomField;