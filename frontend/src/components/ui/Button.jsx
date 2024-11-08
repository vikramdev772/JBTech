import React from 'react';

const variants = {
  default: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md',
  destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
  outline: 'border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
  secondary: 'bg-gray-800 text-white hover:bg-gray-700 shadow-md',
  ghost: 'hover:bg-gray-800 text-gray-400 hover:text-white shadow-none',
  link: 'text-purple-500 underline-offset-4 hover:underline shadow-none',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-8',
  icon: 'h-10 w-10',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  isLoading = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {props.children}
    </button>
  );
}