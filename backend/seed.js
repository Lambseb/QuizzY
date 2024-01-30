/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("truncate item");

    // Insert fake data into the 'item' table
    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query("insert into item(title) values (?)", [
          faker.lorem.word(),
        ])
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

  const queriesUser = [];

    // Insert fake data into the 'user' table
    for (let i = 0; i < 5; i += 1) {
      queriesUser.push(
        database.query("insert into user(username, email, password, created_at, is_admin) values (?, ?, ?, ?, ?)", [
            faker.lorem.words({ min: 1, max: 3}),
            faker.lorem.words({ min: 1, max: 3}),
            faker.lorem.words({ min: 1, max: 3}),
            faker.date.anytime(),
            faker.lorem.words({ min: 1, max: 3})
          ]
        )
      );
    }

    // Wait for all the insertion queries to complete
    await Promise.all(queriesUser);

  // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
