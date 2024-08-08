import mongoose from "mongoose";

const initializeMongoose = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'catvroom'
    })
};

export default initializeMongoose;