import { createConnection } from "mysql2";

const db = createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "coffee_shop",
});

db.connect((err) => {
    if (err) {
        console.error("เชื่อมฐานข้อมูลไม่ได้", err.message);
        process.exit(1);
    }
    console.log("เชื่อมฐานข้อมูลได้สำเร็จ");
});

export default db;