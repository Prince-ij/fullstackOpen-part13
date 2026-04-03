import Blog from "./blog.js";
import User from "./user.js";
import ReadingList from "./reading_list.js";
import Session from "./session.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(ReadingList);
ReadingList.belongsTo(User);

Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "reading_list" });

User.hasOne(Session);
Session.belongsTo(User);

export default {
  Blog,
  User,
  ReadingList,
};
