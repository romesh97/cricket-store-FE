/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/services/productService";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { categoryNames, brandNames } from "@/utils/consts";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  // const { toast } = useToast();
  const [quantity, setQuantity] = useState<number>(
    items.find((item) => item.product.productId === id)?.quantity || 1
  );

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      // @ts-expect-error: Product type is not defined
      addToCart(product, quantity);
      toast("Product added to cart", {
        description: `${product.productName} has been added to your cart.`,
      });
    }
  };

  if (isLoading || !product) {
    return (
      <PageLayout>
        <div className="container px-4 mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const categoryName =
    categoryNames[product.productCategory] || "Unknown Category";
  const brandName = brandNames[product.productBrand] || "Unknown Brand";

  return (
    <PageLayout>
      <div className="container px-4 mx-auto py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-4 text-[#0A1E38] hover:text-[#145DA0]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <ProductImageGallery
            /*  @ts-ignore */
            images={product?.images || []}
            productName={product.productName}
          />

          {/* Product Info */}
          <div>
            <span className="inline-block bg-[#C39D63] text-black text-xs font-bold px-2 py-1 rounded mb-2">
              {categoryName}
            </span>
            <h1 className="text-3xl font-bold text-[#0A1E38] mb-2">
              {product?.productName}
            </h1>
            <p className="text-gray-600 mb-4">{brandName}</p>

            <p className="text-3xl font-bold text-[#0A1E38] mb-6">
              ${product.price}
            </p>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">{product.productDescription}</p>

              {/* Product attributes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.weight && (
                  <div>
                    <span className="text-sm text-gray-500">Weight</span>
                    <p className="font-medium">{product.weight} g</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-r-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="w-12 h-10 flex items-center justify-center font-medium">
                  {quantity}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-l-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1E38] mb-6">
            Product Details
          </h2>

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p className="text-gray-700">{product.productDescription}</p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#0A1E38] mb-2">
                    Product Information
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">{brandName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{categoryName}</span>
                    </li>

                    {product.weight && (
                      <li className="flex justify-between">
                        <span className="text-gray-600">Weight</span>
                        <span className="font-medium">{product.weight} g</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#0A1E38] mb-2">Materials</h3>
                  <p className="text-gray-700">
                    {product.productCategory === 1
                      ? "Made from premium grade English willow for exceptional performance."
                      : product.productCategory === 2
                      ? "Hand-stitched with premium leather for durability and consistent seam."
                      : product.productCategory === 3
                      ? "Constructed with premium leather and high-density foam padding for protection."
                      : "Built with lightweight materials and reinforced with impact-resistant padding."}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-4">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-2">Shipping</h3>
                <p className="text-gray-700">
                  We offer free standard shipping on all orders over $50. Orders
                  typically ship within 1-2 business days.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2">Returns</h3>
                <p className="text-gray-700">
                  If you're not completely satisfied with your purchase, you can
                  return it within 30 days for a full refund or exchange. The
                  product must be unused and in its original packaging.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
