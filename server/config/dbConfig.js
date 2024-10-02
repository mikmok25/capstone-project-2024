const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection; 

connection.on('connected', () => {
    console.log('Mongoose connected to db');
});

connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
});