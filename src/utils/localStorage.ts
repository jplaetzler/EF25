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
    SORT_DIRECTION: 'ef_sort_direction',
    ACTIVE_TAB: 'ef_active_tab' // Add this new key
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
 * Migrates the selected artists from boolean values to string values
 * @returns A migrated record object with string values
 */
export const migrateSelectedArtists = (): Record<string, string> => {
    try {
        const serializedData = localStorage.getItem(STORAGE_KEYS.SELECTED_ARTISTS);
        if (serializedData === null) {
            return {};
        }

        const parsedData = JSON.parse(serializedData);
        const migratedData: Record<string, string> = {};

        // Check if we need to migrate (if any value is boolean)
        const needsMigration = Object.values(parsedData).some(value => typeof value === 'boolean');

        if (needsMigration) {
            console.log('Migrating selected artists from boolean to string format');

            Object.entries(parsedData).forEach(([artist, value]) => {
                // If the value is true, set it to "electric-magic"
                if (value === true) {
                    migratedData[artist] = 'electric-magic';
                }
                // If the value is already a string, keep it as is
                else if (typeof value === 'string' && value) {
                    migratedData[artist] = value;
                }
                // Otherwise, don't include it (it was false or empty)
            });

            // Save the migrated data back to localStorage
            localStorage.setItem(STORAGE_KEYS.SELECTED_ARTISTS, JSON.stringify(migratedData));
            return migratedData;
        }

        return parsedData;
    } catch (error) {
        console.error(`Error migrating selected artists: ${error}`);
        return {};
    }
};