const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: {type: String},
    valor: {type: String},
    description: {type: String},
    categoria: {type: String},
    filename: {type: String},
    url: {type: String},
    public_id: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);