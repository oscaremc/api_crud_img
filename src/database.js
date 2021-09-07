const mongoose = require('mongoose');

mongoose.connect('https://app.netlify.com/sites/elastic-poincare-35f6d9/', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));