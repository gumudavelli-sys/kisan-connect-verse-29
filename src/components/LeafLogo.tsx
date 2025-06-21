
import React from 'react';

export const LeafLogo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10C35 10 20 25 20 45C20 65 35 85 50 90C65 85 80 65 80 45C80 25 65 10 50 10Z"
        fill="url(#leafGradient)"
        stroke="#22c55e"
        strokeWidth="2"
      />
      <path
        d="M50 20C50 20 35 30 35 50C35 60 42 65 50 65"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 30C50 30 60 35 65 50"
        stroke="#16a34a"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  );
};
