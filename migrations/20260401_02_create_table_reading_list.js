import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("reading_lists", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("reading_lists");
};

export { up, down };
