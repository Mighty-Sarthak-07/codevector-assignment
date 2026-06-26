import { Router } from "express";
import { browseProducts } from "../controllers/product.controller.js";

const router = Router();

router.get("/", browseProducts);

export default router;
