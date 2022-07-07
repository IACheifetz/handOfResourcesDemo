const pool = require('../utils/pool');
module.exports = class Helmet {
  id;
  helmet_name;
  helmet_region;
  era;
    
  constructor(row) {
    this.id = row.id;
    this.helmet_name = row.helmet_name;
    this.helmet_region = row.helmet_region;
    this.era = row.era;
  }

  static async insert({ helmet_name, helmet_region, era }) {
    const { rows } = await pool.query('INSERT INTO helmets (helmet_name, helmet_region, era) VALUES ($1, $2, $3) RETURNING *',
      [helmet_name, helmet_region, era]);
    return new Helmet(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM helmets;');
    return rows.map((row) => new Helmet(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM helmets WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return rows.map((row) => new Helmet(row));
  }

  static async update(id, { helmet_name, helmet_region, era }) {
    const { rows } = await pool.query('UPDATE helmets SET helmet_name = $1,helmet_region = $2, era = $3 WHERE id = $4 RETURNING *',
      [helmet_name, helmet_region, era, id]);
    return new Helmet(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query('DELETE FROM helmets WHERE id=$1 RETURNING *', [id]);
    if(!rows) return null;
    return new Helmet(rows[0]);
  }
};
