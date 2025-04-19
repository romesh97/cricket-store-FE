import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../contexts/CartContext";
import { categoryNames, brandNames } from "../../utils/consts";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const categoryName = categoryNames[product.productCategory];
  const brandName = brandNames[product.productBrand];

  return (
    <Link to={`/product/${product.productId}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <img
            // @ts-ignore
            src={product?.images?.[0]?.url || "/placeholder.svg"}
            alt={product?.productName}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-[#C39D63] text-black text-xs font-bold px-2 py-1 rounded">
              {categoryName?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-2 flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {product?.productName}
            </h3>
            <p className="text-sm text-gray-500">{brandName}</p>
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className="text-xl font-bold text-[#0A1E38]">
              ${product?.price}
            </span>

            {/*  <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-[#0A1E38] hover:bg-[#0A1E38] text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button> */}
          </div>
        </div>
      </div>
    </Link>
  );
};
