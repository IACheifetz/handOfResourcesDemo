const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Instrument = require('../lib/models/Instrument');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('/instruments should return a list of instruments', async () => {
    const agent = request.agent(app);
    const instrument = await Instrument.insert({ 
      instrument_name: 'Piano', 
      accessibility: 'High', 
      average_price: 'Moderate', 
    });
    const response = await agent
      .get('/api/v1/instruments');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(instrument);
  });

  it('/instruments/:id should return instrument detail', async () => {
    const agent = request.agent(app);
    const instrument = await Instrument.insert({ 
      instrument_name: 'Piano', 
      accessibility: 'High', 
      average_price: 'Moderate', 
    });
    const response = await agent
      .get('/api/v1/instruments/1');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(instrument);
  });
  
  it('should be able to add a new instrument', async () => {
    const agent = request.agent(app);
    const response = await agent
      .post('/api/v1/instruments')
      .send({ 
        instrument_name: 'Piano', 
        accessibility: 'High', 
        average_price: 'Moderate',  
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      instrument_name: 'Piano', 
      accessibility: 'High', 
      average_price: 'Moderate', 
    });
  });

  it('should be able to update single instrument', async () => {
    const agent = request.agent(app);
    const instrument = await Instrument.insert({ 
      instrument_name: 'Piano', 
      accessibility: 'High', 
      average_price: 'Moderate',  
    });
    const response = await agent
      .put(`/api/v1/instruments/${instrument.id}`)
      .send({ 
        instrument_name: 'Cello', 
        accessibility: 'Average', 
        average_price: 'High', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      instrument_name: 'Cello', 
      accessibility: 'Average', 
      average_price: 'High',   
    });
  });

  it('should be able to delete a specific instrument', async () => {
    const agent = request.agent(app);
    const instrument =  await Instrument.insert({ 
      instrument_name: 'Cello', 
      accessibility: 'Average', 
      average_price: 'High',   
    });
    const response = await agent
      .delete('/api/v1/instruments/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(instrument);
  });

  afterAll(() => {
    pool.end();
  });
});
