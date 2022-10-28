const User = require('./User');
const Thought = require('./Thought');
const Comment = require('./Comment');

Thought.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Thought, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Thought.hasMany(Comment, {
  foreignKey: 'thought_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Thought, {
  foreignKey: 'thought_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Thought
};