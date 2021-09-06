const mongoose = require('mongoose');

mongoose.connect('https://pinaterialaoctava.herokuapp.com/', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));