const mongoose = require('mongoose')
const mongooseUri = "mongodb://localhost:27017/cloud-Note"
const connectToMongo = () =>{
    mongoose.connect(mongooseUri,()=>{
        console.log('Connect to Mongo successfully')
    })
}
module.exports = connectToMongo;