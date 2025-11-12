import bcrypt from 'bcrypt';
import {
  addUser,
  findUserById,
  listAllUsers,
  deleteUserAndCats,
} from '../models/user-model.js';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) res.json(user);
    else res.sendStatus(404);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const postUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const result = await addUser(req.body);
    if (result.user_id)
      res.status(201).json({message: 'New user added.', result});
    else res.sendStatus(400);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const putUser = async (req, res) => {
  res.json({message: 'User item updated.'});
};

const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserAndCats(req.params.id);
    if (result.message === 'User deleted') res.json(result);
    else res.status(404).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
