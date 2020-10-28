const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
const devDB = config.get('mongoDBLOCAL')

const connectDB = async () => {
    try {
        await mongoose.connect(devDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected...')
    } catch(err) {
        console.error(err.message)
        // exit process on failure
        process.exit(1)
    }

}

module.exports = connectDB