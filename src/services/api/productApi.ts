import { Product, ProductResponse } from "@/types/product";
import { api } from "./baseApi";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductResponse, void>({
            query: () => ({
                url: '/products',
                method: 'GET',
            })
        }),
        fetchProductById: builder.query<Product, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            })
        })
    })
})

export const { useFetchProductsQuery, useFetchProductByIdQuery } = productApi;