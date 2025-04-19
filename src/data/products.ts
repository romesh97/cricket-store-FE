import { Product } from "../contexts/CartContext";

export const products: Product[] = [
  {
    id: "d036a51b-c976-4d30-82b9-095b3be7c7fd",
    name: "Kookaburra Kahuna Pro",
    price: 299.99,
    category: "bats",
    brand: "Kookaburra",
    size: "SH",
    weight: "2lb 8oz",
    style: "right",
    description:
      "Premium cricket bat made from Grade 1 English Willow. Perfect for professional players seeking power and precision.",
    images: [
      "/lovable-uploads/f32295f0-42a8-4ec5-8222-4441e32adb06.png",
      "/placeholder.svg",
    ],
  },
  {
    id: "00aa6997-0e6a-4a65-92ff-cba081f2e753",
    name: "Gray-Nicolls Predator3",
    price: 249.99,
    category: "bats",
    brand: "Gray-Nicolls",
    size: "SH",
    weight: "2lb 9oz",
    style: "right",
    description:
      "The Predator3 features an imposing profile with an expanded sweet spot for maximum power hitting.",
    images: ["/placeholder.svg"],
  },
  {
    id: "411ad27a-3d94-4d4d-b570-1435589e28ed",
    name: "SS Ton Player Edition",
    price: 329.99,
    category: "bats",
    brand: "SS",
    size: "SH",
    weight: "2lb 7oz",
    style: "right",
    description:
      "Handcrafted premium bat used by international players. Exceptional pickup and balance.",
    images: ["/placeholder.svg"],
  },
  {
    id: "cd7ec87a-09cf-448e-a272-8a2dd2a9624a",
    name: "Kookaburra Regulation Ball",
    price: 24.99,
    category: "balls",
    brand: "Kookaburra",
    description:
      "Official red cricket ball with traditional 5-layer quilted center. Used in international matches.",
    images: ["/placeholder.svg"],
  },
  {
    id: "879f0bfa-d1db-40a1-9cb6-8f78b926152a",
    name: "Duke County Special Ball",
    price: 22.99,
    category: "balls",
    brand: "Duke",
    description:
      "Hand-stitched cricket ball with superior seam. Perfect for county matches.",
    images: ["/placeholder.svg"],
  },
  {
    id: "45aef2a7-ce5b-4816-abfc-84a606954b56",
    name: "GM Original Batting Gloves",
    price: 49.99,
    category: "gloves",
    brand: "Gunn & Moore",
    size: "Adult",
    description:
      "Premium batting gloves with tri-layer padding for ultimate protection. Featuring enhanced flexibility.",
    images: ["/placeholder.svg"],
  },
  {
    id: "gloves-2",
    name: "Kookaburra Pro 1000 Gloves",
    price: 59.99,
    category: "gloves",
    brand: "Kookaburra",
    size: "Adult",
    description:
      "Top-of-the-line batting gloves with reinforced finger protection and leather palm.",
    images: ["/placeholder.svg"],
  },
  {
    id: "e782d529-b972-4976-acd5-c8b7c7cbd878",
    name: "Gray-Nicolls Legend Pads",
    price: 79.99,
    category: "pads",
    brand: "Gray-Nicolls",
    size: "Adult",
    description:
      "Lightweight yet protective batting pads with ergonomic design for maximum mobility.",
    images: ["/placeholder.svg"],
  },
  {
    id: "pads-2",
    name: "Kookaburra Pro 1000 Pads",
    price: 89.99,
    category: "pads",
    brand: "Kookaburra",
    size: "Adult",
    description:
      "High-performance batting pads with innovative cane reinforcement and soft knee bolsters.",
    images: ["/placeholder.svg"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (
  category: Product["category"]
): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  // Return a mix of products from different categories
  return [
    products.find((p) => p.id === "bat-1")!,
    products.find((p) => p.id === "gloves-1")!,
    products.find((p) => p.id === "ball-1")!,
    products.find((p) => p.id === "pads-1")!,
  ];
};

// Banner data for the carousel
export type Banner = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export const banners: Banner[] = [
  {
    id: "banner-1",
    title: "New Season Collection",
    description: "Discover the latest cricket equipment for the new season",
    image: "/lovable-uploads/668e0f53-3b89-4d63-a681-3fc12bb7ad77.png",
    link: "/products",
  },
  {
    id: "banner-2",
    title: "Professional Grade Bats",
    description: "Handcrafted willow bats for the serious cricketer",
    image: "/lovable-uploads/d5719b2a-cb9f-4022-b404-9135670dedda.png",
    link: "/products",
  },
  {
    id: "banner-3",
    title: "Premium Protection Gear",
    description:
      "Stay safe on the pitch with our high-quality protective equipment",
    image: "/lovable-uploads/6eb5f260-533d-4f81-8e00-d51bc70de75c.png",
    link: "/products",
  },
];
