const User = require('./User');
const Thought = require('./Thought');
const Comment = require('./Comment');

Thought.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Thought.hasMany(Comment, {
  foreignKey: 'thoughtId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Thought
};