import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categoryNames } from "@/utils/consts";

const brands = [
  {
    id: 1,
    name: "Gunn & Moore",
    image:
      "https://djsports.co.uk/wp-content/uploads/2020/06/Gunn-Moore-600x509.jpg",
    description: "Legendary cricket equipment since 1855",
  },
  {
    id: 2,
    name: "SG",
    image:
      "https://th.bing.com/th/id/OIP.QRvE3GseXmghet4q5TdZgAHaHa?rs=1&pid=ImgDetMain",
    description: "Innovative cricket gear for all players",
  },
  {
    id: 3,
    name: "Kookaburra",
    image:
      "https://th.bing.com/th/id/OIP.H8KEAQG6Wlt-0pxQmjKxNQHaHa?rs=1&pid=ImgDetMain",
    description: "Trusted by professionals worldwide",
  },
  {
    id: 4,
    name: "Gray-Nicolls",
    image:
      "https://www.gray-nicolls.co.uk/cdn/shop/files/Gray_Nicolls_Secondary_Logo_-no_background.png?v=1695809192&width=960",
    description: "Quality cricket gear for all levels",
  },
  {
    id: 5,
    name: "New Balance",
    image:
      "https://th.bing.com/th/id/R.e5dcd72d3c218baba6b46e2078af9a9f?rik=3k0BNdq7JzpDKg&pid=ImgRaw&r=0",
    description: "Innovation meets performance",
  },
  {
    id: 6,
    name: "MRF",
    image:
      "https://th.bing.com/th/id/R.30f4c4efd122301376e93222410f66b5?rik=gTxdA1k34cFvBA&pid=ImgRaw&r=0",
    description: "World-class cricket bats and gear",
  },
  {
    id: 6,
    name: "Spartan",
    image:
      "https://th.bing.com/th/id/OIP.-JsGkbBMP1K-CPW6Ax0Y6wHaHa?rs=1&pid=ImgDetMain",
    description: "Superior quality sports equipment",
  },
];

const BrandSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    if (category) {
      setCategoryId(parseInt(category, 10));
    } else {
      // If no category selected, redirect back to category selection
      navigate("/category-selection");
    }
  }, [location, navigate]);

  const handleBrandSelect = (brandId: number) => {
    //Only styles appy for BATS AND GLOVES
    if (categoryId === 3) {
      navigate(`/style-selection?category=${categoryId}&brand=${brandId}`);
    } else {
      navigate(`/products?category=${categoryId}&brand=${brandId}`);
    }
  };

  const getCategoryName = () => {
    return categoryId ? categoryNames[categoryId] || "Products" : "Products";
  };

  const filteredBrands = brands.filter((brand) => {
    if (!searchParams.get("search")) return true;

    const search = searchParams.get("search")?.toLowerCase() || "";
    return (
      brand.name.toLowerCase().includes(search) ||
      brand.description?.toLowerCase().includes(search) ||
      false
    );
  });

  return (
    <PageLayout>
      {/* Banner Section */}
      <div className="relative w-full h-80 bg-[#0A1E38] overflow-hidden mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full">
            <div className="container mx-auto px-4 text-center">
              <div className="text-sm text-gray-300 mb-2">
                Category: <span className="font-bold">{getCategoryName()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your Brand
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Select from our collection of premium cricket brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0A1E38] mb-8 text-center">
          Select a Brand for {getCategoryName()}
        </h2>

        <Button
          variant="outline"
          className="mb-8 border-[#0A1E38] text-[#0A1E38] hover:bg-[#0A1E38] hover:text-white"
          onClick={() => navigate("/category-selection")}
        >
          Back to Categories
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBrands.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
              <p className="text-gray-500">No brands found</p>
            </div>
          ) : (
            filteredBrands.map((brand) => (
              <Card
                key={brand.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:border-[#0A1E38]"
                onClick={() => handleBrandSelect(brand.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-[#0A1E38] mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{brand.description}</p>
                  {/* <Button
                    variant="outline"
                    className="w-full border-[#0A1E38] text-[#0A1E38] hover:bg-[#0A1E38] hover:text-white"
                    onClick={() => handleBrandSelect(brand.id)}
                  >
                    Select
                  </Button> */}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BrandSelection;
