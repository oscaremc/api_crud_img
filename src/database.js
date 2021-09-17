const mongoose = require('mongoose');

mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));