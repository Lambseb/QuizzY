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
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

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

  async update(quiz, id) {
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [quiz, id]
    );

    return result;
  }

  async delete(id) {
    try {
      await this.database.query(
        `DELETE FROM Response WHERE ${this.table}_id = ?`,
        [id]
      );
      await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    } catch (error) {
      console.info(error);
      throw error;
    }
  }
}

module.exports = QuizManager;
