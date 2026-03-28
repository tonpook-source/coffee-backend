import cors from "cors";
import express from "express";

import get_menu from "./routes/get_menu.js";
import post_menu from "./routes/post_menu.js";
import put_menu from "./routes/put_menu.js";
import patch_menu from "./routes/patch_menu.js";
import delete_menu from "./routes/delete_menu.js";
import get_customer from "./routes/get_customer.js";
import get_toppings from "./routes/get_toppings.js";
import post_customer from "./routes/post_customer.js";
import post_order from "./routes/post_order.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(get_menu);
app.use(post_menu);
app.use(put_menu);
app.use(patch_menu);
app.use(delete_menu);
app.use(get_customer);
app.use(get_toppings);
app.use(post_customer);
app.use(post_order);

app.listen(3000, () => {
    console.log("Server กำลังทำงานที่ http://localhost:3000");
});

app.get("/api/test", (req, res) => {
    res.json({
        status: "OK",
    });
});