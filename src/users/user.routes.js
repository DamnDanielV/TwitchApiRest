const { Router } = require('express')
const {updateUser, getUser} = require('./user.controller')

const router = Router()

router.put('/update', updateUser)
router.get('/:id', getUser)

module.exports = router