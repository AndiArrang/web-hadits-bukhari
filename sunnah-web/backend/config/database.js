import mysql from 'mysql2'

// Buat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hadits_bukhari'
});

// Koneksi ke database
connection.connect((error) => {
  if (error) {
    console.error('Error koneksi database:', error);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

export default connection