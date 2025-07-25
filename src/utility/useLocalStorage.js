export const saveUserCredential = (newUser) => {
  const existingUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];

  const isAlreadyRegistered = existingUsers.some(
    (user) => user.email === newUser.email
  );

  if (isAlreadyRegistered) {
    return {
      message: (
        <span className="text-red-500">
          User Register Already With This Email
        </span>
      ),
      success: false,
    };
  }

  const updatedUsers = [...existingUsers, newUser];

  localStorage.setItem("usersInfo", JSON.stringify(updatedUsers));

  return {
    message: <span className="text-green-500">Registered successfully</span>,
    success: true,
  };
};

export const getUserCredentials = (email, password) => {
  const existingUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];

  const user = existingUsers.find((user) => user.email === email);

  if (!user) {
    return {
      message: <span className="text-red-500">No such user exists</span>,
      email: null,
    };
  }

  if (user.password !== password) {
    return {
      message: <span className="text-red-500">Incorrect password</span>,
      email: null,
    };
  }

  return {
    message: <span className="text-green-500">Login successful</span>,
    email: user.email,
  };
};

export const savePost = (newPost) => {
  // Retrieve existing posts or initialize empty array
  const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Assign unique incremental id
  const id = existingPosts.length + 1;

  const postWithId = { id, ...newPost };

  const updatedPosts = [...existingPosts, postWithId];

  localStorage.setItem("posts", JSON.stringify(updatedPosts));

  return {
    message: "Post saved successfully",
    success: true,
    post: postWithId,
  };
};

export const getAllPosts = () => {
  const posts = JSON.parse(localStorage.getItem("posts"));
  if (!posts) {
    return [];
  }
  return posts;
};

export const getPostById = (id) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return posts.find((post) => post.id === id) || null;
};

// Add comment to a post
export const addCommentToPost = (postId, commentText, rating, email) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const updatedPosts = posts.map((post) => {
    if (post.id === postId) {
      const comments = post.comments || [];
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        rating,
        email,
        date: new Date().toISOString(),
      };
      return {
        ...post,
        comments: [...comments, newComment],
      };
    }
    return post;
  });

  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

// Get all comments for a post
export const getCommentsByPostId = (postId) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((post) => post.id === postId);
  return post?.comments || [];
};

export const deleteCommentFromPost = (postId, commentId, currentUserEmail) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const updatedPosts = posts.map((post) => {
    if (post.id === postId) {
      const filteredComments = (post.comments || []).filter((comment) => {
        const isOwner = comment.email === currentUserEmail;
        const isAdmin = currentUserEmail === "admin@gmail.com";
        return comment.id !== commentId || !(isOwner || isAdmin);
      });

      return {
        ...post,
        comments: filteredComments,
      };
    }
    return post;
  });

  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

export const deletePostById = (postId, currentUserEmail) => {
  // Only admin@gmail.com can delete posts
  if (currentUserEmail !== "admin@gmail.com") {
    return { success: false, message: "Unauthorized" };
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const filteredPosts = posts.filter((post) => post.id !== postId);

  localStorage.setItem("posts", JSON.stringify(filteredPosts));

  return { success: true, message: "Post deleted successfully" };
};
