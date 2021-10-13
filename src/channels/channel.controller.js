const axios = require("axios");
const { channelModel, ChannelFavs } = require("./channel.model");

/**
 * searchChannels Busca canales
 * @param {Object} req
 * @param {Object} res
 */
const searchChannels = async (req, res) => {
  const { channelTosearch } = req.query;

  const appInstanceOAuth = axios.create({
    baseURL: process.env.API_TWITCH_BASE_URL,
  });

  appInstanceOAuth.defaults.headers.common["Authorization"] =
    `Bearer ${process.env.APP_OAUTH_TOKEN}`;
  appInstanceOAuth.defaults.headers.common["Client-Id"] =
    process.env.ID_CLIENT;

  const channels = await appInstanceOAuth.get(
    `/search/channels?query=${channelTosearch}`
  );
  for (let index = 0; index < channels.data.data.length; index++) {
    const element = channels.data.data[index];
    await channelModel.findOneAndUpdate(
      { id: element.id },
      {
        ...element,
      },
      {
        upsert: true,
      }
    );
  }
  console.log(channels.data);
  res.json(channels.data);
};

/**
 * addFavoriteChannel: Añade un canal a favoritos
 * @param {Object} req 
 * @param {Object} res 
 */
const addFavoriteChannel = async (req, res) => {
  const { id, userId } = req.body;
  const channelInfo = await channelModel.findOne({ id }).exec();

  const [newFavChannel, created] = await ChannelFavs.findOrCreate({where:
    {id},defaults: 
    {broadcaster_language: channelInfo.broadcaster_language,
    broadcaster_login: channelInfo.broadcaster_login,
    display_name: channelInfo.display_name,
    game_id: channelInfo.game_id,
    game_name: channelInfo.game_name,
    is_live: channelInfo.is_live,
    tag_ids: channelInfo.tag_ids.toString(),
    thumbnail_url: channelInfo.thumbnail_url,
    title: channelInfo.title,
    started_at: channelInfo.started_at,
    userId}
  });
  if (created) {
    console.log("new canal añadido a favoritos");
    res.status(201).json(newFavChannel);
    return
  } else {
    console.log("Ya existe en favoritos ");
    res.status(400).json({message: "Ya existe en favaoritos"})
    return
  }

};

/**
 * getFavoriteChannels: Obtiene los canales agregados a favoritos
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const getFavoriteChannels = async (req, res) => {
  const favChannels = await ChannelFavs.findAll()
  if (favChannels.length === 0) {
    res.json({message: "No tienes favoritos agregados"})
    return
  }
  else {
    res.json(JSON.parse(JSON.stringify(favChannels)))
    return
  }  
}

/**
 * deleteFavChannel: Elimina un canal de favoritos
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
const deleteFavChannel = async (req, res) => {
  const { id } = req.body
  const deletedChannelCounter = await ChannelFavs.destroy({
    where: {
      id
    }
  })
  if (deletedChannelCounter === 0) {
    res.status(400).json({message: "Canal no encontrado"})
    return
  } else {
    res.json({message: "Canal eliminado"})
    return
  }
}
module.exports = { searchChannels, addFavoriteChannel, getFavoriteChannels, deleteFavChannel };
