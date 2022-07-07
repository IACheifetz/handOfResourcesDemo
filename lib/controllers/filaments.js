const { Router } = require('express');
const Filament = require('../models/Filament');


module.exports = Router() 
//create
  .post('/', async (req, res, next) => {
    try {
      const newFilament = await Filament.insert(req.body);
      res.json(newFilament);
    } catch(e) {
      next(e);
    }
  })
//read
  .get('/:id', async (req, res, next) => {
    try {
      const matchedFilament = await Filament.getById(req.params.id);
      res.json(matchedFilament);
    } catch(e) {
      next(e);
    }
  })
//read  
  .get('/', async (req, res, next) => {
    try {
      const filaments = await Filament.getAll();
      res.json(filaments);
    } catch(e) {
      next(e);
    }
  })
//update
  .put('/:id', async (req, res, next) => {
    try {
      const updatedFilament = await Filament.update(req.params.id, req.body);
      res.json(updatedFilament);
    } catch(e) {
      next(e);
    }
  })
//delete
  .delete('/:id', async (req, res, next) => {
    try{
      const deleteFilament = await Filament.delete(req.params.id);
      res.json(deleteFilament);
    }catch(e){
      next(e);
    }
  });

  
