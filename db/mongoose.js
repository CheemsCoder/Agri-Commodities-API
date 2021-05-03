const mongoose = require('mongoose')
// Connecting to the local MongoDB connection 
mongoose.connect('mongodb://127.0.0.1:27017/Agri-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
