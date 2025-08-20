// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';

// Persist data to localStorage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

// Load data from localStorage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
}

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState,
});

// Subscribe to changes
store.subscribe(() => saveToLocalStorage(store.getState()));
