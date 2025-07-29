
const BASE_URL = 'https://dummyjson.com';

const handleError = async (res) => {
  let errorMessage = 'Something went wrong';
  try {
    const errorData = await res.json();
    errorMessage = errorData.message || errorMessage;
  } catch (_) {
  
    errorMessage = res.statusText || errorMessage;
  }
  throw new Error(errorMessage);
};

export const fetchUsers = async (limit = 30, skip = 0) => {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) await handleError(res);
  return res.json();
};

export const fetchAllPosts = async () => {
  let allPosts = [];
  let skip = 0;
  const limit = 300;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!res.ok) await handleError(res);
    const data = await res.json();
    allPosts = [...allPosts, ...data.posts];
    skip += limit;
    hasMore = data.posts.length === limit;
  }

  return { posts: allPosts };
};

export const fetchPost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) await handleError(res);
  return res.json();
};

export const getUserById = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) await handleError(res);
  return res.json();
};

export const getPostsByUserId = async (userId) => {
  const res = await fetch(`${BASE_URL}/posts/user/${userId}`);
  if (!res.ok) await handleError(res);
  return res.json();
};


