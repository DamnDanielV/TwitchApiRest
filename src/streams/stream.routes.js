const { Router } = require('express')
const getStreams = require('./stream.controller')

const router = Router()

router.get('/', getStreams)

module.exports = router