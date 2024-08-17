import pkg from "pg";
const { Pool } = pkg;

// Conexión utilizando una URL en lugar de parámetros separados
const connection = new Pool({
  connectionString:
    "postgresql://postgres.qgaurajcwoanqbwkwhjf:pandasonico123@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  /*     ssl: {
        rejectUnauthorized: false
    } */
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Database is connected");
  }
});

export default connection;
