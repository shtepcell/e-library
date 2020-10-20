import mongoose from 'mongoose';

const { DATABASE_NAME } = process.env;

mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log(`DB ${DATABASE_NAME} connected!`);
});
