import * as postApi from "./post-api";

export const getAllPostsService = (authToken) => {
  return postApi.getAllPosts(authToken);
};

export const likePostService = (postId, authToken) => {
  return postApi.likePost(postId, authToken);
};

export const dislikePostService = (postId, authToken) => {
  return postApi.dislikePost(postId, authToken);
};

export const deletePostService = (postId, authToken) => {
  return postApi.deletePost(postId, authToken);
};

export const addCommentService = (postId, commentData, authToken) => {
  return postApi.addComment(postId, commentData, authToken);
};
