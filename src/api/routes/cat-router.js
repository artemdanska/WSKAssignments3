import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  getCatsByUser,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middlewares/upload.js';

const catRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({storage});

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('image'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

catRouter.route('/user/:userId').get(getCatsByUser);

export default catRouter;
