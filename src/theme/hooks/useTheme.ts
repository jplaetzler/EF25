import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextBase';

export const useTheme = () => useContext(ThemeContext);