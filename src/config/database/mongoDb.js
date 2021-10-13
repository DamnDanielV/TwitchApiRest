const mongoose = require('mongoose');

const MONGO_DB_PASSWORD = 'dbPass'
const MONGO_DB_USER = 'root'
const MONGO_DB_NAME = 'twitchDB'

const connectMongoDB = async () => {
const uri = `mongodb+srv://root:AC4OVcxrj4k4bLVF@clustertwitch.lujnw.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

    try {
      const conn = await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
  
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }
  
    module.exports =  connectMongoDB
