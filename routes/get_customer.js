import express from "express";
import db from "../db.js"; // ตรวจสอบว่า path ไปหาไฟล์ db.js ถูกต้อง

const router = express.Router();

// Path: /api/customers/:phone
router.get("/api/custumer/:phone", (req, res) => {
  const phone = req.params.phone;
  const sql = "SELECT * FROM custumer WHERE phone = ?";

  // พิมพ์เช็กใน Terminal ว่ามี Request เข้ามาไหม
  console.log("--- New Request ---");
  console.log("Searching for phone:", phone);

  db.query(sql, [phone], (err, results) => {
    // 1. จัดการกรณีเกิด Error จาก Database
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ 
        status: "error", 
        message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" 
      });
    }

    // ดูผลลัพธ์ที่ได้จาก Query ใน Terminal
    console.log("Query Results:", results);

    // 2. ตรวจสอบว่าเจอข้อมูลหรือไม่
    if (results && results.length > 0) {
      // กรณีพบข้อมูลลูกค้า
      return res.status(200).json({
        status: "success",
        data: results[0] // ส่งข้อมูลแถวแรกที่เจอ
      });
    } else {
      // กรณีไม่พบข้อมูล (ผลลัพธ์เป็น Array ว่าง [])
      return res.status(404).json({
        status: "not_found",
        message: "ไม่พบข้อมูล กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง"
      });
    }
  });
});

export default router;