import pg from 'pg'
const {Pool} =pg



const pool = new Pool({
    user: 'postgres',          // string
    host: 'localhost',         // string
    database: 'Eco_finds',     // string
    password: 'admin123',       // MUST be a string
    port: 5432,                // number
  });


  export default pool;
