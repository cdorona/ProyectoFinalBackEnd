const mongoose = require("mongoose")
const {dbUser,dbServer,dbPassword} =require("../config/db.config")

// cluster0.xocdjbx.mongodb.net
const dbConnect = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbServer}/?retryWrites=true&w=majority`)
        console.log("DB Connected")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect
