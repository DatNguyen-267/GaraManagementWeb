
// CONFIG Để kết nối với database

const mongoose = require('mongoose')
// mongoose.Promise = require('bluebird')
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/dblog_dev', {
            useNewUrlParser: true,
            useUnifiedTopology:true,      
        });
        console.log('Connect successfully!!!')
    }
    catch (error) {
        console.log('Connect failure!!!')
    }
}
module.exports = {connect};