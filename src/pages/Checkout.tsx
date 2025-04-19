import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumbs } from "@/components/checkout/Breadcrumbs";
//import { useToast } from "@/hooks/use-toast";
import { CardContent, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brandNames } from "@/utils/consts";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, setOrderDetails } = useCart();
  const { user, isAuthenticated } = useAuth();
  //const { toast } = useToast();

  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddress || "",
    phone: user?.mobilePhone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
    }
  }, [isAuthenticated, navigate /* toast */]);

  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate("/products");
    }
  }, [items, navigate /* toast */]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderDetails({
      recipientFirstName: formState.firstName,
      recipientLastName: formState.lastName,
      recipientMobilePhone: formState.phone,
      recipientEircode: formState.zipCode,
      items: items.map((item) => ({
        productId: item.product.productId,
        quantity: item.quantity,
      })),
    });
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      navigate("/place-order");
      setIsLoading(false);
    }, 800);
  };

  const breadcrumbSteps = [
    { name: "Cart", href: "/cart", isCurrent: false },
    { name: "Checkout", href: "/checkout", isCurrent: true },
    { name: "Payment", href: "/place-order", isCurrent: false },
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

        <h1 className="text-3xl font-bold text-[#0A1E38] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form>
              <div className="space-y-8">
                {/* Contact Information */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formState.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formState.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formState.zipCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formState.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Methods */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                      Shipping Method
                    </h2>
                    <Tabs defaultValue="standard">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="standard">Standard</TabsTrigger>
                        <TabsTrigger value="express">Express</TabsTrigger>
                        <TabsTrigger value="overnight">Overnight</TabsTrigger>
                      </TabsList>
                      <TabsContent value="standard" className="pt-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-gray-500 text-sm">
                              Delivered in 5-7 business days
                            </p>
                          </div>
                          <p className="font-medium">Free</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="express" className="pt-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-gray-500 text-sm">
                              Delivered in 2-3 business days
                            </p>
                          </div>
                          <p className="font-medium">$9.99</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="overnight" className="pt-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Overnight Shipping</p>
                            <p className="text-gray-500 text-sm">
                              Delivered next business day
                            </p>
                          </div>
                          <p className="font-medium">$19.99</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className=" flex flex-col gap-2.5">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-[#0A1E38] mb-4">
                  Order Summary
                </h2>

                <div className="mb-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.productId}
                      className="flex justify-between items-start"
                    >
                      <div className="flex items-start">
                        <div className="relative">
                          <img
                            src={
                              // @ts-expect-error : Images array may be undefined
                              item?.product?.images?.[0]?.url ||
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
            <div className="flex justify-start">
              <Button
                onClick={handleSubmit}
                className="w-full md:w-auto bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
