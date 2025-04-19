import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categoryNames, brandNames } from "@/utils/consts";

const styles = [
  {
    id: 1,
    name: "Left Handed",
    image:
      "https://th.bing.com/th/id/OIP.jyR2XzQRGsFnZctDpyn00AHaHa?rs=1&pid=ImgDetMain",
    description: "For left handed players",
  },
  {
    id: 2,
    name: "Right Handed",
    image:
      "https://th.bing.com/th/id/OIP.bitL6HXNbTNhS0lUzGrbtgHaHa?rs=1&pid=ImgDetMain",
    description: "For right handed players",
  },
];

const StyleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    if (category && brand) {
      setCategoryId(parseInt(category, 10));
      setBrandId(parseInt(brand, 10));
    } else {
      // If missing parameters, redirect back
      navigate("/category-selection");
    }
  }, [location, navigate]);

  const handleStyleSelect = (styleId: number) => {
    if (categoryId && brandId) {
      navigate(
        `/products?category=${categoryId}&brand=${brandId}&style=${styleId}`
      );
    }
  };

  const getCategoryName = () => {
    return categoryId ? categoryNames[categoryId] || "Products" : "Products";
  };

  const getBrandName = () => {
    return brandId ? brandNames[brandId] || "Brand" : "Brand";
  };

  return (
    <PageLayout>
      {/* Banner Section */}
      <div className="relative w-full h-80 bg-[#0A1E38] overflow-hidden mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full">
            <div className="container mx-auto px-4 text-center">
              <div className="text-sm text-gray-300 mb-2">
                <span className="font-bold">{getCategoryName()}</span> /{" "}
                <span className="font-bold">{getBrandName()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your Style
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Select the perfect style for your needs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0A1E38] mb-8 text-center">
          Select a Style for {getBrandName()} {getCategoryName()}
        </h2>

        <div className="flex space-x-4 mb-8">
          <Button
            variant="outline"
            className="border-[#0A1E38] text-[#0A1E38] hover:bg-[#0A1E38] hover:text-white"
            onClick={() => navigate("/category-selection")}
          >
            Back to Categories
          </Button>

          <Button
            variant="outline"
            className="border-[#0A1E38] text-[#0A1E38] hover:bg-[#0A1E38] hover:text-white"
            onClick={() => navigate(`/brand-selection?category=${categoryId}`)}
          >
            Back to Brands
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style) => (
            <Card
              key={style.id}
              className="overflow-hidden hover:shadow-lg pt-0 pb-2 gap-2 transition-shadow cursor-pointer hover:border-[#0A1E38]"
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-[#0A1E38] mb-2">
                  {style.name}
                </h3>
                <p className="text-gray-600 mb-4">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default StyleSelection;
