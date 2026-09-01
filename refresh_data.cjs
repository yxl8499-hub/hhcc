const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const code = fs.readFileSync(path.join(root, "data.js"), "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + "\n;globalThis.__OUT = { recipes: RECIPES, foods: FOODS };", ctx);
const { recipes, foods } = ctx.__OUT;
const errors = [];
const seen = new Set();
const REQUIRED = ["id", "name", "source", "mealTypes", "calories", "protein", "carbs", "fat", "price", "place", "dataSource", "dataUpdatedAt"];
const SOURCES = ["canteen", "takeout", "supermarket", "cook", "convenience", "bakery", "fruit", "stall", "single", "drink"];
const MEALS = ["breakfast", "lunch", "dinner", "snack"];
for (const r of recipes) {
  for (const f of REQUIRED) if (r[f] === undefined || r[f] === null || r[f] === "") errors.push(`${r.id}: missing ${f}`);
  if (seen.has(r.id)) errors.push(`duplicate id ${r.id}`);
  seen.add(r.id);
  if (!SOURCES.includes(r.source)) errors.push(`${r.id}: bad source ${r.source}`);
  if (!Array.isArray(r.mealTypes) || !r.mealTypes.length || r.mealTypes.some((m) => !MEALS.includes(m))) errors.push(`${r.id}: bad mealTypes`);
  if (!(Number(r.calories) >= 0)) errors.push(`${r.id}: bad calories`);
  if (r.imageUrl && !fs.existsSync(path.join(root, r.imageUrl))) errors.push(`${r.id}: image missing ${r.imageUrl}`);
  const diff = Math.floor((Date.now() - new Date(r.dataUpdatedAt + "T12:00:00")) / 86400000);
  if (diff > 90) errors.push(`${r.id}: data older than 90 days (${r.dataUpdatedAt})`);
}
for (const f of foods || []) {
  for (const k of ["name", "unit", "grams", "kcal"]) if (f[k] === undefined) errors.push(`food missing ${k}: ${JSON.stringify(f)}`);
}
console.log(`recipes=${recipes.length} foods=${foods.length} errors=${errors.length}`);
errors.slice(0, 30).forEach((e) => console.log("ERR", e));
process.exit(errors.length ? 1 : 0);