const Sequelize = require('sequelize')

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env

const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})

module.exports = db