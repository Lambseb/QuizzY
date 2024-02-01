const AbstractManager = require("./AbstractManager");

class QuizManager extends AbstractManager {
  constructor() {
    super({ table: "quiz" });
  }

  // The C of CRUD - Create operation

  async create(quiz) {
    const { name, user_id: userId } = quiz;

    const [result] = await this.database.query(
      `insert into ${this.table} (name, user_id) values (?, ?)`,
      [name, userId]
    );

    // Return the ID of the newly inserted quiz
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific quiz by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the quiz
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all responses from the "response" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of responses
    return rows;
  }

  async readAllByQuiz() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `SELECT  name, theme_id, user_id, response.${this.table}_id,  response.response, response.value AS value FROM ${this.table}  JOIN response ON ${this.table}.id = response.${this.table}_id
      WHERE ${this.table}.id = response.${this.table}_id ORDER BY ${this.table}.id ASC;`
    );
    return rows;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing quiz

  async update(quiz, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "quiz" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [quiz, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an quiz by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = QuizManager;
