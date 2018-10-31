import * as mongoose from 'mongoose';

const dbLogSchema = new mongoose.Schema({
    dateTime: Date,
    user: String,
    message: String
});

const DbLog = mongoose.model('DbLog', dbLogSchema);

export default DbLog;
