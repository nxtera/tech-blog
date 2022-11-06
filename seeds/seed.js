const sequelize = require("../config/connection");
const { User, Thought } = require("../models");

const userData = require("./userData.json");
const thoughtData = require("./thoughtData.json");

const seedDatabase = async () => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0"),
    await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const thoughts of thoughtData) {
    await Thought.create({
      ...thoughts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();
