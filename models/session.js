import { Model, DataTypes } from "sequelize";

import { sequelize } from "../util/db.js";

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "session",
  }
);

export default Session;
