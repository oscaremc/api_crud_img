const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    tipo: {type: String},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Category', categorySchema);