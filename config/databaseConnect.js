const mongoose = require('mongoose');

module.exports = class ConnectToDB {
    constructor() { }
    async config() {
       return await mongoose.connect(process.env.DATABASEURL, {
            dbName: process.env.DATABASENAME
        })
            .then(
                resolve => console.log("resolve")
            ).catch(
                reject => console.log(reject)
            )
    }

}