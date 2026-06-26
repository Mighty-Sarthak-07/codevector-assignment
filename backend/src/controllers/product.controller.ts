import type { Request, Response, NextFunction } from "express";
import { getProducts } from "../services/product.service.js";

// Endpoint controller to browse products with keyset pagination and category filtering. 
export async function browseProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { limit: queryLimit, cursor, category } = req.query;

    let limit = 20;
    if (queryLimit !== undefined) {
      const parsed = parseInt(queryLimit as string, 10);
      if (isNaN(parsed) || parsed <= 0) {
        res.status(400).json({ error: "Limit must be a positive integer" });
        return;
      }
      if (parsed > 100) {
        res.status(400).json({ error: "Limit cannot exceed 100" });
        return;
      }
      limit = parsed;
    }
    
    if (category !== undefined && typeof category !== "string") {
      res.status(400).json({ error: "Category must be a string" });
      return;
    }

    if (cursor !== undefined && typeof cursor !== "string") {
      res.status(400).json({ error: "Cursor must be a string" });
      return;
    }

    const result = await getProducts({
      limit,
      cursor: cursor as string | undefined,
      category: category as string | undefined
    });

    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid cursor format") {
      res.status(400).json({ error: "Invalid cursor format" });
      return;
    }
    next(error);
  }
}
