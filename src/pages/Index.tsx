import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Carousel } from "@/components/ui/carousel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFeaturedProducts, getProductsByCategory } from "@/data/products";

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Carousel */}
      <section className="mb-12">
        <Carousel />
      </section>

      {/* Featured Products */}
      <section className="container px-4 mx-auto mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1E38]">
            Featured Products
          </h2>
          <Button
            variant="outline"
            className="border-[#0A1E38] text-[#0A1E38] hover:bg-[#0A1E38] hover:text-white"
            onClick={() => navigate("/category-selection")}
          >
            Browse Categories
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Tabbed Products */}
      <section className="container px-4 mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A1E38] mb-8">
          Shop By Category
        </h2>

        <Tabs defaultValue="bats" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="bats">Bats</TabsTrigger>
            <TabsTrigger value="balls">Balls</TabsTrigger>
            <TabsTrigger value="gloves">Gloves</TabsTrigger>
            <TabsTrigger value="pads">Pads</TabsTrigger>
          </TabsList>

          <TabsContent value="bats">
            <ProductGrid products={getProductsByCategory("bats")} />
          </TabsContent>

          <TabsContent value="balls">
            <ProductGrid products={getProductsByCategory("balls")} />
          </TabsContent>

          <TabsContent value="gloves">
            <ProductGrid products={getProductsByCategory("gloves")} />
          </TabsContent>

          <TabsContent value="pads">
            <ProductGrid products={getProductsByCategory("pads")} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Promotion Banner */}
      <section className="bg-[#0A1E38] py-16 mb-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium Cricket Equipment
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover professional-grade cricket gear trusted by players
            worldwide. Elevate your game with our quality equipment.
          </p>
          <Button
            className="bg-[#C39D63] hover:bg-yellow-600 text-black text-lg px-8 py-6"
            onClick={() => navigate("/category-selection")}
          >
            Shop Now
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
