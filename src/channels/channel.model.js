const mongoose = require("mongoose");
const { DataTypes } = require("sequelize");

const db = require("../config/database/mySqlDb");

/**
 * channelSchema: Esquema del modelo a almacenar en MongoDb
 */
const channelSchema = mongoose.Schema({
  broadcaster_language: String,
  broadcaster_login: String,
  display_name: String,
  game_id: String,
  game_name: String,
  id: String,
  is_live: Boolean,
  tag_ids: [String],
  thumbnail_url: String,
  title: String,
  started_at: String,
});

const channelModel = mongoose.model("Channel", channelSchema);

/**
 * ChannelFavs: modelo de la tabla de canales favoritos en MySQL
 */
const ChannelFavs = db.define("channel", {
  broadcaster_language: DataTypes.STRING,
  broadcaster_login: DataTypes.STRING,
  display_name: DataTypes.STRING,
  game_id: DataTypes.STRING,
  game_name: DataTypes.STRING,
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tag_ids: DataTypes.STRING,
  thumbnail_url: DataTypes.STRING,
  started_at: DataTypes.STRING,
  userId: DataTypes.STRING
})

module.exports = {channelModel, ChannelFavs};
