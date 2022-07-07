const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sword = require('../lib/models/Sword');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('/swords should return a list of swords', async () => {
    const agent = request.agent(app);
    const sword = await Sword.insert({ 
      sword_name: 'Gladius', 
      sword_period: 'Roman', 
      metal_type: 'Steel', 
    });
    const response = await agent
      .get('/api/v1/swords');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(sword);
  });

  it('/swords/:id should return sword detail', async () => {
    const agent = request.agent(app);
    const sword = await Sword.insert({ 
      sword_name: 'Gladius', 
      sword_period: 'Roman', 
      metal_type: 'Steel', 
    });
    const response = await agent
      .get('/api/v1/swords/1');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(sword);
  });
  
  it('should be able to add a new sword', async () => {
    const agent = request.agent(app);
    const response = await agent
      .post('/api/v1/swords')
      .send({ 
        sword_name: 'Gladius', 
        sword_period: 'Roman', 
        metal_type: 'Steel', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      sword_name: 'Gladius', 
      sword_period: 'Roman', 
      metal_type: 'Steel', 
    });
  });

  it('should be able to update single sword', async () => {
    const agent = request.agent(app);
    const sword = await Sword.insert({ 
      sword_name: 'Gladius', 
      sword_period: 'Roman', 
      metal_type: 'Steel', 
    });
    const response = await agent
      .put(`/api/v1/swords/${sword.id}`)
      .send({ 
        sword_name: 'Rapier', 
        sword_period: 'Renaissance', 
        metal_type: 'Steel', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      sword_name: 'Rapier', 
      sword_period: 'Renaissance', 
      metal_type: 'Steel', 
    });
  });

  it('should be able to delete a specific sword', async () => {
    const agent = request.agent(app);
    const sword =  await Sword.insert({ 
      sword_name: 'Rapier', 
      sword_period: 'Renaissance', 
      metal_type: 'Steel', 
    });
    const response = await agent
      .delete('/api/v1/swords/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(sword);
  });

  afterAll(() => {
    pool.end();
  });
});
