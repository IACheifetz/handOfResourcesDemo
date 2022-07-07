const { Router } = require('express');
const Instrument = require('../models/Instrument');


module.exports = Router() 
//create
  .post('/', async (req, res, next) => {
    try {
      const newInstrument = await Instrument.insert(req.body);
      res.json(newInstrument);
    } catch(e) {
      next(e);
    }
  })
//read
  .get('/:id', async (req, res, next) => {
    try {
      const matchedInstrument = await Instrument.getById(req.params.id);
      res.json(matchedInstrument);
    } catch(e) {
      next(e);
    }
  })
//read  
  .get('/', async (req, res, next) => {
    try {
      const instruments2 = await Instrument.getAll();
      res.json(instruments2);
    } catch(e) {
      next(e);
    }
  })
//update
  .put('/:id', async (req, res, next) => {
    try {
      const updatedInstrument = await Instrument.update(req.params.id, req.body);
      res.json(updatedInstrument);
    } catch(e) {
      next(e);
    }
  })
//delete
  .delete('/:id', async (req, res, next) => {
    try{
      const deleteInstrument = await Instrument.delete(req.params.id);
      res.json(deleteInstrument);
    }catch(e){
      next(e);
    }
  });

  
