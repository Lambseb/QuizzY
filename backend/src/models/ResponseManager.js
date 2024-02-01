const AbstractManager = require("./AbstractManager");

class ResponseManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "response" as configuration
    super({ table: "response" });
  }

  // The C of CRUD - Create operation

  async create(responseTable) {
    const { response, value, quiz_id: quizId } = responseTable;
    // Execute the SQL INSERT query to add a new response to the "response" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (response, value, quiz_id) values (?, ?, ?)`,
      [response, value, quizId]
    );

    // Return the ID of the newly inserted response
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific response by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the response
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all responses from the "response" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of responses
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing response

  async update(response, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "response" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [response, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an response by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = ResponseManager;
