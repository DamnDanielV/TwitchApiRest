const { DataTypes } = require("sequelize");
const { ChannelFavs } = require("../channels/channel.model");
const db = require("../config/database/mySqlDb");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    login: DataTypes.STRING,
    display_name: DataTypes.STRING,
    type: DataTypes.STRING,
    broadcaster_type: DataTypes.STRING,
    description: DataTypes.STRING,
    profile_image_url: DataTypes.STRING,
    offline_image_url: DataTypes.STRING,
    view_count: DataTypes.INTEGER,
    created_at: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

// User.associate = (model) => {
//   User
// }

User.hasMany(ChannelFavs, {
  onDelete: 'CASCADE',
  foreignKey: 'userId'
});
ChannelFavs.belongsTo(User);
module.exports = User;
