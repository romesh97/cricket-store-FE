import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/services/orderService";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch order details
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId && isAuthenticated,
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const renderOrderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "processing":
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-800">
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-[#0A1E38] hover:text-[#145DA0]"
          onClick={() => navigate("/orders")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0A1E38] mb-2">
              Order #{orderId?.slice(0, 8)}
            </h1>
            {order && (
              <p className="text-gray-600">
                Placed on {format(new Date(order.createdAt), "MMMM dd, yyyy")}
              </p>
            )}
          </div>

          {order && renderOrderStatus(order.status)}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                  An error occurred while loading the order details.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : order ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Items</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-start py-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                            {item.product.images &&
                            item.product.images.length > 0 ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.productName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="ml-4 flex-grow">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-medium text-[#0A1E38] hover:text-[#145DA0]"
                            >
                              {item.product.productName}
                            </Link>
                            <div className="mt-1 flex justify-between">
                              <div className="text-sm text-gray-600">
                                Qty: {item.quantity}
                              </div>
                              <div className="font-medium">
                                €{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {index < order.items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>€{order.totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>€0.00</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>Included</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[#0A1E38]">
                        €{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {order.status.toLowerCase() === "pending" && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Cancel Order
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Order not found.</p>
                <Button
                  onClick={() => navigate("/orders")}
                  className="bg-[#0A1E38] hover:bg-[#0A1E38]"
                >
                  Back to Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default OrderDetail;
