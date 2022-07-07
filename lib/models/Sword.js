const pool = require('../utils/pool');
module.exports = class Sword {
  id;
  sword_name;
  sword_period;
  metal_type;
    
  constructor(row) {
    this.id = row.id;
    this.sword_name = row.sword_name;
    this.sword_period = row.sword_period;
    this.metal_type = row.metal_type;
  }

  static async insert({ sword_name, sword_period, metal_type }) {
    const { rows } = await pool.query('INSERT INTO swords (sword_name, sword_period, metal_type) VALUES ($1, $2, $3) RETURNING *',
      [sword_name, sword_period, metal_type]);
    return new Sword(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM swords;');
    return rows.map((row) => new Sword(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM swords WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return rows.map((row) => new Sword(row));
  }

  static async update(id, { sword_name, sword_period, metal_type }) {
    const { rows } = await pool.query('UPDATE swords SET sword_name = $1,sword_period = $2, metal_type = $3 WHERE id = $4 RETURNING *',
      [sword_name, sword_period, metal_type, id]);
    return new Sword(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query('DELETE FROM swords WHERE id=$1 RETURNING *', [id]);
    if(!rows) return null;
    return new Sword(rows[0]);
  }
};
