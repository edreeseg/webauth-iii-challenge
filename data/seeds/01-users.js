
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'frodo', password: 'Ring', department: 'Test Dept 1' },
        {id: 2, username: 'gandalf', password: 'Mithrandir', department: 'Test Dept 1' },
        {id: 3, username: 'boromir', password: 'Gondor', department: 'Test Dept 2' },
        {id: 4, username: 'gimli', password: 'Moria', department: 'Test Dept 3' }
      ]);
    });
};
