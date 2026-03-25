import Blog from "./blog.js";
import User from "./user.js";

User.hasMany(Blog);
Blog.belongsTo(User);

async function syncModels() {
  await User.sync({ alter: true });
  await Blog.sync({ alter: true });
}

await syncModels();
export default {
  Blog,
  User,
};
