const {Router} = require('express')
const {searchChannels, addFavoriteChannel, getFavoriteChannels, deleteFavChannel} = require('./channel.controller')

const router = Router()

router.get('/search', searchChannels)
router.post('/addFav', addFavoriteChannel)
router.get('/getFavs', getFavoriteChannels)
router.delete('/deleteFav', deleteFavChannel)
module.exports = router