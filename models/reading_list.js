import { Model, DataTypes } from "sequelize";

import { sequelize } from "../util/db.js";

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "ReadingList",
  }
);

export default ReadingList;
