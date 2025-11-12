import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middlewares/upload.js';

const catRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({storage});

// ✅ Updated POST route: add createThumbnail between upload and controller
catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('image'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
