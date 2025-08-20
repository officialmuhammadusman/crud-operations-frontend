import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { initialProducts } from './initialProduct';

// Validate initialProducts to ensure unique, non-empty IDs
const validatedProducts = initialProducts.map(product => ({
  ...product,
  id: product.id && typeof product.id === 'string' ? product.id : uuidv4(),
}));

// Check for duplicate IDs
const idSet = new Set(validatedProducts.map(p => p.id));
if (idSet.size !== validatedProducts.length) {
  console.warn('Duplicate IDs found in initialProducts. Assigning new UUIDs.');
  validatedProducts.forEach((product, index) => {
    if (idSet.has(product.id)) {
      product.id = uuidv4();
    }
    idSet.add(product.id);
  });
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: validatedProducts,
    categories: ['Clothes', 'Watches', 'Shoes', 'Perfumes'],
    loading: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const { name, price, stock, category } = action.payload;
      // Validate required fields
      if (!name || !price || !stock || !category) {
        console.error('addProduct: Missing required fields', action.payload);
        return;
      }
      const newProduct = {
        ...action.payload,
        id: uuidv4(), // Generate unique ID
        rating: 0,
        reviews: 0,
        featured: false,
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    toggleFeatured: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.featured = !product.featured;
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, toggleFeatured } = productsSlice.actions;
export default productsSlice.reducer;