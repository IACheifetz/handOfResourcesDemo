const { Router } = require('express');
const Sword = require('../models/Sword');


module.exports = Router() 
//create
  .post('/', async (req, res, next) => {
    try {
      const newJob = await Sword.insert(req.body);
      res.json(newJob);
    } catch(e) {
      next(e);
    }
  })
//read
  .get('/:id', async (req, res, next) => {
    try {
      const matchedJob = await Sword.getById(req.params.id);
      res.json(matchedJob);
    } catch(e) {
      next(e);
    }
  })
//read  
  .get('/', async (req, res, next) => {
    try {
      const jobs2 = await Sword.getAll();
      res.json(jobs2);
    } catch(e) {
      next(e);
    }
  })
//update
  .put('/:id', async (req, res, next) => {
    try {
      const updatedjob = await Sword.update(req.params.id, req.body);
      res.json(updatedjob);
    } catch(e) {
      next(e);
    }
  })
//delete
  .delete('/:id', async (req, res, next) => {
    try{
      const deleteJob = await Sword.delete(req.params.id);
      res.json(deleteJob);
    }catch(e){
      next(e);
    }
  });

  
