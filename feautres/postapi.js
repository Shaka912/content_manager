import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (userid) => `/posts/create?userid=${userid}`,
    }),
    searchTags: builder.query({
      query: ( tags,userid ) =>
        `posts/search?tags=${tags}&userid=${userid}`,
    }),
    searchSubreddit: builder.query({
      query: ( subreddit,userid ) =>
        `posts/search?subreddits=${subreddit}&userid=${userid}`,
    }),
    searchNotPosted: builder.query({
      query: (userid) =>
        `posts/search?userid=${userid}`,
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getTags: builder.query({
      query: (userid) => `/tags/create?userid=${userid}`,
    }),
    getSubreddit: builder.query({
      query: (userid) => `/subreddit/create?userid=${userid}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSearchTagsQuery,
  useSearchSubredditQuery,
  useSearchNotPostedQuery,
  useGetPostByIdQuery,
  useLoginUserMutation,
  useGetTagsQuery,
  useGetSubredditQuery
} = postsApi;
