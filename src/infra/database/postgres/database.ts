import pgPromise from "pg-promise";

const pgp = pgPromise({});

const db = pgp({
  user: "postgres",
  password: "ufms123",
  host: "localhost",
  port: 5432,
  database: "test",
  idleTimeoutMillis: 100,
});

export default db;