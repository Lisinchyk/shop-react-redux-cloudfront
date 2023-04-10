import { useAvailableProducts } from "~/queries/products";
import { useCart } from "~/queries/cart";

export const useCombinedProductCart = () => {
  const { data: products = [] } = useAvailableProducts();
  const { data: carts = [], isLoading } = useCart();
  const cartItems = carts.cart?.items;

  const combinedData = cartItems?.reduce((cart: any, item: any) => {
    const product = products?.find((p) => p.id === item?.product_id);
    if (product) {
      cart.push({
        count: item.count,
        product,
      });
    }
    return cart;
  }, []);

  console.log("combinedData", combinedData);

  return { combinedData, isLoading };
};
