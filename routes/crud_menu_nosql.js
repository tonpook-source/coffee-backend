import express from "express";
import { MongoClient, ObjectId} from 'mongodb';

const router = express.Router();
const url = "mongodb://localhost:27017";
const dbName = "coffee_shop_nosql";

router.get("/api/nosql/menus", async(req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const menus = await client.db(dbName).collection("menus").find().toArray();
        res.json({ data: menus });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/api/nosql/menus', async (req, res) => {
    const { menu_name, price, category } = req.body;
    if (!menu_name || !price || !category) return res.status(400).json({ error: "ข้อมูลไม่ครบ" });

    try {
        const client = await MongoClient.connect(url);
        const result = await client.db(dbName).collection('menus').insertOne({ 
            menu_name, 
            price: Number(price), 
            category 
        });
        res.status(201).json({ message: "เพิ่มเมนูสำเร็จ", id: result.insertedId });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/api/nosql/menus/:id", async(req, res) => {
    const { menu_name, price, category } = req.body;
    try {
        const client = await MongoClient.connect(url);
        const result = await client
            .db(dbName)
            .collection("menus")
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { menu_name, price: Number(price), category } }, );
        if (result.matchedCount === 0)
            return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json({ message: "อัปเดตสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/api/nosql/menus/:id", async(req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const result = await client
            .db(dbName)
            .collection("menus")
            .deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "ไม่พบข้อมูล" });
        res.json({ message: "ลบสำเร็จ" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;