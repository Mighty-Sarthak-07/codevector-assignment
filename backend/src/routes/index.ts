import { Router } from "express";
import productRoutes from "./product.routes.js";

const router = Router();

// Health check route for verify/monitoring
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Mount product routes under /products
router.use("/products", productRoutes);

export default router;
