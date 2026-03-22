import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/api/menus", (req, res) => {
    const { menu_name, price, category } = req.body;

    if (!menu_name || !price || !category) {
        return res.status(400).json({
            error: "กรุณาระบุ menu_name, price และ category ให้ครบถ้วน",
        });
    }

    const sql = `INSERT INTO Menu (menu_name, price, category) VALUES (?, ?, ?)`;
    db.query(sql, [menu_name, price, category], (err, result) => {
        if (err) {
            console.error("POST Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "บันทึกข้อมูลสำเร็จ",
            new_id: result.insertId,
        });
    });
});

export default router;