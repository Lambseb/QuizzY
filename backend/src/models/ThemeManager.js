const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "theme" as configuration
    super({ table: "theme" });
  }

  // The C of CRUD - Create operation

  async create(theme) {
    const { name } = theme;
    // Execute the SQL INSERT query to add a new theme to the "theme" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );

    // Return the ID of the newly inserted theme
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific theme by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the theme
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all themes from the "theme" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of themes
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing theme

  async update(theme, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "theme" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [theme, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an theme by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = ThemeManager;
