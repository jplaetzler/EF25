import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ShimmerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Shimmer: React.FC<ShimmerProps> = ({ className = '', style = {}, children }) => {
  const { themeMode } = useTheme();

  // Don't apply shimmer effect in simple mode
  if (themeMode === 'simple') {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        {children}
        <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ pointerEvents: 'none' }}
        />
      </div>
  );
};

export default Shimmer;