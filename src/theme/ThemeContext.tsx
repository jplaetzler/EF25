import React, { useState, ReactNode } from 'react';
import { 
  ThemeContext, 
  IconSize, 
  ThemeMode,
  ThemeContextType
} from './context/ThemeContextBase';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [iconSize, setIconSize] = useState<IconSize>('md');
  const [themeMode, setThemeMode] = useState<ThemeMode>('normal');

  // Return appropriate icon classes based on current theme settings
  const getIconClasses = (): string => {
    const sizeClasses = {
      sm: 'w-icon-sm h-icon-sm text-icon-sm',
      md: 'w-icon-md h-icon-md text-icon-md',
      lg: 'w-icon-lg h-icon-lg text-icon-lg',
    };

    // Base classes that apply to all icons
    const baseClasses = 'inline-block';
    
    // Apply animation effects based on theme mode
    const effectClasses = themeMode === 'normal' ? 'transition-transform duration-300 hover:scale-110' : '';
    
    return `${baseClasses} ${sizeClasses[iconSize]} ${effectClasses}`;
  };

  // Return appropriate button classes based on variant and theme
  const getButtonClasses = (variant: 'primary' | 'secondary' | 'ghost' = 'primary'): string => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-300';
    
    const variantClasses = {
      primary: 'bg-forest-primary text-white hover:bg-forest-dark',
      secondary: 'bg-forest-secondary text-forest-dark hover:bg-forest-light',
      ghost: 'bg-transparent border border-forest-primary text-forest-primary hover:bg-forest-light/20',
    };
    
    // Apply animation effects based on theme mode
    const effectClasses = themeMode === 'normal' ? 'hover:shadow-md active:scale-95' : '';

    return `${baseClasses} ${variantClasses[variant]} ${effectClasses}`;
  };

  const value: ThemeContextType = {
    iconSize,
    setIconSize,
    themeMode,
    setThemeMode,
    getIconClasses,
    getButtonClasses,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};