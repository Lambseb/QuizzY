const AbstractManager = require("./AbstractManager");

class MessagingManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "messaging" as configuration
    super({ table: "messaging" });
  }

  // The C of CRUD - Create operation

  async create(messaging) {
    const {
      title,
      body,
      created_at: createdAt,
      is_read: isRead,
      user_id: userId,
    } = messaging;
    // Execute the SQL INSERT query to add a new messaging to the "messaging" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, body, created_at, is_read, user_id ) values (?, ?, ?, ?, ?)`,
      [title, body, createdAt, isRead, userId]
    );

    // Return the ID of the newly inserted messaging
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific messaging by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the messaging
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all messagings from the "messaging" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of messagings
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing messaging

  async update(messaging, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "messaging" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [messaging, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an messaging by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = MessagingManager;
