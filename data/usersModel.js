const db = require("./db-config");

module.exports = {
  add,
  find,
  findById,
  findBy,
  findDepartments
};

function findDepartments() {
  return db("users").distinct("department");
}

function findBy(username) {
  return db("users")
    .where({ username })
    .first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => findById(ids[0]));
}

function find(department) {
  return db("users").where({ department });
}

function findById(id, department) {
  return db("users")
    .where({ id, department })
    .first();
}
