import React from 'react';
import { useTheme } from '../hooks/useTheme';
import Icon from './Icon';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { iconSize, setIconSize, themeMode, setThemeMode } = useTheme();

  const handleSizeToggle = () => {
    // Cycle through sizes: sm -> md -> lg -> sm
    const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
    const currentIndex = sizes.indexOf(iconSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setIconSize(sizes[nextIndex]);
  };

  const handleModeToggle = () => {
    setThemeMode(themeMode === 'normal' ? 'simple' : 'normal');
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={handleSizeToggle}
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-forest-light text-forest-dark text-sm font-medium"
        title="Toggle icon size"
      >
        <span>Size: {iconSize.toUpperCase()}</span>
        <Icon name="settings" className="w-4 h-4" />
      </button>
      
      <button
        onClick={handleModeToggle}
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-forest-light text-forest-dark text-sm font-medium"
        title="Toggle effects mode"
      >
        <span>Mode: {themeMode === 'normal' ? 'Normal' : 'Simple'}</span>
        <Icon name="settings" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;