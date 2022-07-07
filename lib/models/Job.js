const pool = require('../utils/pool');
module.exports = class xivJob {
  id;
  job_name;
  min_level;
  job_type;
    
  constructor(row) {
    this.id = row.id;
    this.job_name = row.job_name;
    this.min_level = row.min_level;
    this.job_type = row.job_type;
  }

  static async insert({ job_name, min_level, job_type }) {
    const { rows } = await pool.query('INSERT INTO jobs (job_name, min_level, job_type) VALUES ($1, $2, $3) RETURNING *',
      [job_name, min_level, job_type]);
    return new xivJob(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM jobs;');
    return rows.map((row) => new xivJob(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM jobs WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return rows.map((row) => new xivJob(row));
  }

  static async update(id, { job_name, min_level, job_type }) {
    const { rows } = await pool.query('UPDATE jobs SET job_name = $1, min_level = $2, job_type = $3 WHERE id = $4 RETURNING *',
      [job_name, min_level, job_type, id]);
    return new xivJob(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query('DELETE FROM jobs WHERE id=$1 RETURNING *', [id]);
    if(!rows) return null;
    return new xivJob(rows[0]);
  }
};
