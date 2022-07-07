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

  static async getAll() {
    const { rows } = await pool.query('SELECT id, job_name FROM jobs;');
    return rows.map((row) => new xivJob(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM jobs WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return new xivJob(rows[0]);
  }
};
