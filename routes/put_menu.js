import express from "express";
import db from "../db.js";

const router = express.Router();

router.put("/api/menus/:id", (req, res) => {
    const id = req.params.id;

    const { menu_name, price, category } = req.body;

    if (!menu_name || !price || !category) {
        return res.status(400).json({
            error: "PUT ต้องส่งข้อมูลครบทุก Field: menu_name, price, category",
        });
    }

    const sql = `UPDATE Menu
                 SET menu_name = ?, price = ?, category = ?
                 WHERE menu_id = ?`;
    db.query(sql, [menu_name, price, category, id], (err, result) => {
        if (err) {
            console.error("PUT Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `ไม่พบเมนูหมายเลข ${id}` });
        }
        res.json({ message: `แก้ไขเมนูหมายเลข ${id} สำเร็จ` });
    });
});

export default router;