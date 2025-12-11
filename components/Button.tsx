import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  active = false,
  ...props 
}) => {
  const baseStyle = "transition-all duration-200 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyle = "";
  
  switch (variant) {
    case 'primary':
      variantStyle = "bg-white/90 hover:bg-white text-fuchsia-900 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/50 px-4 py-2";
      break;
    case 'secondary':
      variantStyle = "bg-white/20 hover:bg-white/30 text-white border border-white/20 px-4 py-2";
      break;
    case 'ghost':
      variantStyle = "hover:bg-white/10 text-white px-3 py-1.5";
      break;
    case 'icon':
      variantStyle = `p-2 rounded-full ${active ? 'bg-white text-fuchsia-600 shadow-md' : 'text-white hover:bg-white/20'}`;
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};