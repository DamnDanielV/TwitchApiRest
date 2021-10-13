const axios = require("axios");
const streamModel = require("./stream.model");

/**
 * getStreams: Gets information about active streams sorted by current viewers
 * @param {Object} req http request
 * @param {Object} res http response
 */
const getStreams = async (req, res) => {
  const appInstanceOAuth = axios.create({
    baseURL: process.env.API_TWITCH_BASE_URL,
  });

  appInstanceOAuth.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.APP_OAUTH_TOKEN}`;
  appInstanceOAuth.defaults.headers.common["Client-Id"] =
  process.env.ID_CLIENT;

  const streamsData = await appInstanceOAuth.get("/streams");

  for (let index = 0; index < streamsData.data.data.length; index++) {
    const element = streamsData.data.data[index];

    await streamModel.findOneAndUpdate({
      id: element.id
    },{
      ...element,
    }, {
      upsert: true
    });
  }
  console.log(streamsData.data);
  res.json(streamsData.data);
};

module.exports = getStreams;
