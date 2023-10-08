// In seeds/initial_users.js
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' },
          // Add more seed data as needed
        ]);
      });
  };