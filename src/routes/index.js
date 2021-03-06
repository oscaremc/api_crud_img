const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const User = require('../models/User');
const Category = require('../models/Category');
const Image = require('../models/Image');

// Guardar imagenes 
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const fs = require('fs-extra');

// Paginas Web/cliente
router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/:cate', async (req, res) => {
    const  {cate}  = req.params;
    const images = await Image.find({categoria: cate});
    res.render('index', { images });
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

// Paginas Master/Usuario
router.get('/edit/masterEdit', async (req, res) => {
    const images = await Image.find();
    res.render('edit/masterEdit', { images });
});

router.get('/edit/user', (req, res) => {
    res.render('edit/user');
});

router.get('/edit/categoria', async (req, res) => {
    const categorys = await Category.find();
    res.render('edit/categoria', { categorys });
});

router.post('/edit/categoria', async (req, res) => {
    
    const category = await new Category();
    category.tipo = req.body.tipo;
    console.log(category)
    await category.save();
    res.render('edit/categoria');
});

router.get('/edit/upload', (req, res) => {
    res.render('edit/upload');
});

router.get('/edit/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('edit/editProfile', { image });
});

router.put('/edit/edit/:id', (req, res) => {
    // const { id } = req.params;
    // const image = await Image.findById(id);
    console.log(req.file)
    res.render('edit/edit');
});

router.post('/edit/upload', async (req, res) => {
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    // console.log(result)
    const image = new Image(); 
    const images = await Image.find();
    image.title = req.body.title;
    image.valor = req.body.valor;
    image.description = req.body.description;
    image.categoria = req.body.categoria;
    image.filename = req.file.filename;
    // image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.url = result.url;
    image.public_id = result.public_id;

    await image.save();
    await fs.unlink(req.file.path);
    res.redirect('/edit/masterEdit', {images});
});

router.get('/image/delete/:photo_id', async (req, res) => {
    try {
        const {photo_id}  = req.params;
        const photo = await Image.findByIdAndDelete(photo_id);
        const result = await cloudinary.v2.uploader.destroy(photo.public_id);
        // await unlink(path.resolve(req.file.path));
        console.log(result)
        res.redirect('/edit/masterEdit');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;