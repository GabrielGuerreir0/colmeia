import { Cart } from "@/shared/types/cart";
import { mockUserCarts } from "@/shared/mock/userCart";
import { Product } from "@/shared/types/products";
import { getUser } from "@/shared/lib/cookies";

export const CartService = {
  getCart(): Cart {
    const user = getUser();
    if (!user) throw new Error("Usuário não autenticado");

    let userCart = mockUserCarts.find((uc) => uc.user.id === user.id);

    if (!userCart) {
      const newCart: Cart = { id: `cart_${user.id}`, items: [], total: 0 };
      mockUserCarts.push({
        user,
        cart: newCart,
      });
      userCart = { user, cart: newCart };
    }

    return userCart.cart;
  },

  addToCart(product: Product, quantity: number = 1) {
    const cart = this.getCart();
    const existing = cart.items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    this.updateTotal(cart);
    return cart;
  },

  removeFromCart(productId: string) {
    const cart = this.getCart();
    cart.items = cart.items.filter((item) => item.product.id !== productId);
    this.updateTotal(cart);
    return cart;
  },

  updateQuantity(productId: string, quantity: number) {
    const cart = this.getCart();
    cart.items = cart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.updateTotal(cart);
    return cart;
  },

  updateTotal(cart: Cart) {
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
  clearCart() {
    const cart = this.getCart();
    cart.items = [];
    cart.total = 0;
  },
};
