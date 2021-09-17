const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: {type: String},
    valor: {type: String},
    description: {type: String},
    filename: {type: String},
    path: {type: String},
    puclic_id: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image', imageSchema);