const { Router } = require('express');
const Helmet = require('../models/Helmet');


module.exports = Router() 
//create
  .post('/', async (req, res, next) => {
    try {
      const newHelmet = await Helmet.insert(req.body);
      res.json(newHelmet);
    } catch(e) {
      next(e);
    }
  })
//read
  .get('/:id', async (req, res, next) => {
    try {
      const matchedHelmet = await Helmet.getById(req.params.id);
      res.json(matchedHelmet);
    } catch(e) {
      next(e);
    }
  })
//read  
  .get('/', async (req, res, next) => {
    try {
      const helmets2 = await Helmet.getAll();
      res.json(helmets2);
    } catch(e) {
      next(e);
    }
  })
//update
  .put('/:id', async (req, res, next) => {
    try {
      const updatedHelmet = await Helmet.update(req.params.id, req.body);
      res.json(updatedHelmet);
    } catch(e) {
      next(e);
    }
  })
//delete
  .delete('/:id', async (req, res, next) => {
    try{
      const deleteHelmet = await Helmet.delete(req.params.id);
      res.json(deleteHelmet);
    }catch(e){
      next(e);
    }
  });

  
