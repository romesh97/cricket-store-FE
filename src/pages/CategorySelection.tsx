import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imageArray = [
  "https://th.bing.com/th/id/R.89f88e2376c3a67d0996b2eaf75f0f69?rik=3b1mgv%2bI7wOtrA&pid=ImgRaw&r=0",
  "https://essexcricket.org.uk/wp-content/uploads/2016/09/shop-picture.jpg",
  "https://www.mrcrickethockey.com/wp-content/uploads/2014/02/Merrick-2-72dpi.jpg",
  "https://s3-media0.fl.yelpcdn.com/bphoto/PoYjTeT-Jmf6p5P2mIfHqw/l.jpg",
  "https://images.squarespace-cdn.com/content/v1/5f07a8beb3694b3282c47c14/1595996150212-LZR4289R08OKE368KU4P/Interior-34.jpg?format=1000w",
];

const categories = [
  {
    id: 1,
    name: "Bats",
    image:
      "https://wallpapers.com/images/featured/cricket-bat-png-ety5zpeoyber9wbk.jpg",
    description: "Premium cricket bats for all skill levels",
  },
  {
    id: 2,
    name: "Balls",
    image:
      "https://th.bing.com/th/id/R.fa9bdffcc130fd3edaeef0d5090d1edb?rik=PS92WdRl%2bW%2bQeg&pid=ImgRaw&r=0",
    description: "Match and practice balls for all formats",
  },
  {
    id: 3,
    name: "Gloves",
    image:
      "https://th.bing.com/th/id/OIP.JlaDFCNShDMBPp-cMIvCWwHaHa?rs=1&pid=ImgDetMain",
    description: "Protective and comfortable batting gloves",
  },
  {
    id: 4,
    name: "Pads",
    image:
      "https://www.marscricket.co.uk/wp-content/uploads/2018/11/boys-pads.jpg",
    description: "Lightweight and durable batting pads",
  },
  {
    id: 5,
    name: "Helmets",
    image:
      "https://th.bing.com/th/id/OIP.PZAq8opXkuHlZWxPXrD_kAHaHa?rs=1&pid=ImgDetMain",
    description: "Safety first with premium cricket helmets",
  },
  {
    id: 6,
    name: "Shoes",
    image:
      "https://blog.sixescricket.com/wp-content/uploads/2023/11/The-Cricket-Shoes.png",
    description: "Safety first with premium cricket shoes",
  },
  {
    id: 7,
    name: "Jersey",
    image:
      "https://th.bing.com/th/id/OIP.tr89u8Qyrnae_b9FVoy1tQHaHa?w=700&h=700&rs=1&pid=ImgDetMain",
    description: "Safety first with premium cricket Jersey",
  },
  {
    id: 8,
    name: "Stumps",
    image:
      "https://th.bing.com/th/id/R.7fb91646096a59140fb62dec529f0393?rik=MAV5%2bdOelhFfTw&pid=ImgRaw&r=0",
    description: "Match standard stumps and bails",
  },
  {
    id: 9,
    name: "bags",
    image:
      "https://th.bing.com/th/id/OIP.hQxwZmzLVY1YaeXFiwCZdQHaFj?rs=1&pid=ImgDetMain",
    description: "Match standard bags",
  },
];

const CategorySelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/brand-selection?category=${categoryId}`);
  };

  const filteredCategories = categories.filter((category) => {
    if (!searchParams.get("search")) return true;

    const search = searchParams.get("search")?.toLowerCase() || "";
    return (
      category.name.toLowerCase().includes(search) ||
      category.description.toLowerCase().includes(search)
    );
  });

  return (
    <PageLayout>
      {/* Banner Section */}
      <div className="relative w-full h-90 overflow-hidden pb-5 mb-10">
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full h-full mx-auto max-w-5xl"
        >
          <CarouselContent>
            {imageArray.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full">
                  <Card className="w-full h-full shadow-none  text-white">
                    <CardContent className=" ">
                      <img
                        src={image}
                        alt={`carousel-image-${index}`}
                        className="w-full h-full object-cover position-static rounded-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#0A1E38] mb-8 text-center">
          Select a Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden gap-0 hover:shadow-lg pt-0 pb-3 transition-shadow cursor-pointer hover:border-[#0A1E38]"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-[#0A1E38] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <p className="text-center text-lg text-gray-500">
                No categories found.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategorySelection;
