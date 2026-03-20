require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Established Successfully");
    const blogs = await sequelize.query("SELECT * FROM blog", {
      type: QueryTypes.SELECT,
    });
    console.log(blogs);
    sequelize.close();
  } catch (err) {
    console.log("Connection Fails", err);
  }
};

main();
