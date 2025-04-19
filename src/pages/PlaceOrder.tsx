import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/checkout/Breadcrumbs";
import { brandNames } from "@/utils/consts";
import { CardContent, Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "@/services/orderService";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, orderDetails } = useCart();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (items.length === 0) {
      navigate("/products");
    }
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    }
    // Format expiry date with slash
    else if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }

      setCardDetails((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const orderPlaceMutation = useMutation({
    mutationFn: async () => {
      const orderDetailsToSend = {
        ...orderDetails,
      };
      return await checkout(orderDetailsToSend);
    },
    onSuccess: () => {
      toast("Order placed successfully You will receive an Email Shortly!");
      setTimeout(() => {
        navigate("/orders");
        clearCart();
        setIsProcessing(false);
      }, 3000);
    },
    onError: () => {
      toast("Failed to place order. Please try again.");
      setIsProcessing(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    orderPlaceMutation.mutate();
    toast("Order placed successfully!");
  };

  const breadcrumbSteps = [
    { name: "Cart", href: "/cart", isCurrent: false },
    { name: "Checkout", href: "/checkout", isCurrent: false },
    { name: "Payment", href: "/place-order", isCurrent: true },
  ];

  const getBrandName = (brandId: number) => {
    return brandNames[brandId] || "Unknown Brand";
  };

  return (
    <PageLayout>
      <div className="container px-4 mx-auto py-8">
        <div className="mb-8">
          <Breadcrumbs steps={breadcrumbSteps} />
        </div>

        <h1 className="text-3xl font-bold text-[#0A1E38] mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-[#0A1E38] mb-6">
                  Payment Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      placeholder="John Doe"
                      value={cardDetails.cardholderName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleChange}
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleChange}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 text-[#0A1E38] border-[#0A1E38]"
                      onClick={() => navigate("/checkout")}
                    >
                      Return to Shipping
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                    Secure Checkout
                  </h2>
                  <p className="text-gray-600">
                    Your payment information is encrypted and secure. We do not
                    store your credit card details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                  Order Summary
                </h2>

                <div className="mb-4 space-y-4">
                  {items?.map((item) => (
                    <div
                      key={item.product.productId}
                      className="flex justify-between items-start"
                    >
                      <div className="flex items-start">
                        <div className="relative">
                          <img
                            src={
                              // @ts-expect-error: Images array may be undefined
                              item.product.images?.[0]?.url ||
                              "/placeholder.svg"
                            }
                            alt={item.product.productName}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <span className="absolute -top-2 -right-2 bg-[#0A1E38] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium line-clamp-1">
                            {item.product.productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {getBrandName(item.product.productBrand)}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-[#0A1E38]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PlaceOrder;
