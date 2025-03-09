import React from 'react';
import { useTheme } from '../hooks/useTheme';

// Define the available icons
// All icon paths are defined here
const iconPaths: Record<string, React.ReactNode> = {
  // Star icon for headliners
  star: (
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  ),
  // Music related
  spotify: (
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5563 16.0637C16.3204 16.4355 15.8276 16.5373 15.4558 16.3015C13.3177 15.0206 10.6461 14.6807 7.26349 15.4145C6.83974 15.5129 6.41938 15.2458 6.32099 14.822C6.22261 14.3983 6.48972 13.9779 6.91346 13.8795C10.6461 13.057 13.6576 13.4532 16.1184 14.9632C16.4903 15.1991 16.5921 15.6919 16.3563 16.0637ZM17.8345 13.4999C17.5415 13.9667 16.9227 14.0939 16.4559 13.801C14.0186 12.3275 10.358 11.8267 7.15799 12.7146C6.63546 12.8648 6.09693 12.5721 5.94676 12.0496C5.79659 11.527 6.08931 10.9885 6.61184 10.8383C10.2781 9.82165 14.3764 10.3842 17.2334 12.1213C17.7002 12.4143 17.8274 13.0331 17.5345 13.4999ZM17.9352 10.8964C15.0692 9.19025 9.95235 8.98755 6.76267 9.98423C6.14339 10.1669 5.49622 9.80419 5.31358 9.18491C5.13094 8.56564 5.49362 7.91847 6.1129 7.73583C9.75739 6.59858 15.4441 6.83696 18.8222 8.83732C19.3802 9.17595 19.5476 9.90252 19.209 10.4605C18.8704 11.0184 18.1438 11.1859 17.5859 10.8473L17.9352 10.8964Z" />
  ),
  soundcloud: (
    <>
      <path d="M11 6L11 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10L6 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12L3 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6C16.7614 6 19 8.23858 19 11L19 15H22" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  headphones: (
    <path d="M3 14H5C5.55228 14 6 14.4477 6 15V19C6 19.5523 5.55228 20 5 20H3C2.44772 20 2 19.5523 2 19V15C2 14.4477 2.44772 14 3 14ZM21 14H19C18.4477 14 18 14.4477 18 15V19C18 19.5523 18.4477 20 19 20H21C21.5523 20 22 19.5523 22 19V15C22 14.4477 21.5523 14 21 14ZM12 2C7.58172 2 4 5.58172 4 10V14H8V10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V14H20V10C20 5.58172 16.4183 2 12 2Z" />
  ),
  // Interface elements
  filter: (
    <path d="M3 5H21M5 12H19M8 19H16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  sort: (
    <path d="M3 12H15M3 6H21M3 18H9" strokeLinecap="round" strokeLinejoin="round" />
  ),
  plus: (
    <path d="M12 5V19M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
  ),
  minus: (
    <path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
  ),
  close: (
    <path d="M6 18L18 6M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <path d="M5 13L9 17L19 7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  settings: (
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
  ),
  calendar: (
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  ),
  search: (
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  ),
  // Day icons
  thursday: (
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  ),
  friday: (
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
  ),
  saturday: (
    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
  ),
  sunday: (
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  ),
  special: (
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
  ),
  // Music service icons
  youtube: (
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
  ),
};

interface IconProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', onClick }) => {
  const { getIconClasses, iconSize } = useTheme();
  const iconClass = getIconClasses();
  
  // Fixed sizes that override the theme sizes when icons are too large
  const fixedSizes = {
    sm: 'w-3 h-3 text-xs',
    md: 'w-4 h-4 text-sm',
    lg: 'w-5 h-5 text-base',
  };
  
  // Use the fixed sizes to ensure icons aren't too large
  const sizeClass = fixedSizes[iconSize];
  const combinedClassName = `${sizeClass} ${className}`.trim();
  
  // Check if the icon exists
  if (!iconPaths[name]) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      className={combinedClassName}
      onClick={onClick}
      width={iconSize === 'sm' ? 16 : iconSize === 'md' ? 20 : 24} 
      height={iconSize === 'sm' ? 16 : iconSize === 'md' ? 20 : 24}
      style={{ maxWidth: '24px', maxHeight: '24px' }}
    >
      {iconPaths[name]}
    </svg>
  );
};

export default Icon;