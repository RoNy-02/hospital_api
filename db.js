import 'dotenv/config';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 8080,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

connection.connect((error) => {
    if (error) {
        console.log('Error al conectar con AWS:', error.message);
        return;
    }
    console.log('Conectado correctamente a MySQL en AWS');
});

export default connection;