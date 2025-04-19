import React, { createContext, useContext, useState, useEffect } from "react";

// Product type
export type Product = {
  productId: string;
  productName: string;
  price: number;
  productCategory: number;
  productBrand: number;
  description: string;
  size?: string;
  weight?: string;
  images?: string[];
  productStyle?: number;
};

// Cart Item type
export type CartItem = {
  product: Product;
  quantity: number;
};

export type itemToShip = {
  productId: string;
  quantity: number;
};

export type OrderDetails = {
  recipientFirstName: string;
  recipientLastName: string;
  recipientMobilePhone: string;
  recipientEircode: string;
  items: itemToShip[];
};

// Cart context type
type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalCost: number;
  setTotalCost: (cost: number) => void;
  shippingCost: number;
  setShippingCost: (cost: number) => void;
  orderDetails: OrderDetails;
  setOrderDetails: (details: OrderDetails) => void;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    recipientFirstName: "",
    recipientLastName: "",
    recipientMobilePhone: "",
    recipientEircode: "",
    items: [],
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Add product to cart
  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.productId === product.productId
      );

      if (existingItemIndex > -1) {
        // If item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity;
        return updatedItems;
      } else {
        // Otherwise add new item
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.productId !== productId)
    );
  };

  // Update quantity of item in cart
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total items in cart
  const totalItems = items.length;

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalCost = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalCost,
        shippingCost,
        setShippingCost,
        setTotalCost: (cost: number) => {
          setShippingCost(cost);
        },
        orderDetails,
        setOrderDetails: (details: OrderDetails) => {
          setOrderDetails(details);
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
