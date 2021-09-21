const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const Image = require('../models/Image');
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/edit/masterEdit', async (req, res) => {
    const images = await Image.find();
    res.render('edit/masterEdit', { images });
});

router.get('/edit/user', async (req, res) => {
    res.render('edit/user');
});

router.get('/edit/upload', (req, res) => {
    res.render('edit/upload');
});


router.get('/edit/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('edit/editProfile', { image });
});

router.post('/edit/upload', async (req, res) => {
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)
    const image = new Image();
    image.title = req.body.title;
    image.valor = req.body.valor;
    image.description = req.body.description;
    image.filename = req.file.filename;
    // image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.url = result.url;
    image.public_id = result.public_id;

    await image.save();
    await fs.unlink(req.file.path);
    res.redirect('/edit/masterEdit');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/delete/:public_id', async (req, res) => {
    try {
        const { id } = req.params;
        const imageDeleted = await Image.findByIdAndDelete(id);
        const result = await cloudinary.v2.uploader.destroy(imageDeleted.public_id)
        // await unlink(path.resolve(req.file.path));
        console.log(result)
        res.redirect('/edit/masterEdit');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;