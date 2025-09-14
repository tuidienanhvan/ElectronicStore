import React from 'react';
import { motion } from 'framer-motion';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  icon: Icon
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            block w-full rounded-md
            ${Icon ? 'pl-10' : 'pl-3'}
            pr-3 py-2
            border ${error ? 'border-red-300' : 'border-gray-300'}
            ${error ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-purple-500 focus:ring-purple-500'}
            disabled:bg-gray-50 disabled:text-gray-500
            shadow-sm
            text-sm
            transition-colors duration-200
          `}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FormInput; 