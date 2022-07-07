const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Job = require('../lib/models/Job');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/jobs should return a list of jobs', async () => {
    const res = await request(app).get('/jobs');
    const expected = Job.map((jobs) => {
      return { id: jobs.id, name: jobs.job_name };
    });
    expect(res.body).toEqual(expected);
  });

  it('/jobs/:id should return job detail', async () => {
    const res = await request(app).get('/jobs/1');
    const WAR = {
      id: '1',
      job_name: 'Warrior',
      min_level: '1',
      job_type: 'tank',
    };
    expect(res.body).toEqual(WAR);
  });
});
