const { Router } = require('express');
const xivJob = require('../models/Job');


module.exports = Router() 
//create
  .post('/', async (req, res, next) => {
    try {
      const newJob = await xivJob.insert(req.body);
      res.json(newJob);
    } catch(e) {
      next(e);
    }
  })
//read
  .get('/:id', async (req, res, next) => {
    try {
      const matchedJob = await xivJob.getById(req.params.id);
      res.json(matchedJob);
    } catch(e) {
      next(e);
    }
  })
//read  
  .get('/', async (req, res, next) => {
    try {
      const jobs2 = await xivJob.getAll();
      res.json(jobs2);
    } catch(e) {
      next(e);
    }
  })
//update
  .put('/:id', async (req, res, next) => {
    try {
      const updatedjob = await xivJob.update(req.params.id, req.body);
      res.json(updatedjob);
    } catch(e) {
      next(e);
    }
  })
//delete
  .delete('/:id', async (req, res, next) => {
    try{
      const deleteJob = await xivJob.delete(req.params.id);
      res.json(deleteJob);
    }catch(e){
      next(e);
    }
  });

  
