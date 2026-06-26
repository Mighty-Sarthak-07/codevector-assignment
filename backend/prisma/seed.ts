import "dotenv/config";
import process from "node:process";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const categories = [
  "Electronics",
  "Apparel",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
  "Tools & Home Improvement",
  "Office Products"
];

const adjectives = ["Premium", "Sleek", "Ergonomic", "Eco-Friendly", "Smart", "Compact", "Heavy-Duty", "Portable", "Wireless", "Waterproof", "Ultra", "Classic", "Deluxe", "Vintage", "Modern"];
const materials = ["Wooden", "Metal", "Plastic", "Leather", "Silicone", "Stainless Steel", "Aluminum", "Carbon Fiber", "Glass", "Ceramic"];
const nouns = ["Gadget", "Widget", "Organizer", "Charger", "Speaker", "Backpack", "Tumbler", "Keyboard", "Mouse", "Lamp", "Tool", "Stand", "Case", "Adapter", "Sensor"];

function generateProductName(index: number): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const mat = materials[Math.floor(Math.random() * materials.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${mat} ${noun} #${index}`;
}

function generatePrice(): number {
  const val = Math.random() * 995 + 4.99;
  return Math.round(val * 100) / 100;
}

function getRandomCategory(): string {
  return categories[Math.floor(Math.random() * categories.length)] as string;
}

function getRandomDate(): Date {
  const now = new Date();
  const pastMs = Math.random() * 30 * 24 * 60 * 60 * 1000; // last 30 days
  return new Date(now.getTime() - pastMs);
}

async function main() {
  const totalCount = 200000;
  const batchSize = 1000;
  const totalBatches = totalCount / batchSize;

  console.log(`Starting database seed of ${totalCount} products in ${totalBatches} batches...`);
  const startTime = Date.now();

  for (let batch = 0; batch < totalBatches; batch++) {
    const productsData = [];
    for (let i = 0; i < batchSize; i++) {
      const productIndex = batch * batchSize + i + 1;
      const date = getRandomDate();
      productsData.push({
        name: generateProductName(productIndex),
        category: getRandomCategory(),
        price: generatePrice(),
        createdAt: date,
        updatedAt: date,
      });
    }

    await prisma.product.createMany({
      data: productsData,
    });

    if ((batch + 1) % 10 === 0 || batch + 1 === totalBatches) {
      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      const progressPercent = (((batch + 1) / totalBatches) * 100).toFixed(0);
      console.log(`[Seed Progress] Inserted ${(batch + 1) * batchSize} / ${totalCount} products (${progressPercent}%) in ${elapsedSec}s`);
    }
  }

  const finalCount = await prisma.product.count();
  console.log(`Database seeding completed! Total products now in database: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
