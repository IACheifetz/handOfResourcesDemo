const pool = require('../utils/pool');
module.exports = class Filament {
  id;
  filament_name;
  flexibility;
  impact_resistance;
  heat_tolerance;
    
  constructor(row) {
    this.id = row.id;
    this.filament_name = row.filament_name;
    this.flexibility = row.flexibility;
    this.impact_resistance = row.impact_resistance;
    this.heat_tolerance = row.heat_tolerance;
  }

  static async insert({ filament_name, flexibility, impact_resistance, heat_tolerance }) {
    const { rows } = await pool.query('INSERT INTO filaments (filament_name, flexibility, impact_resistance, heat_tolerance) VALUES ($1, $2, $3, $4) RETURNING *',
      [filament_name, flexibility, impact_resistance, heat_tolerance]);
    return new Filament(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM filaments;');
    return rows.map((row) => new Filament(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM filaments WHERE id=$1;', [id]);
    if(!rows[0]) return null;

    return rows.map((row) => new Filament(row));
  }

  static async update(id, { filament_name, flexibility, impact_resistance, heat_tolerance }) {
    const { rows } = await pool.query('UPDATE filaments SET filament_name = $1,flexibility = $2, impact_resistance = $3, heat_tolerance = $4 WHERE id = $5 RETURNING *',
      [filament_name, flexibility, impact_resistance, heat_tolerance, id]);
    return new Filament(rows[0]);
  }

  static async delete(id){
    const { rows } = await pool.query('DELETE FROM filaments WHERE id=$1 RETURNING *', [id]);
    if(!rows) return null;
    return new Filament(rows[0]);
  }
};
