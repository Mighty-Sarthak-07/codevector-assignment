import { prisma } from "./prisma.service.js";

export interface CursorPayload {
  updatedAt: string;
  id: string;
}

export interface GetProductsParams {
  limit: number;
  cursor?: string | undefined;
  category?: string | undefined;
}

export interface PaginatedProductsResponse {
  products: any[];
  nextCursor: string | null;
  hasMore: boolean;
}

// Encodes the cursor object to a URL-safe Base64 string.

function serializeCursor(payload: CursorPayload): string {
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString("base64url");
}

// Decodes the URL-safe Base64 string back to a cursor object.

function deserializeCursor(cursorStr: string): CursorPayload | null {
  try {
    const json = Buffer.from(cursorStr, "base64url").toString("utf8");
    const payload = JSON.parse(json);
    if (payload && typeof payload.updatedAt === "string" && typeof payload.id === "string") {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getProducts(params: GetProductsParams): Promise<PaginatedProductsResponse> {
  const { limit, cursor, category } = params;

  const whereClause: any = {};
  if (category) {
    whereClause.category = category;
  }

  // Handle keyset pagination filtering
  if (cursor) {
    const decoded = deserializeCursor(cursor);
    if (!decoded) {
      throw new Error("Invalid cursor format");
    }

    const cursorDate = new Date(decoded.updatedAt);
    const cursorId = decoded.id;

    // Keyset pagination logic for descending sort order:
    // (updatedAt < cursorDate) OR (updatedAt == cursorDate AND id < cursorId)
    const cursorFilter = {
      OR: [
        {
          updatedAt: {
            lt: cursorDate
          }
        },
        {
          updatedAt: cursorDate,
          id: {
            lt: cursorId
          }
        }
      ]
    };

    if (category) {
      whereClause.AND = [cursorFilter];
    } else {
      Object.assign(whereClause, cursorFilter);
    }
  }

  // Fetch limit + 1 products to determine if hasMore is true
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: [
      { updatedAt: "desc" },
      { id: "desc" }
    ],
    take: limit + 1
  });

  const hasMore = products.length > limit;
  const resultProducts = hasMore ? products.slice(0, limit) : products;

  let nextCursor: string | null = null;
  if (hasMore && resultProducts.length > 0) {
    const lastProduct = resultProducts[resultProducts.length - 1];
    if (lastProduct) {
      nextCursor = serializeCursor({
        updatedAt: lastProduct.updatedAt.toISOString(),
        id: lastProduct.id
      });
    }
  }

  return {
    products: resultProducts,
    nextCursor,
    hasMore
  };
}
