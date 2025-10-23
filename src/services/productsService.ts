import { mockProducts } from "@/shared/mock/products";
import { Product } from "@/shared/types/products";

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getProductById(productId: string): Promise<Product> {
  const product = mockProducts.find((p) => p.id === productId);
  return product!;
}
