import pg from 'pg'
const {Pool} =pg



const pool = new Pool({
    user: 'postgres',          // string
    host: 'localhost',         // string
    database: 'ecofinds_db',     // string
    password: 'piyush',       // MUST be a string
    port: 5432,                // number
  });


  export default pool;
