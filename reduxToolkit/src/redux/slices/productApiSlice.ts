import { apiSlice } from "./apiSlice";

interface Product {
    id: string,
    title: string,
    description: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({ 
            query: () => ({
                url: "",
                method: "GET"
            })
        })
    })
});

export const { useGetProductsQuery } = productApiSlice;
