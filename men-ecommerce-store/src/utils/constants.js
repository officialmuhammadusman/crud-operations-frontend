import { Shirt, Watch, Footprints, Sparkles, Package } from 'lucide-react';


export const CATEGORIES = {
  'Clothes': ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Suits', 'Casual Wear'],
  'Watches': ['Luxury', 'Sport', 'Digital', 'Analog', 'Smart Watch', 'Classic'],
  'Shoes': ['Sneakers', 'Formal', 'Sports', 'Casual', 'Boots', 'Sandals'],
  'Perfumes': ['Cologne', 'Deodorant', 'Parfum', 'Body Spray', 'Aftershave', 'Gift Sets']
};

export const SORT_OPTIONS = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'stock', label: 'Stock: High to Low' },
  { value: 'rating', label: 'Rating: High to Low' }
];

export const STOCK_STATUS = {
  OUT_OF_STOCK: 0,
  LOW_STOCK: 10,
  MEDIUM_STOCK: 25
};



export const getCategoryIcon = (category) => {
  switch (category) {
    case 'Clothes': return Shirt;
    case 'Watches': return Watch;
    case 'Shoes': return Footprints;
    case 'Perfumes': return Sparkles;
    default: return Package;
  }
};



export const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

export const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const categories = {
  'Clothes': ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Suits', 'Casual Wear'],
  'Watches': ['Luxury', 'Sport', 'Digital', 'Analog', 'Smart Watch', 'Classic'],
  'Shoes': ['Sneakers', 'Formal', 'Sports', 'Casual', 'Boots', 'Sandals'],
  'Perfumes': ['Cologne', 'Deodorant', 'Parfum', 'Body Spray', 'Aftershave', 'Gift Sets']
};