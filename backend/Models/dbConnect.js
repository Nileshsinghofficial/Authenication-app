const mongoose = require('mongoose')

async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGO_CONN);
        console.log('Db connect successufully ✅')
    } catch (error) {
        console.log('MogoDB connection Error', error)
    }
}

module.exports = dbConnect;