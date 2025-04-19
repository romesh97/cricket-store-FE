import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    clearCart,
  } = useCart();
  // const { toast } = useToast();
  const navigate = useNavigate();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast("Item removed", {
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast("Cart cleared", {
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-3xl font-bold text-[#0A1E38] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container px-4 mx-auto py-8">
        <h1 className="text-3xl font-bold text-[#0A1E38] mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex border-b pb-4 mb-4 font-medium text-gray-600">
                  <div className="flex-1">Product</div>
                  <div className="w-32 text-center">Quantity</div>
                  <div className="w-24 text-right">Price</div>
                  <div className="w-24 text-right">Total</div>
                  <div className="w-24"></div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.productId}
                    className="flex flex-col md:flex-row items-start md:items-center py-4 border-b"
                  >
                    {/* Product */}
                    <div className="flex  w-2/4 items-center mb-4 md:mb-0">
                      <Link
                        to={`/product/${item.product.productId}`}
                        className="block mr-4 shrink-0"
                      >
                        <img
                          src={
                            // @ts-expect-error: Images array may be undefined
                            item?.product?.images?.[0]?.url ||
                            "https://m.media-amazon.com/images/I/71f0YCwN3sL._SL1500_.jpg"
                          }
                          alt={item?.product?.productName}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/product/${item.product.productId}`}
                          className="font-medium text-[#0A1E38] hover:text-[#145DA0]"
                        >
                          {item.product.productName}
                        </Link>

                        <p className="md:hidden text-[#0A1E38] font-medium mt-1">
                          ${item.product.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className=" w-28 flex items-start  justify-start mb-4 md:mb-0">
                      <div className="flex items-start border border-gray-300 rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="w-10 h-8 flex items-center justify-center font-medium">
                          {item.quantity}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product.productId,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden md:block w-24 text-right">
                      ${item.product.price}
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-end items-end  w-24 md:text-right font-medium">
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 ml-4"
                      onClick={() =>
                        handleRemoveItem(
                          item.product.productId,
                          item.product.productName
                        )
                      }
                      aria-label={`Remove ${item.product.productName} from cart`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/products")}
                    className="border-[#0A1E38]   "
                  >
                    Continue Shopping
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleClearCart}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#0A1E38] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="flex justify-between mb-6">
                <span className="text-gray-800 font-bold">Total</span>
                <span className="font-bold text-[#0A1E38]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
