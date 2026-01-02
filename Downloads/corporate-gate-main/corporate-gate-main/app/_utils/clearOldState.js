"use client";

/**
 * Utility to clear old/incompatible Redux persist state
 * Call this function if you encounter Redux state migration issues
 */
export const clearOldPersistedState = () => {
  try {
    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    
    // Find and remove redux-persist keys
    keys.forEach(key => {
      if (key.includes('persist:root') || key.includes('redux')) {
        localStorage.removeItem(key);
        console.log(`Removed old state: ${key}`);
      }
    });
    
    console.log('Old persisted state cleared successfully!');
    return true;
  } catch (error) {
    console.error('Error clearing old state:', error);
    return false;
  }
};

/**
 * Check if state needs to be cleared based on version
 */
export const checkAndClearState = () => {
  const CURRENT_VERSION = '1.0.0';
  const storedVersion = localStorage.getItem('app_version');
  
  if (storedVersion !== CURRENT_VERSION) {
    console.log('App version changed, clearing old state...');
    clearOldPersistedState();
    localStorage.setItem('app_version', CURRENT_VERSION);
  }
};

