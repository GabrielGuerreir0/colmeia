"use client";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/services/productsService";
import { Product } from "@/shared/types/products";

const mockProducts = await getProducts();

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#11286b]">
        Nossos Produtos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:pl-20 lg:pr-20 gap-5">
        {mockProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
