import { MongoClient } from "mongodb";
import db from "./db_promise.js";

async function migrateData() {
    const mongoClient = await MongoClient.connect("mongodb://localhost:27017");
    const mongoDb = mongoClient.db("coffee_shop_nosql");

    const menuCollection = mongoDb.collection("menus");
    const [menus] = await db.execute("SELECT * FROM Menu");
    if (menus.length > 0) {
        await menuCollection.deleteMany({});
        await menuCollection.insertMany(menus);
    }

    const orderCollection = mongoDb.collection("orders");
    const [orders] = await db.execute("SELECT * FROM orders");
    if (orders.length > 0) {
        await orderCollection.deleteMany({});
        for (let order of orders) {
            const [items] = await db.execute(
                "SELECT * FROM order_item WHERE order_id = ?", [order.order_id],
            );
            const nosqlOrder = {
                order_id_ref: order.order_id,
                customer_id: order.customer_id,
                order_time: order.order_time,
                total_price: order.total_price,
                items: items.map((item) => ({
                    menu_id: item.menu_id,
                    size: item.size,
                    price: item.price,
                })),
            };
            await orderCollection.insertOne(nosqlOrder);
        }
    }

    process.exit();
}

migrateData();