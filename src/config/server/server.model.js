const express = require('express')
require("dotenv").config()
const connectMongoDB = require('../database/mongoDb')
const db = require('../database/mySqlDb')

class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.dbConnections()
        this.routes()
    }

    dbConnections() {
        connectMongoDB()
        db.sync({force:true}).then(()=> {
            console.log("conexion a mysql satisfactoria");
        }).catch((err) => {
            console.log(err);
        })
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/streams', require('../../streams/stream.routes'))
        this.app.use('/user', require('../../users/user.routes'))
        this.app.use('/channels', require('../../channels/channel.routes'))
    }

    listen() {
        this.app.listen(process.env.NODE_DOCKER_PORT)
    }
}

module.exports = Server