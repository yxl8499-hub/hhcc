const fs = require("fs");
const path = require("path");
const https = require("https");

const outDir = path.join(__dirname, "assets", "images", "food");
fs.mkdirSync(outDir, { recursive: true });

const QUERIES = {
  "tomato-egg": "番茄炒蛋",
  "stir-fried-vegetables": "清炒时蔬",
  "potato-silk": "酸辣土豆丝",
  "braised-chicken-leg": "红烧鸡腿",
  "mapo-tofu": "麻婆豆腐",
  "steamed-fish": "清蒸鱼",
  "duck-leg": "鸭腿",
  "beef-noodles": "牛肉面",
  "malatang": "麻辣烫",
  "steamed-egg": "蒸蛋",
  "rice": "米饭",
  "mixed-grain-rice": "杂粮饭",
  "egg-drop-soup": "紫菜蛋花汤",
  "corn": "煮玉米",
  "kung-pao-chicken": "宫保鸡丁",
  "yuxiang-pork": "鱼香肉丝",
  "braised-eggplant": "红烧茄子",
  "beef-potato-stew": "土豆炖牛肉",
  "muxu-pork": "木须肉",
  "egg-fried-rice": "蛋炒饭",
  "mung-bean-soup": "绿豆汤",
  "chicken-breast-bowl": "鸡胸肉轻食",
  "poke-bowl": "波奇饭",
  "sandwich": "三明治",
  "shrimp-quinoa-salad": "虾仁沙拉",
  "soba-noodles": "荞麦面",
  "tuna-wrap": "金枪鱼卷",
  "bibimbap": "石锅拌饭",
  "burger": "汉堡",
  "chicken-breast": "鸡胸肉",
  "grilled-chicken-breast": "煎鸡胸肉",
  "oden": "关东煮",
  "onigiri": "饭团",
  "chicken-salad": "鸡胸肉沙拉",
  "beef-salad": "牛肉沙拉",
  "yogurt-bowl": "酸奶水果杯",
  "yogurt-banana": "酸奶香蕉",
  "soy-milk": "豆浆",
  "overnight-oats": "隔夜燕麦",
  "milk-oat-egg": "牛奶燕麦",
  "purple-potato-egg": "蒸紫薯",
  "konjac-cucumber-shrimp": "凉拌魔芋",
  "tomato-tofu-soup": "番茄豆腐汤",
  "tomato-chicken-soba": "番茄鸡胸面",
  "shrimp-broccoli-rice": "虾仁西兰花",
  "rice-cooker-chicken-rice": "电饭煲焖饭",
  "rice-cooker-beef-rice": "牛肉焖饭",
  "soba-egg-noodles": "荷包蛋面",
  "tuna-corn-salad": "金枪鱼沙拉",
  "tofu-seaweed-soup": "紫菜豆腐汤",
  "bagel": "贝果",
  "pumpkin-bread": "南瓜面包",
  "fruit-plate": "水果拼盘",
  "grilled-cold-noodles": "烤冷面",
  "steamed-bun": "馒头",
  "avocado": "牛油果",
  "boiled-potato": "蒸土豆",
  "boiled-egg": "水煮蛋",
  "banana": "香蕉",
  "apple": "苹果",
  "whole-wheat-bread": "全麦面包",
  "milk": "牛奶",
  "pumpkin": "蒸南瓜",
  "cucumber": "黄瓜",
  "oatmeal": "燕麦粥",
  "corn-cup": "即食玉米",
  "braised-chicken-rice": "黄焖鸡米饭",
  "spicy-malaxiangguo": "麻辣香锅",
  "maocai": "冒菜",
  "pig-trotter-rice": "猪脚饭",
  "claypot-rice": "煲仔饭",
  "pickled-cabbage-fish": "酸菜鱼",
  "chicken-pot": "鸡公煲",
  "shaxian-chicken-rice": "沙县鸡腿饭",
  "burger-mcdonalds": "麦当劳板烧鸡腿堡",
  "burger-kfc": "肯德基烤鸡腿堡",
  "burger-bk": "汉堡王皇堡",
  "burger-hualai": "华莱士汉堡",
  "burger-tastien": "塔斯汀汉堡",
  "burger-dicos": "德克士汉堡",
  "lemon-water": "柠檬水",
  "americano": "美式咖啡",
  "oat-latte": "燕麦拿铁",
  "sparkling-water": "气泡水",
  "coconut-water": "椰子水",
  "orange-juice": "鲜榨橙汁",
  "green-tea": "绿茶",
  "red-bean-drink": "红豆薏米水",
  "matcha-latte": "抹茶拿铁",
  "electrolyte-drink": "电解质水"
};

function getJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", Referer: "https://image.so.com/" } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`${res.statusCode} ${url}`));
        return;
      }
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(body));
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("json timeout")));
  });
}

function download(url, file) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", Referer: "https://image.so.com/" } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`${res.statusCode} ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        const isJpeg = buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
        const isPng = buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
        if (!isJpeg && !isPng) {
          reject(new Error("not image"));
          return;
        }
        fs.writeFileSync(file, buf);
        resolve();
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(20000, () => req.destroy(new Error("download timeout")));
  });
}

function pickUrl(results, query) {
  const exact = results.find((r) => {
    const title = (r.title || "").includes(query);
    const w = Number(r.width) || 0;
    return title && w >= 400 && (r.imgtype || "").toUpperCase() === "JPEG" && r.https && /^[\w.-]+\.(jpg|jpeg)$/i.test(r.imgkey || "");
  });
  const fallback = results.find((r) => {
    const w = Number(r.width) || 0;
    return w >= 400 && (r.imgtype || "").toUpperCase() === "JPEG" && r.https && /^[\w.-]+\.(jpg|jpeg)$/i.test(r.imgkey || "");
  });
  const item = exact || fallback;
  return item ? `https://${item.https}/${item.imgkey}` : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchList(query) {
  for (let i = 0; i < 3; i += 1) {
    try {
      const body = await getJson(
        `https://image.so.com/j?q=${encodeURIComponent(query)}&pn=1&sn=0`
      );
      if (!body.trim().startsWith("<")) return JSON.parse(body);
    } catch (err) {
      // keep trying
    }
    await sleep(2500);
  }
  throw new Error("json retry failed");
}

(async () => {
  let ok = 0;
  let fail = 0;
  const results = [];
  for (const [key, query] of Object.entries(QUERIES)) {
    const file = path.join(outDir, `${key}.jpg`);
    if (fs.existsSync(file) && fs.statSync(file).size > 8000) {
      results.push(`${key}: exists`);
      ok += 1;
      continue;
    }
    try {
      const data = await fetchList(query);
      const url = pickUrl(data.list || [], query);
      if (!url) throw new Error("no image");
      await download(url, file);
      results.push(`${key}: OK ${query}`);
      ok += 1;
    } catch (err) {
      results.push(`${key}: FAIL ${err.message}`);
      fail += 1;
    }
    await sleep(1200);
  }
  console.log(results.join("\n"));
  console.log(`done: ${ok} ok, ${fail} fail`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
