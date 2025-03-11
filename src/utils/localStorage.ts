/**
 * Utility functions for interacting with localStorage
 */

// Constants for localStorage keys
export const STORAGE_KEYS = {
    SELECTED_ARTISTS: 'ef_selected_artists',
    FILTER: 'ef_filter',
    CATEGORY: 'ef_category',
    DAY: 'ef_day',
    SORT_BY: 'ef_sort_by',
    SORT_DIRECTION: 'ef_sort_direction'
};

/**
 * Save data to localStorage
 * @param key The key to save under
 * @param data The data to save
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
    }
};

/**
 * Load data from localStorage
 * @param key The key to load
 * @param defaultValue Default value if key doesn't exist
 * @returns The loaded data or defaultValue if not found
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return defaultValue;
        }
        return JSON.parse(serializedData) as T;
    } catch (error) {
        console.error(`Error loading from localStorage: ${error}`);
        return defaultValue;
    }
};

/**
 * Remove an item from localStorage
 * @param key The key to remove
 */
export const removeFromLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
    }
};

/**
 * Clear all app localStorage items
 */
export const clearAllAppData = (): void => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error(`Error clearing app data from localStorage: ${error}`);
    }
};