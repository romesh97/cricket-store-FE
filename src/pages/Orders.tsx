import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Package, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getUserOrders } from "@/services/orderService";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch orders
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
    enabled: isAuthenticated,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0A1E38] mb-8">My Orders</h1>

        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                  An error occurred while loading your orders.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : orders && orders.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {orders.map((order) => (
              <Card
                key={order.orderId}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Package className="h-5 w-5 text-[#0A1E38] mr-2" />
                        <span className="font-medium">
                          Order #{order.orderId}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Placed on{" "}
                        {format(new Date(order.createdAt), "MMMM dd, yyyy")}
                      </p>
                      <p className="font-medium text-[#0A1E38]">
                        ${order?.total}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center">
                      {order.orderToProducts.length > 0 && (
                        <div>
                          {order.orderToProducts.map((product) => (
                            <div key={product.orderToProductId}>
                              <p className="font-medium">
                                {product.product.productName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {product.quantity}
                              </p>
                              <p className="text-sm text-gray-600">
                                Price: $
                                {parseFloat(
                                  product.product.price.toString()
                                ).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="mb-2">No orders yet</CardTitle>
              <CardDescription className="mb-6">
                You haven't placed any orders yet.
              </CardDescription>
              <Button
                onClick={() => navigate("/products")}
                className="bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Orders;
