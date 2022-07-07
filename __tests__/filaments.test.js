const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Filament = require('../lib/models/Filament');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('/filaments should return a list of filaments', async () => {
    const agent = request.agent(app);
    const filament = await Filament.insert({ 
      filament_name: 'PLA', 
      flexibility: 'Moderate', 
      impact_resistance: 'Low', 
      heat_tolerance: 'Low',
    });
    const response = await agent
      .get('/api/v1/filaments');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(filament);
  });

  it('/filaments/:id should return helmet detail', async () => {
    const agent = request.agent(app);
    const filament = await Filament.insert({ 
      filament_name: 'PLA', 
      flexibility: 'Moderate', 
      impact_resistance: 'Low', 
      heat_tolerance: 'Low',
    });
    const response = await agent
      .get('/api/v1/filaments/1');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(filament);
  });
  
  it('should be able to add a new filament', async () => {
    const agent = request.agent(app);
    const response = await agent
      .post('/api/v1/filaments')
      .send({ 
        filament_name: 'PLA', 
        flexibility: 'Moderate', 
        impact_resistance: 'Low', 
        heat_tolerance: 'Low',
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      filament_name: 'PLA', 
      flexibility: 'Moderate', 
      impact_resistance: 'Low', 
      heat_tolerance: 'Low', 
    });
  });

  it('should be able to update single filament', async () => {
    const agent = request.agent(app);
    const filament = await Filament.insert({ 
      filament_name: 'PLA', 
      flexibility: 'Moderate', 
      impact_resistance: 'Low', 
      heat_tolerance: 'Low',
    });
    const response = await agent
      .put(`/api/v1/filaments/${filament.id}`)
      .send({ 
        filament_name: 'PLA+', 
        flexibility: 'Moderate', 
        impact_resistance: 'High', 
        heat_tolerance: 'Med-High',
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      filament_name: 'PLA+', 
      flexibility: 'Moderate', 
      impact_resistance: 'High', 
      heat_tolerance: 'Med-High',
    });
  });

  it('should be able to delete a specific filament', async () => {
    const agent = request.agent(app);
    const filament =  await Filament.insert({ 
      filament_name: 'PLA', 
      flexibility: 'Moderate', 
      impact_resistance: 'Low', 
      heat_tolerance: 'Low', 
    });
    const response = await agent
      .delete('/api/v1/filaments/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(filament);
  });

  afterAll(() => {
    pool.end();
  });
});
