import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sliceMagRTK = createApi({
  reducerPath: "sliceMagRTK",
  tagTypes: ["Products", "Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backdiplomra67.axareact.ru/api/",
  }),
  endpoints: (build) => ({
    getTopSales: build.query({
      query: () => "top-sales",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getCat: build.query({
      query: () => "categories",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories", id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getGoods: build.mutation({
      query: (id) => ({
        url: `items?categoryId=${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // addProduct: build.mutation({
    //   query: (body) => ({
    //     url: "goods",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Products", id: "LIST" }],
    // }),
    // deleteProduct: build.mutation({
    //   query: (id) => ({
    //     url: `goods/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Products", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetTopSalesQuery,
  useGetCatQuery,
  useGetGoodsMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = sliceMagRTK;
