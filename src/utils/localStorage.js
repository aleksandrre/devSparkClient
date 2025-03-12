/**
 * Get an item from localStorage
 *
 * @param {string} key - The key to get
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The value from localStorage, or defaultValue if not found
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage
 *
 * @param {string} key - The key to set
 * @param {*} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 *
 * @param {string} key - The key to remove
 * @returns {boolean} True if successful, false otherwise
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 *
 * @returns {boolean} True if successful, false otherwise
 */
export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
  clearAll,
};
