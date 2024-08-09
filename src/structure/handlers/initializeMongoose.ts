import mongoose from "mongoose";

const initializeMongoose = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI as string, {
        dbName: 'catvroom'
    });

    console.log('Mongoose: '.gray, 'Database Connected'.green)
};

export default initializeMongoose;