import * as mongoose from 'mongoose';

// Connection URL
const url = process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cluster0-sh2cg.mongodb.net/ohs-app-db?retryWrites=true';
const connectOptions = {
    // Options here: https://mongoosejs.com/docs/connections.html
    reconnectInterval: 500,
    reconnectTries: 10,
    useNewUrlParser: true
};

function connect() {
    mongoose.connect(url, connectOptions).then(
        () => {
            console.log(`Connected to database at ${url}`);
        }, (err: any) => {
            console.log(err);
        }
    );
}

export default {connect};
