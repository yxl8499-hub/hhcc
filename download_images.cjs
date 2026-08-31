const fs = require("fs");
const path = require("path");
const https = require("https");

const urls = [
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=640&q=70",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=640&q=70"
];

const outDir = path.join(__dirname, "assets", "images");
fs.mkdirSync(outDir, { recursive: true });

function fileName(url) {
  return url.split("?")[0].split("/").pop() + ".jpg";
}

function download(url) {
  return new Promise((resolve, reject) => {
    const file = path.join(outDir, fileName(url));
    const done = fs.existsSync(file) && fs.statSync(file).size > 5000;
    if (done) {
      resolve({ url, file, skipped: true });
      return;
    }
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`${res.statusCode} ${url}`));
        return;
      }
      const ws = fs.createWriteStream(file);
      res.pipe(ws);
      ws.on("finish", () => {
        ws.close();
        resolve({ url, file, skipped: false });
      });
      ws.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(20000, () => req.destroy(new Error("timeout")));
  });
}

(async () => {
  let ok = 0;
  let skip = 0;
  for (const url of urls) {
    const r = await download(url);
    if (r.skipped) skip += 1;
    else ok += 1;
    console.log(r.skipped ? "SKIP" : "OK", fileName(url));
  }
  console.log(`done: ${ok} downloaded, ${skip} skipped`);
})().catch((e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
