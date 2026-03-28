import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/api/customer/:phone", (req, res) => {
  const phoneNumber = req.params.phone;

  const sql = `SELECT * FROM custumer WHERE phone = ?`;

  db.query(sql, [phoneNumber], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.json({
        status: "success",
        data: results[0],
      });
    } else {
      return res.json({
        status: "not_found",
        message: "ไม่พบข้อมูล กรุณาตรวจสอบเบอร์",
      });
    }
  });
});

export default router;