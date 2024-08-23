import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  keepUnusedDataFor: 60,
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
              { type: "Products", id: 1 },
            ]
          : [{ type: "Products", id: 1 }],
      keepUnusedDataFor: 10,
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
      keepUnusedDataFor: 10,
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
    getGoodsAll: build.mutation({
      query: () => ({
        url: `items`,
        method: "GET",
      }),
    }),
    getGoodsOffset: build.mutation({
      query: ({ categoryId, offset }) => ({
        url: `items?categoryId=${categoryId}&offset=${offset}`,
        method: "GET",
      }),
    }),
    getGoodsAllOffset: build.mutation({
      query: ({ offset }) => ({
        url: `items?offset=${offset}`,
        method: "GET",
      }),
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
  useGetGoodsAllMutation,
  useGetGoodsOffsetMutation,
  useGetGoodsAllOffsetMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = api;
