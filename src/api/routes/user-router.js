import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/:id').put(putUser).delete(deleteUser).get(getUserById);

export default userRouter;
