import React from 'react';

export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-lg border border-gray-800 bg-gray-900/50 text-gray-50 shadow-lg backdrop-blur-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div 
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3 
      className={`text-2xl font-semibold leading-none tracking-tight text-white ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p 
      className={`text-sm text-gray-400 ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div 
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  );
}