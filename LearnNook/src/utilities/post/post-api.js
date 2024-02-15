const BASE_URL = "/api/post"; // Adjusted to your provided BASE_URL

// Fetch all posts
export const getAllPosts = async (authToken) => {
  const response = await fetch(`${BASE_URL}/getall`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
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
