const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const postPosts = async (title, content) => {
  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.log(err);
  }
};
const getPost = async (postid) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postid,
      },
    });
    return post;
  } catch (err) {
    console.log(err);
  }
};
const postComment = async (content, postId) => {
  try {
    await prisma.comment.create({
      data: {
        content,
        postId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
const getComments = async (postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return comments;
  } catch (error) {}
};
const getComment = async (commentid) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentid,
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
  }
};
const deleteComment = async (commentid) => {
  try {
    await prisma.comment.delete({
      where: {
        id: commentid,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const deletePost = async (postid) => {
  try {
    await prisma.post.delete({
      where: { id: postid },
    });
  } catch (error) {
    console.error(error);
  }
};
const updatePost = async (postid, updated_content, updated_title) => {
  try {
    await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        content: updated_content,
        title: updated_title,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
//for development only
const getAllComments = async () => {
  try {
    const comments = await prisma.comment.findMany();
    return comments;
  } catch (error) {
    console.error(error);
  }
};
//updatecomment
const updateComment = async (commentid, updated_content) => {
  try {
    await prisma.comment.update({
      where: {
        id: commentid,
      },
      data: {
        content: updated_content,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
//createUser
const createUser = async (username, email, password) => {
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
//getUser
const getUser = async (username) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postPosts,
  getPosts,
  getPost,
  postComment,
  getComments,
  getComment,
  deleteComment,
  deletePost,
  getAllComments,
  updatePost,
  updateComment,
  createUser,
  getUser,
};
