import multer from "multer";
import path from 'path';

const configStorage = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public${destination}`);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + Date.now() + path.extname(file.originalname));
        }
    });

    return multer({ storage: storage });
}

export default configStorage;