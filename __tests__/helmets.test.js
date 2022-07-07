const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Helmet = require('../lib/models/Helmet');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('/helmets should return a list of helmets', async () => {
    const agent = request.agent(app);
    const helmet = await Helmet.insert({ 
      helmet_name: 'Klappvisier', 
      helmet_region: 'France', 
      era: 'early renassaince', 
    });
    const response = await agent
      .get('/api/v1/helmets');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(helmet);
  });

  it('/helmets/:id should return helmet detail', async () => {
    const agent = request.agent(app);
    const helmet = await Helmet.insert({ 
      helmet_name: 'Klappvisier', 
      helmet_region: 'France', 
      era: 'early renassaince', 
    });
    const response = await agent
      .get('/api/v1/helmets/1');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(helmet);
  });
  
  it('should be able to add a new helmet', async () => {
    const agent = request.agent(app);
    const response = await agent
      .post('/api/v1/helmets')
      .send({ 
        helmet_name: 'Klappvisier', 
        helmet_region: 'France', 
        era: 'early renassaince',  
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      helmet_name: 'Klappvisier', 
      helmet_region: 'France', 
      era: 'early renassaince', 
    });
  });

  it('should be able to update single helmet', async () => {
    const agent = request.agent(app);
    const helmet = await Helmet.insert({ 
      helmet_name: 'Klappvisier', 
      helmet_region: 'Italy', 
      era: 'early renassaince', 
    });
    const response = await agent
      .put(`/api/v1/helmets/${helmet.id}`)
      .send({ 
        helmet_name: 'Barbute', 
        helmet_region: 'Italy', 
        era: 'early renassaince', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      helmet_name: 'Barbute', 
      helmet_region: 'Italy', 
      era: 'early renassaince', 
    });
  });

  it('should be able to delete a specific helmet', async () => {
    const agent = request.agent(app);
    const helmet =  await Helmet.insert({ 
      helmet_name: 'Klappvisier', 
      helmet_region: 'France', 
      era: 'early renassaince', 
    });
    const response = await agent
      .delete('/api/v1/helmets/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(helmet);
  });

  afterAll(() => {
    pool.end();
  });
});
