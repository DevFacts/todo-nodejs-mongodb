const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');

const storage = new GridFSStorage({
    db: mongoose.connection,
    options: {
        collection: 'uploads'
    }
});

const upload = multer({ storage: storage });

module.exports = upload;