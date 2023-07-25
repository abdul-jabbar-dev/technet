import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  reducerPath: 'productApi',
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),

    getAProduct: builder.query({
      query: (id: string) => '/product/' + id,
    }),

    sendComment: builder.mutation({
      query: ({ id, body }) => ({
        url: '/comment/' + id,
        method: 'POST',
        body: { comment: body },
      }),
    }),
    getComment: builder.query({
      query: (id: string) =>{
        console.log(id)
        return '/comment/' + id
      }
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAProductQuery,
  useSendCommentMutation,
  useGetCommentQuery
} = api;
