import React from 'react';

export function Input({ className, error, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-50 ring-offset-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        error ? 'border-red-500 focus:ring-red-500' : ''
      } ${className}`}
      {...props}
    />
  );
}