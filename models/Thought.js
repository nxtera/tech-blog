const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Thought extends Model {}

Thought.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Thought;
