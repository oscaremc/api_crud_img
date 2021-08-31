const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const Image = require('../models/Image');

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
    const image = new Image();
    image.title = req.body.title;
    image.valor = req.body.valor;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/edit/masterEdit');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/edit/masterEdit');
});

module.exports = router;