// This plugin ensures FormData is properly handled in both browser and Node.js
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(() => {
  // Only run this on client-side
  if (process.client) {
    // Use native FormData in browser
    if (typeof window !== 'undefined') {
      // No need to polyfill as modern browsers have FormData
      // Just ensure it's available in the global scope if needed
      if (!window.FormData) {
        console.warn('FormData is not available in this browser');
      }
    }
  }
});
