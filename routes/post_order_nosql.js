import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const uri = "mongodb://localhost:27017";
const dbName = "coffee_shop_nosql";

router.post("/api/nosql/orders", async(req, res) => {
    const { customer_name, items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "ตะกร้าว่างเปล่า" });
    }

    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);

        const newOrder = {
            order_time: new Date(),
            customer_name: customer_name || "ลูกค้าทั่วไป",
            items: items,
            total_price: items.reduce((sum, item) => sum + Number(item.price), 0),
        };

        await db.collection("orders").insertOne(newOrder);
        res
            .status(201)
            .json({ message: "ชำระเงินและบันทึกข้อมูลลง MongoDB สำเร็จ!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;