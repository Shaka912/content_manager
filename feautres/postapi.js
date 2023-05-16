import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/create",
    }),
    searchTags: builder.query({
      query: ( tags ) =>
        `posts/search?tags=${tags}`,
    }),
    searchSubreddit: builder.query({
      query: ( subreddit ) =>
        `posts/search?subreddits=${subreddit}`,
    }),
    searchNotPosted: builder.query({
      query: () =>
        'posts/search',
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
      query: () => "/tags/create",
    }),
    getSubreddit: builder.query({
      query: () => "/subreddit/create",
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
