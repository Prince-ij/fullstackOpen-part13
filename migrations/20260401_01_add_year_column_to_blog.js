import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    validate: {
      min: 1998,
      max: 2026,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year");
};

export { up, down };
