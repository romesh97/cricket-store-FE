import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

type Image = {
  url: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
};

interface ProductImageGalleryProps {
  images: Image[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
        <img
          src={images[currentImage]?.url || "/placeholder.svg"}
          alt={`${productName} - Image ${currentImage + 1}`}
          className="w-full h-full object-contain"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow-md"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow-md"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "w-16 h-16 rounded-md overflow-hidden border-2",
                currentImage === index
                  ? "border-[#C39D63]"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setCurrentImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image?.url || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
