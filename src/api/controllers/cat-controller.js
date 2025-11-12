import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  listCatsByUserId,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) res.json(cat);
    else res.sendStatus(404);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getCatsByUser = async (req, res) => {
  try {
    const cats = await listCatsByUserId(req.params.userId);
    if (cats) res.json(cats);
    else res.sendStatus(404);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const postCat = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({message: 'No file uploaded.'});

    const catData = {...req.body, filename: req.file.filename};
    const result = await addCat(catData);

    if (result.cat_id)
      res.status(201).json({message: 'New cat added.', result});
    else res.sendStatus(400);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);
    if (result) res.json(result);
    else res.sendStatus(404);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export {getCat, getCatById, getCatsByUser, postCat, putCat, deleteCat};
