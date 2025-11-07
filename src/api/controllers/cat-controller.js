import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) res.json(cat);
  else res.sendStatus(404);
};

const postCat = (req, res) => {
  console.log('Form data:', req.body); // text fields
  console.log('File data:', req.file); // uploaded file info

  if (req.file) {
    const catData = {...req.body, filename: req.file.filename};
    const result = addCat(catData);
    if (result.cat_id)
      res.status(201).json({message: 'New cat added.', result});
    else res.sendStatus(400);
  } else {
    res.status(400).json({message: 'No file uploaded.'});
  }
};

const putCat = (req, res) => {
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
