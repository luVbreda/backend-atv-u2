import moongose from 'mongoose';

const connect = async () => {
    try {
        moongose.set('strictQuery', true);
        await moongose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB_NAME,
        });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default { connect };