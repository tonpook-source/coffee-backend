import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const uri = "mongodb://localhost:27017";
const dbName = "coffee_shop_nosql";

router.get("/api/nosql/reports", async(req, res) => {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        const orderCollection = db.collection("orders");

        const summaryPipeline = [{
            $group: {
                _id: null,
                total_revenue: { $sum: "$total_price" },
                total_bills: { $sum: 1 },
            },
        }, ];
        const summaryResult = await orderCollection
            .aggregate(summaryPipeline)
            .toArray();
        const summary =
            summaryResult.length > 0 ?
            summaryResult[0] :
            { total_revenue: 0, total_bills: 0 };

        const topMenusPipeline = [
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.menu_name",
                    qty_sold: { $sum: 1 },
                },
            },
            { $sort: { qty_sold: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: 0,
                    menu_name: "$_id",
                    qty_sold: 1,
                },
            },
        ];
        const topMenus = await orderCollection
            .aggregate(topMenusPipeline)
            .toArray();

        res.json({
            summary: summary,
            top_menus: topMenus,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;