const mongoose = require("mongoose");

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('connected to db', process.env.MONGO_URI);
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
