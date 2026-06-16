import { apiSlice } from "./apiSlice";

export interface Product {
    title: string,
    description: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ products: Product[] }, void>({
            query: () => ({
                url: "",
                method: "GET"
            })
        }),
        addProduct: builder.mutation({
            query: (product: Product) => ({
                url: "/add",
                method: "POST",
                body: product
            })
        }),
        updateProduct: builder.mutation({
            query: (data: { id: number, product: Product }) => (
                {
                    url: `/update_product/${data.id}`,
                    method: "PUT",
                    body: data.product
                }
            )
        }),
        deleteProduct: builder.mutation({
            query: (id: number) => ({
                url: `/delete_product/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApiSlice;
