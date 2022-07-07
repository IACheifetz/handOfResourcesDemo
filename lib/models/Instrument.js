const pool = require('../utils/pool');
module.exports = class Instrument {
  id;
  instrument_name;
  accessibility;
  average_price;
    
  constructor(row) {
    this.id = row.id;
    this.instrument_name = row.instrument_name;
    this.accessibility = row.accessibility;
    this.average_price = row.average_price;
  }

  static async insert({ instrument_name, accessibility, average_price }) {
    const { rows } = await pool.query('INSERT INTO instruments (instrument_name, accessibility, average_price) VALUES ($1, $2, $3) RETURNING *',
      [instrument_name, accessibility, average_price]);
    return new Instrument(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM instruments;');
    return rows.map((row) => new Instrument(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM instruments WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return rows.map((row) => new Instrument(row));
  }

  static async update(id, { instrument_name, accessibility, average_price }) {
    const { rows } = await pool.query('UPDATE instruments SET instrument_name = $1,accessibility = $2, average_price = $3 WHERE id = $4 RETURNING *',
      [instrument_name, accessibility, average_price, id]);
    return new Instrument(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query('DELETE FROM instruments WHERE id=$1 RETURNING *', [id]);
    if(!rows) return null;
    return new Instrument(rows[0]);
  }
};
