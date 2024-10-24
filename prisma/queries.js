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
module.exports = {
  postPosts,
  getPosts,
  getPost,
  postComment,
  getComments,
  getComment,
};
