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
module.exports = { postPosts, getPosts };
