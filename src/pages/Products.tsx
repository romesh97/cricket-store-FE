/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Product } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { useQuery } from "@tanstack/react-query";
import { getByProductsFilter } from "@/services/productService";
import { useSearchParams } from "react-router-dom";
import { categoryNames, brandNames, styleNames } from "@/utils/consts";
import { ArrowLeft } from "lucide-react";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [styleId, setStyleId] = useState<number | null>(null);

  // Parse query parameters
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const style = searchParams.get("style");

  // Fetch products from API
  const { data: productsData } = useQuery({
    queryKey: ["products", category, brand, style],
    queryFn: () =>
      getByProductsFilter(
        category ? parseInt(category, 10) : 0,
        brand ? parseInt(brand, 10) : 0,
        style ? parseInt(style, 10) : 0
      ),
  });

  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const style = searchParams.get("style");

    if (category) setCategoryId(parseInt(category, 10));
    if (brand) setBrandId(parseInt(brand, 10));
    if (style) setStyleId(parseInt(style, 10));

    // If no parameters, redirect to category selection
    if (!category && !brand) {
      navigate("/category-selection");
    }
  }, [location, navigate]);

  // Filter products based on selected filters
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // For demo purposes, we're just filtering randomly
      // In a real app, this would use real filter logic based on the API data
      let filtered = [...products];

      if (categoryId || brandId || styleId) {
        // Just apply a random filter to simulate different results
        filtered = filtered.filter(
          (_, index) => index % (categoryId || 2) === 0
        );
      }

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 800);
  }, [categoryId, brandId, styleId]);

  const getCategoryName = () => {
    return categoryId
      ? categoryNames[categoryId] || "Products"
      : "All Products";
  };

  const getBrandName = () => {
    return brandId ? brandNames[brandId] || "All Brands" : "All Brands";
  };

  const getStyleName = () => {
    return categoryId === 3
      ? styleId
        ? styleNames[styleId] || "All Styles"
        : "All Styles"
      : "";
  };

  const filteredProductData = productsData?.filter((product) => {
    if (!searchParams.get("search")) return true;

    const search = searchParams.get("search")?.toLowerCase() || "";
    return product.productName.toLowerCase().includes(search);
  });

  return (
    <PageLayout>
      {/* Banner Section */}
      <div className="relative w-full h-80 bg-[#0A1E38] overflow-hidden mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {getCategoryName()}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Browse our selection of {getBrandName()} {getCategoryName()} for{" "}
                {getStyleName()} players
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <Button
                  onClick={() => navigate("/category-selection")}
                  className="bg-[#C39D63] hover:bg-yellow-600 text-black"
                >
                  Change Category
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/brand-selection?category=${categoryId}`)
                  }
                  className="bg-[#C39D63] hover:bg-yellow-600 text-black"
                >
                  Change Brand
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="mb-4 text-[#0A1E38] hover:text-[#145DA0]"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Brands
      </Button>
      <div className="container px-4 mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1E38] mb-2">
              {getCategoryName()} - {getBrandName()} - {getStyleName()}
            </h2>
            <p className="text-gray-600">
              {/*    // @ts-ignore */}
              {productsData?.length} products found
            </p>
          </div>
        </div>

        <ProductGrid
          // @ts-ignore
          products={filteredProductData || []}
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  );
};

export default Products;
