import express from "express";
import db from "../db.js";

const router = express.Router();

router.patch("/api/menus/:id/price", (req, res) => {
    const id = req.params.id;
    const { price } = req.body;

    if (price === undefined || isNaN(price)) {
        return res.status(400).json({
            error: "กรุณาระบุ price เป็นตัวเลข",
        });
    }

    const sql = `UPDATE Menu SET price = ? WHERE menu_id = ?`;
    db.query(sql, [price, id], (err, result) => {
        if (err) {
            console.error("PATCH Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `ไม่พบเมนูหมายเลข ${id}` });
        }
        res.json({
            message: `แก้ไขราคาเมนูหมายเลข ${id} เป็น ${price} บาท สำเร็จ`,
        });
    });
});

export default router;