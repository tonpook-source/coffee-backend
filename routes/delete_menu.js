import express from "express";
import db from "../db.js";

const router = express.Router();

router.delete("/api/menus/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM Menu WHERE menu_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DELETE Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `ไม่พบเมนูหมายเลข ${id} หรืออาจถูกลบไปแล้ว`,
      });
    }
    res.json({ message: `ลบเมนูหมายเลข ${id} สำเร็จ` });
  });
});

export default router;