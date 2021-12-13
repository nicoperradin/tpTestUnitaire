import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password"
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté !");
});