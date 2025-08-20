import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-lg transition-all duration-300 cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-brown-800 hover:bg-brown-800/90 text-white shadow-lg hover:scale-105 hover:shadow-xl',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-8 text-lg',
    lg: 'py-4 px-8 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClasses = loading ? 'opacity-75' : '';

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${disabledClasses} 
        ${loadingClasses} 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {loading ? '読み込み中...' : children}
    </button>
  );
}