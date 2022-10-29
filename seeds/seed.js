const sequelize = require("../config/connection");
const { User, Thought } = require("../models");

const userData = require("./userData.json");
const thoughtData = require("./thoughtData.json");

const seedDatabase = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
    await sequelize.sync({ force: true });
    
// sequelize.query('SET FOREIGN_KEY_CHECKS = 0').success(function() {
//     sequelize
//         .sync({
//             force: true
//         }).success(function() {
//             sequelize.query('SET FOREIGN_KEY_CHECKS = 1').success(function() {
//                 console.log('Database synchronised.');
//             });
//         }).error(function(err) {
//             console.log(err);
//         });;
// }).error(function(ee) {
//     console.log(err);
// )



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