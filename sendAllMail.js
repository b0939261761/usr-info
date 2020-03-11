const dotenv = require('dotenv');

dotenv.config();

const { createPool, sql } = require('slonik');

const sendMail = require('./services/sendMail');

const connect = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}`
  + `@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const query = sql`SELECT DISTINCT ON (email1) name, manager, email1, email2
  FROM "Organizations" WHERE email1 != '' AND id < 18522`;

(async () => {
  const connection = createPool(connect);

  const { rows } = await connection.query(query);
  for (const { name: company, manager, email1, email2 } of rows) {
    await sendMail({ email: email1, company, manager });
    if (email2) await sendMail({ email: email2, company, manager });
    console.log(email1);
  }
})();
