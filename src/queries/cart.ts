import axios from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { userIdMock } from "~/mocks/data";

export function useCart() {
  return useQuery("cart", async () => {
    try {
      return await axios
        .get(`${API_PATHS.cart}/cart/${userIdMock}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        })
        .then((res) => res.data.data);
    } catch (error) {
      console.log(error);
    }
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) => {
    console.log("values", values);
    return axios.put<CartItem[]>(
      `${API_PATHS.cart}/cart/${userIdMock}`,
      values,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
  });
}

export function useDeleteCartItem() {
  return useMutation(async (productId: string) => {
    try {
      return await axios
        .delete(`${API_PATHS.cart}/cart/${productId}`)
        .then((res) => res.data);
    } catch (error) {
      console.log(error);
    }
  });
}
