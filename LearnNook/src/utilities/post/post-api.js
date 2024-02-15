const BASE_URL = "/api/post"; // Adjusted to your provided BASE_URL

// Fetch all posts
// Adjusted fetch call without authToken
export const getAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/getall`);
  if (!response.ok) throw new Error("Network response was not ok.");
  return response.json();
};

// Like a post
export const likePost = async (postId, authToken) => {
  await fetch(`${BASE_URL}/like/${postId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

// Dislike a post
export const dislikePost = async (postId, authToken) => {
  await fetch(`${BASE_URL}/dislike/${postId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

// Delete a post
export const deletePost = async (postId, authToken) => {
  await fetch(`${BASE_URL}/remove/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

// Add a comment to a post
export const addComment = async (postId, commentData, authToken) => {
  const response = await fetch(`${BASE_URL}/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(commentData),
  });
  return response.json();
};
