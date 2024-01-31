const AbstractManager = require("./AbstractManager");

class QuizStoryManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "quiz_story" as configuration
    super({ table: "quiz_story" });
  }

  // The C of CRUD - Create operation

  async create(quizStory) {
    const { action, quiz_id: quizId } = quizStory;
    // Execute the SQL INSERT query to add a new quiz_story to the "quiz_story" table
    const [result] = await this.database.query(
      `insert into ${this.table} ( action,quiz_id) values (?, ?)`,
      [action, quizId]
    );

    // Return the ID of the newly inserted quiz_story
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific quiz_story by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the quiz_story
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all quiz_storys from the "quiz_story" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of quiz_storys
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing quiz_story

  async update(quizStory, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "quiz_story" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [quizStory, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an quiz_story by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = QuizStoryManager;
