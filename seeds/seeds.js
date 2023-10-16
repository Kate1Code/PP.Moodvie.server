
exports.seed = function (knex) {
    return knex('users')
      .del()
      .then(function () {
        return knex('users').insert([
          { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' },
        ]);
      });
  };