const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const xivJob = require('../lib/models/Job');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('/jobs should return a list of jobs', async () => {
    const agent = request.agent(app);
    const job = await xivJob.insert({ 
      job_name: 'Warrior', 
      min_level: '1', 
      job_type: 'tank', 
    });
    const response = await agent
      .get('/api/v1/jobs');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(job);
  });

  it('/jobs/:id should return job detail', async () => {
    const agent = request.agent(app);
    const job = await xivJob.insert({ 
      job_name: 'warrior', 
      min_level: '1', 
      job_type: 'tank', 
    });
    const response = await agent
      .get('/api/v1/jobs/1');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual(job);
  });
  
  it('should be able to add a new job', async () => {
    const agent = request.agent(app);
    const response = await agent
      .post('/api/v1/jobs')
      .send({ 
        job_name: 'Warrior',
        min_level: '1',
        job_type: 'tank', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      job_name: 'Warrior',
      min_level: '1',
      job_type: 'tank', 
    });
  });

  it('should be able to update single album', async () => {
    const agent = request.agent(app);
    const job = await xivJob.insert({ 
      job_name: 'Warrior',
      min_level: '1',
      job_type: 'tank', 
    });
    const response = await agent
      .put(`/api/v1/jobs/${job.id}`)
      .send({ 
        job_name: 'Paladin',
        min_level: '1',
        job_type: 'tank', 
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      job_name: 'Paladin',
      min_level: '1',
      job_type: 'tank', 
    });
  });

  it('should be able to delete a specific albums', async () => {
    const agent = request.agent(app);
    const album =  await xivJob.insert({ 
      job_name: 'Paladin',
      min_level: '1',
      job_type: 'tank', 
    });
    const response = await agent
      .delete('/api/v1/jobs/1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(album);
  });

  afterAll(() => {
    pool.end();
  });
});
