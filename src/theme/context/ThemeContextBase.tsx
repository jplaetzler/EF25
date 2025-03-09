import { createContext } from 'react';

export type IconSize = 'sm' | 'md' | 'lg';
export type ThemeMode = 'normal' | 'simple';

export interface ThemeContextType {
  iconSize: IconSize;
  setIconSize: (size: IconSize) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  getIconClasses: (name: string) => string;
  getButtonClasses: (variant?: 'primary' | 'secondary' | 'ghost') => string;
}

export const defaultContext: ThemeContextType = {
  iconSize: 'md',
  setIconSize: () => {},
  themeMode: 'normal',
  setThemeMode: () => {},
  getIconClasses: () => '',
  getButtonClasses: () => '',
};

// Separate context definition to avoid React Refresh warnings
export const ThemeContext = createContext<ThemeContextType>(defaultContext);