import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("sessions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.STRING,
    },
  });
};
const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("sessions");
};

export { up, down };
