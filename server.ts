import express from "express";
import morgan from "morgan";
import distributorRoutes from "./routes/distributor.routes";
import * as bp from "body-parser";
import productRoutes from "./routes/product.routes";
import personRoutes from "./routes/person.routes";
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bp.json());
app.use("/distributors", distributorRoutes);
app.use("/products", productRoutes);
app.use("/persons", personRoutes);
app.listen(port, () => console.log(`Server started on port ${port}`));
