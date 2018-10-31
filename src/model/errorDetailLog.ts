import * as mongoose from 'mongoose';

const errorDetailLogSchema = new mongoose.Schema({
    user: String,
    time: Date,
    location: JSON,
    url: String,
    status: String,
    message: String,
    stack: JSON
});

const ErrorDetailLog = mongoose.model('ErrorDetailLog', errorDetailLogSchema);

export default ErrorDetailLog;
