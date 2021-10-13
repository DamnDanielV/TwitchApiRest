const axios = require('axios')
const { ChannelFavs } = require('../channels/channel.model')
const User = require('./user.model')

/**
 * updateUser: Updates the description of the user
 * @param {Object} req http request
 * @param {Object} res http response
 */
const updateUser = async (req, res) => {
    const { description } = req.query
    const userInstanceOAuth = axios.create({
        baseURL: process.env.API_TWITCH_BASE_URL
    })
    userInstanceOAuth.defaults.headers.common['Client-Id'] = process.env.ID_CLIENT
    userInstanceOAuth.defaults.headers.common['Authorization'] = `Bearer ${process.env.USER_OAUTH_TOKEN}`

    try {
        await userInstanceOAuth.put(`/users?description=${description}`)
        
    } catch (error) {
        res.status(401).json({message: "El token ya expiró :( sólo dura 3.8 horas"})
        return
    }
    res.json({updateuser: true})
}

const getUser = async (req, res) => {
    const { id } = req.params
    const userInstanceOAuth = axios.create({
        baseURL: process.env.API_TWITCH_BASE_URL
    })
    userInstanceOAuth.defaults.headers.common['Client-Id'] = process.env.ID_CLIENT
    userInstanceOAuth.defaults.headers.common['Authorization'] = `Bearer ${process.env.APP_OAUTH_TOKEN}`

    const userData = await userInstanceOAuth.get(`/users?id=${id}`)
    if (userData.data.data.length === 0) {
        res.status(404).json({message: "Usuario no encontrado"})
        return
    } else {
        // const [user, created] = await User.findOrCreate({where: {id},defaults: {...userData.data.data[0]}})
        let user = await User.findOne({where: {id}})
        if(!user) {
            user = await User.create({...userData.data.data[0]})
        }
        else {
            user = await User.findOne({where: {id}, include: [ChannelFavs]})
        }
        console.log(user)
        // if (created) {
        //     console.log("el usuario fue creado");
        // }
        // else{
        //     console.log("NO FUE CREADO");
        // }
        res.json(user)
    }
}

module.exports = {updateUser, getUser}