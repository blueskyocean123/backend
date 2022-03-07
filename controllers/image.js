const upload = require('../utils/imageupload');

module.exports = {
    uploadImage(req, res) {
        upload.uploadFile(req, res);
    }
}