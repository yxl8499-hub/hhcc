const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const KEYS = {
  records: "zyx_records",
  settings: "zyx_settings",
  favorites: "zyx_favorites",
  recent: "zyx_recent",
  recipeTags: "zyx_recipe_tags",
  feedback: "zyx_feedback"
};

const SOURCE_LABELS = {
  canteen: "食堂",
  takeout: "外卖",
  supermarket: "超市",
  cook: "自己做饭",
  convenience: "便利店",
  bakery: "烘焙店",
  fruit: "水果店",
  stall: "小吃摊",
  single: "单独食物",
  drink: "饮品"
};

const SOURCE_EMOJI = {
  canteen: "🍱",
  takeout: "🛵",
  supermarket: "🛒",
  cook: "🍳",
  convenience: "🏪",
  bakery: "🥐",
  fruit: "🍎",
  stall: "🍢",
  single: "🥖",
  drink: "🥤"
};

const MEAL_LABELS = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
  snack: "加餐"
};

const TAG_OPTIONS = ["高蛋白", "低脂", "素食", "清真", "无辣", "少油", "宿舍可做", "快手"];

const SNACK_SCENES = {
  cardio: "有氧运动后",
  strength: "力量训练后",
  ball: "球类运动后",
  study: "学习熬夜",
  craving: "嘴馋解馋"
};

const FEEDBACK_TYPES = ["热量/营养错误", "价格错误", "图片不符", "数据过期", "其他"];

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v-4"/><path d="M12 15V7"/><path d="M17 15v-7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  flame: '<path d="M12 3c1.2 2.7-1.8 4.3-1.8 7A3.6 3.6 0 0 0 13.4 14c1.8 0 3.2-1.4 3.2-3.2 0-1.6-.8-2.6-.8-3.8 1.5 1 3.2 3 3.2 5.5A6.8 6.8 0 0 1 12 22a6.8 6.8 0 0 1-6.8-6.8c0-4.4 3.4-6.2 6.8-12.2z"/>',
  camera: '<path d="M4 7h3l2-2h6l2 2h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
  heart: '<path d="M12 21C5 16 3 12 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 12 19 16 12 21z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  upload: '<path d="M12 15V3m0 0 4 4m-4-4L8 7"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.3M21 3v6h-6"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  leaf: '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z"/><path d="M4 20c4-6 8-9 12-11"/>'
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

function esc(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function fmtDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function todayStr() {
  return fmtDate(new Date());
}

function addDays(dateStr, delta) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + delta);
  return fmtDate(d);
}

function lastNDays(n) {
  const arr = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    arr.push(addDays(todayStr(), -i));
  }
  return arr;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // 存储被禁用（file:// 或隐私模式）时只保留内存状态，避免记录操作报错。
  }
}

function readPhotoFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("image error"));
      img.onload = () => {
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function debounce(fn, ms) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

let storageOk = true;
function checkStorage() {
  try {
    const k = "__zyx_probe__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
  } catch (err) {
    storageOk = false;
  }
}
function storageWarningHtml() {
  return storageOk ? "" : `<div class="storage-warning">当前浏览器禁止本地存储，记录和设置在刷新后会丢失；请使用线上版本或允许本站本地存储。</div>`;
}
checkStorage();

const state = {
  tab: "home",
  pickIds: [],
  records: loadJSON(KEYS.records, []),
  settings: Object.assign(
    { dailyGoal: 1600, sources: [], dislikes: [] },
    loadJSON(KEYS.settings, {})
  ),
  favorites: loadJSON(KEYS.favorites, []),
  recent: loadJSON(KEYS.recent, []),
  customTags: loadJSON(KEYS.recipeTags, {}),
  filters: { q: "", source: "all", meal: "all", cal: "all", price: "all", snackScene: "all", sort: "default" },
  recordDate: todayStr(),
  calDate: null,
  recordSubTab: "log",
  addMode: "recipe",
  addMealType: "lunch",
  addRecipeId: null,
  addQ: "",
  foodQ: "",
  servings: 1,
  estimateDraft: [],
  addPhoto: null,
  feedback: loadJSON(KEYS.feedback, []),
  feedbackRecipeId: null,
  feedbackType: "",
  feedbackNote: "",
  feedbackDone: false,
  detailId: null
};

function saveSettings() {
  saveJSON(KEYS.settings, state.settings);
}

function guessMeal() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return "breakfast";
  if (hour >= 10 && hour < 15) return "lunch";
  if (hour >= 17 && hour < 21) return "dinner";
  return "snack";
}

function freshInfo(recipe) {
  const diff = Math.floor((new Date(todayStr()) - new Date(recipe.dataUpdatedAt)) / 86400000);
  const short = recipe.dataUpdatedAt.slice(5);
  if (diff > 90) return { label: "数据可能过期", cls: "danger" };
  if (diff > 60) return { label: `更新 ${short} · 即将校验`, cls: "warm" };
  return { label: `更新 ${short}`, cls: "blue" };
}

function totalsForDate(date) {
  const recs = state.records.filter((r) => r.date === date);
  return recs.reduce(
    (acc, r) => {
      acc.calories += Number(r.calories) || 0;
      acc.protein += Number(r.protein) || 0;
      acc.carbs += Number(r.carbs) || 0;
      acc.fat += Number(r.fat) || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function recordGroups(date) {
  const recs = state.records
    .filter((r) => r.date === date)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  return ["breakfast", "lunch", "dinner", "snack"]
    .map((mt) => ({ mealType: mt, items: recs.filter((r) => r.mealType === mt) }))
    .filter((g) => g.items.length);
}

function computeStreak() {
  let streak = 0;
  let d = new Date();
  if (!state.records.some((r) => r.date === fmtDate(d))) {
    d.setDate(d.getDate() - 1);
  }
  while (state.records.some((r) => r.date === fmtDate(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function pickPool() {
  const meal = guessMeal();
  const disliked = state.settings.dislikes || [];
  let pool = RECIPES.filter((r) => r.mealTypes.includes(meal));
  if (disliked.length) {
    pool = pool.filter((r) => !disliked.some((t) => r.tags.includes(t)));
  }
  if (!pool.length) {
    pool = RECIPES.filter((r) => !disliked.some((t) => r.tags.includes(t)));
  }
  if (!pool.length) pool = RECIPES;
  const pref = state.settings.sources || [];
  if (pref.length) {
    const preferred = pool.filter((r) => pref.includes(r.source));
    if (preferred.length) pool = preferred;
  }
  return pool;
}

function pickBatch() {
  return [...pickPool()].sort(() => Math.random() - 0.5).slice(0, 3);
}

function currentPicks() {
  const valid = state.pickIds.filter((id) => RECIPES.some((r) => r.id === id));
  if (valid.length < 3) {
    state.pickIds = pickBatch().map((r) => r.id);
  }
  return state.pickIds.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean);
}

function refreshPicks() {
  state.pickIds = pickBatch().map((r) => r.id);
  renderHome();
}

function pickCardHtml(recipe) {
  return `<section class="surface pick-card" data-action="open-detail" data-id="${recipe.id}">
    <img class="pick-thumb" src="${recipe.imageUrl}" alt="${esc(recipe.name)}" onerror="imgFallback(this, '${recipe.emoji}', 'pick-thumb')">
    <div class="pick-info">
      <h3>${esc(recipe.name)}</h3>
      <div class="pick-meta">
        <span class="badge">${SOURCE_LABELS[recipe.source]}</span>
        <span class="badge warm">${recipe.calories} kcal</span>
        <span class="badge blue">¥${recipe.price}</span>
      </div>
    </div>
    <button class="icon-btn" data-action="record-recipe" data-id="${recipe.id}" aria-label="记录这餐">${icon("plus")}</button>
  </section>`;
}

function imgFallback(img, emoji, cls) {
  const holder = document.createElement("div");
  holder.className = `${cls} fallback`;
  holder.textContent = emoji;
  img.replaceWith(holder);
}

window.imgFallback = imgFallback;

function topbarHtml(title, rightHtml = "") {
  if (state.tab === "home") {
    return `<header class="topbar"><div class="brand"><span class="brand-dot"></span>再e亿下</div><button class="icon-btn" data-action="add-record" aria-label="记一餐">${icon("plus")}</button></header>`;
  }
  return `<header class="topbar"><div class="page-title">${title}</div>${rightHtml}</header>`;
}

function empty(text, emoji = "🥗") {
  return `<div class="empty"><span class="empty-icon">${emoji}</span>${text}</div>`;
}

function renderTabbar() {
  const tabs = [
    ["home", "首页", "home"],
    ["recipes", "菜谱", "book"],
    ["records", "记录", "chart"],
    ["mine", "我的", "user"]
  ];
  $("#tabbar").innerHTML = tabs
    .map(
      ([tab, label, ic]) =>
        `<button class="tab-btn${state.tab === tab ? " active" : ""}" data-action="tab" data-value="${tab}" aria-label="${label}">${icon(ic)}<span>${label}</span></button>`
    )
    .join("");
}

function renderAll() {
  renderTabbar();
  if (state.tab === "home") renderHome();
  else if (state.tab === "recipes") renderRecipes();
  else if (state.tab === "records") renderRecordView();
  else renderMine();
}

function switchTab(tab) {
  state.tab = tab;
  renderAll();
  window.scrollTo({ top: 0 });
}

function toast(msg) {
  const root = $("#toast-root");
  root.innerHTML = `<div class="toast show">${esc(msg)}</div>`;
  const el = $(".toast", root);
  setTimeout(() => {
    if (el) el.classList.remove("show");
  }, 1800);
}

function closeModal() {
  $("#modal-root").innerHTML = "";
  state.detailId = null;
}

function markRecent(recipeId) {
  state.recent = [recipeId, ...state.recent.filter((id) => id !== recipeId)].slice(0, 8);
  saveJSON(KEYS.recent, state.recent);
}

function addRecord(record) {
  state.records.push({
    id: uid(),
    date: record.date || todayStr(),
    time: record.time || new Date().toTimeString().slice(0, 5),
    mealType: record.mealType,
    name: record.name,
    source: record.source || "",
    calories: Math.round(record.calories || 0),
    protein: Math.round(record.protein || 0),
    carbs: Math.round(record.carbs || 0),
    fat: Math.round(record.fat || 0),
    servings: record.servings || 1,
    note: record.note || "",
    photo: record.photo || "",
    createdAt: Date.now()
  });
  saveJSON(KEYS.records, state.records);
}

function quickRecordRecipe(id) {
  const recipe = RECIPES.find((r) => r.id === id);
  if (!recipe) return;
  addRecord({
    name: recipe.name,
    mealType: guessMeal(),
    source: recipe.id,
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    servings: 1
  });
  markRecent(recipe.id);
  closeModal();
  renderAll();
  toast("已记录");
}

function toggleFavorite(id) {
  const has = state.favorites.includes(id);
  state.favorites = has ? state.favorites.filter((x) => x !== id) : [...state.favorites, id];
  saveJSON(KEYS.favorites, state.favorites);
  toast(has ? "已取消收藏" : "已收藏");
  if (state.detailId) openDetail(id);
  else renderAll();
}

function recipeTagsOf(id) {
  return state.customTags[id] || [];
}

function customTagOptions() {
  return [...new Set(Object.values(state.customTags).flat())];
}

function toggleRecipeTag(id, tag) {
  const arr = recipeTagsOf(id);
  state.customTags[id] = arr.includes(tag) ? arr.filter((t) => t !== tag) : [...arr, tag];
  saveJSON(KEYS.recipeTags, state.customTags);
  if (state.detailId) openDetail(id);
  else renderAll();
}

function addRecipeTag(id) {
  const input = $("#customTagInput");
  const label = input.value.trim();
  if (!label) {
    toast("先输入场景名称");
    return;
  }
  const arr = recipeTagsOf(id);
  if (!arr.includes(label)) {
    state.customTags[id] = [...arr, label];
    saveJSON(KEYS.recipeTags, state.customTags);
    saveJSON(KEYS.feedback, state.feedback);
  }
  openDetail(id);
}

function openFeedbackModal(recipeId) {
  state.feedbackRecipeId = recipeId || null;
  state.feedbackType = "";
  state.feedbackNote = "";
  state.feedbackDone = false;
  $("#modal-root").insertAdjacentHTML("beforeend", feedbackOverlayHtml());
  const note = $("#feedbackNote");
  if (note) note.addEventListener("input", (e) => { state.feedbackNote = e.target.value; });
}

function closeFeedback() {
  const el = $("#feedback-overlay");
  if (el) el.remove();
  else closeModal();
}

function renderFeedbackOverlay() {
  const el = $("#feedback-overlay");
  if (el) el.outerHTML = feedbackOverlayHtml();
  const note = $("#feedbackNote");
  if (note) note.addEventListener("input", (e) => { state.feedbackNote = e.target.value; });
}

function feedbackRecipe() {
  return state.feedbackRecipeId ? RECIPES.find((r) => r.id === state.feedbackRecipeId) : null;
}

function feedbackText() {
  const recipe = feedbackRecipe();
  return [
    "[再e亿下纠错]",
    "菜谱：" + (recipe ? recipe.name : "整体"),
    "类型：" + (state.feedbackType || "其他"),
    "说明：" + (state.feedbackNote.trim() || "无"),
    "时间：" + new Date().toLocaleString()
  ].join("\n");
}

function feedbackOverlayHtml() {
  const recipe = feedbackRecipe();
  const done = state.feedbackDone;
  return `<div class="sheet-backdrop feedback-overlay" id="feedback-overlay" data-action="close-feedback">
    <div class="sheet">
      <div class="sheet-head"><h2>纠错与建议</h2><button class="icon-btn" data-action="close-feedback" aria-label="关闭">${icon("x")}</button></div>
      ${done ? `
        <div class="feedback-done">
          <p>已记录，谢谢反馈。</p>
          <div class="feedback-preview">${esc(feedbackText())}</div>
          <button class="btn-ghost btn-block" data-action="feedback-copy">${icon("copy")} 复制反馈内容</button>
          <button class="btn-primary btn-block" style="margin-top:10px" data-action="close-feedback">完成</button>
        </div>` : `
        <p class="subtitle" style="margin-bottom:10px">${recipe ? `菜谱：${esc(recipe.name)}` : "针对菜谱库整体问题"}</p>
        <div class="filter-scroll">${FEEDBACK_TYPES.map((t) => `<button class="chip${state.feedbackType === t ? " active" : ""}" data-action="feedback-type" data-value="${esc(t)}">${t}</button>`).join("")}</div>
        <div class="form-grid" style="margin-top:12px">
          <div class="field"><label>问题说明（可选）</label><textarea id="feedbackNote" placeholder="例如：这份菜的热量应该更高"></textarea></div>
          <button class="btn-primary btn-block" data-action="feedback-submit">${icon("check")} 提交反馈</button>
        </div>`}
    </div>
  </div>`;
}
function submitFeedback() {
  const recipe = feedbackRecipe();
  state.feedback.push({
    id: uid(),
    recipeId: state.feedbackRecipeId || "",
    recipeName: recipe ? recipe.name : "",
    type: state.feedbackType || "其他",
    note: state.feedbackNote.trim(),
    createdAt: Date.now()
  });
  saveJSON(KEYS.feedback, state.feedback);
  state.feedbackDone = true;
  renderFeedbackOverlay();
}

function copyFeedback() {
  const text = feedbackText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("已复制")).catch(() => toast("复制失败"));
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("已复制");
  }
}

function openDetail(id) {
  const recipe = RECIPES.find((r) => r.id === id);
  if (!recipe) return;
  state.detailId = id;
  const fresh = freshInfo(recipe);
  const fav = state.favorites.includes(id);
  $("#modal-root").innerHTML = `
    <div class="detail">
      <div class="detail-hero">
        <img src="${recipe.imageUrl}" alt="${esc(recipe.name)}" onerror="imgFallback(this, '${recipe.emoji}', 'detail-hero')">
        <div class="detail-topbar">
          <button class="glass-btn" data-action="close-detail" aria-label="返回">${icon("back")}</button>
          <button class="glass-btn${fav ? " active" : ""}" data-action="toggle-fav" data-id="${recipe.id}" aria-label="收藏">${icon("heart")}</button>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-title-row">
          <div>
            <h2>${esc(recipe.name)}</h2>
            <div style="margin-top:6px">${recipe.tags.map((t) => `<span class="badge">${t}</span>`).join(" ")}</div>
          </div>
          <span class="price">¥${recipe.price}</span>
        </div>
        <div class="info-grid">
          <div class="info-cell"><b>${recipe.calories}</b><span>热量 kcal</span></div>
          <div class="info-cell"><b>${recipe.protein}g</b><span>蛋白质</span></div>
          <div class="info-cell"><b>${recipe.carbs}g</b><span>碳水</span></div>
          <div class="info-cell"><b>${recipe.fat}g</b><span>脂肪</span></div>
        </div>
        <div class="detail-section">
          <h3>来源与位置</h3>
          <div class="detail-row"><span>位置</span><div>${esc(recipe.place)}</div></div>
          <div class="detail-row"><span>数据来源</span><div>${esc(recipe.dataSource)}</div></div>
          <div class="detail-row"><span>更新时间</span><div><span class="badge ${fresh.cls}">${fresh.label}</span></div></div>
          <button class="feedback-link" data-action="open-feedback" data-id="${recipe.id}">${icon("alert")} 纠错</button>
        </div>
        ${recipe.allergens && recipe.allergens.length ? `<div class="detail-section"><h3>忌口提示</h3><div>${recipe.allergens.map((a) => `<span class="badge danger">${a}</span>`).join(" ")}</div></div>` : ""}
        ${recipe.mealTypes.includes("snack") ? `
          <div class="detail-section">
            <h3>加餐场景</h3>
            <div class="tag-chip-row">
              ${Object.keys(SNACK_SCENES).map((k) => `<button class="chip${recipeTagsOf(recipe.id).includes(k) ? " active" : ""}" data-action="toggle-recipe-tag" data-id="${recipe.id}" data-value="${k}">${SNACK_SCENES[k]}</button>`).join("")}
              ${recipeTagsOf(recipe.id).filter((t) => !SNACK_SCENES[t]).map((t) => `<button class="chip active" data-action="toggle-recipe-tag" data-id="${recipe.id}" data-value="${esc(t)}">${esc(t)}</button>`).join("")}
            </div>
            <div class="tag-add-row">
              <input id="customTagInput" maxlength="8" placeholder="自定义场景，如：游泳后">
              <button class="tag-add-btn" data-action="add-recipe-tag" data-id="${recipe.id}">添加</button>
            </div>
          </div>` : ""}
        ${recipe.ingredients && recipe.ingredients.length ? `
          <div class="detail-section">
            <h3>食材清单</h3>
            <div class="ingredient-list">${recipe.ingredients.map((i) => `<span>${esc(i)}</span>`).join("")}</div>
          </div>` : ""}
        ${recipe.steps && recipe.steps.length ? `
          <div class="detail-section">
            <h3>做法步骤</h3>
            <ol class="step-list">${recipe.steps.map((s, i) => `<li><em>${i + 1}</em><span>${esc(s)}</span></li>`).join("")}</ol>
          </div>` : ""}
      </div>
      <div class="detail-actions">
        <button class="btn-ghost" data-action="toggle-fav" data-id="${recipe.id}">${icon("heart")} ${fav ? "已收藏" : "收藏"}</button>
        <button class="btn-primary" data-action="record-recipe" data-id="${recipe.id}">${icon("check")} 记录这餐</button>
      </div>
    </div>`;
}

function renderHome() {
  const date = todayStr();
  const totals = totalsForDate(date);
  const goal = state.settings.dailyGoal;
  const pct = Math.min(100, Math.round((totals.calories / goal) * 100));
  const remaining = goal - totals.calories;
  const picks = currentPicks();
  const recents = state.recent.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean);
  const favs = state.favorites.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean);
  $("#app").innerHTML = `
    ${topbarHtml()}${storageWarningHtml()}
    <div class="view-body">
      <p class="subtitle">今天也要好好吃饭</p>
      <section class="surface calorie-card">
        <div class="ring" style="--p:${pct}">
          <div class="ring-inner"><strong>${totals.calories}</strong><span>已摄入 kcal</span></div>
        </div>
        <div class="calorie-meta">
          <div><span>每日目标</span><b>${goal}</b></div>
          <div><span>剩余额度</span><b style="color:${remaining >= 0 ? "var(--green-deep)" : "var(--danger)"}">${remaining >= 0 ? remaining : `超 ${Math.abs(remaining)}`}</b></div>
        </div>
      </section>
      <div class="macro-row">
        <div class="macro-cell"><b>${totals.protein}g</b><span>蛋白质</span></div>
        <div class="macro-cell"><b>${totals.carbs}g</b><span>碳水</span></div>
        <div class="macro-cell"><b>${totals.fat}g</b><span>脂肪</span></div>
      </div>
      <div class="action-row">
        <button class="btn-primary" data-action="add-record">${icon("plus")} 记一餐</button>
        <button class="btn-ghost" data-action="goto-recipes">${icon("book")} 找菜谱</button>
      </div>
      <div class="section-title"><span>帮我选</span><button class="link" data-action="pick-again">${icon("refresh")} 换一批</button></div>
      ${picks.map(pickCardHtml).join("")}
      ${recents.length ? `
        <div class="section-title"><span>最近吃过</span><button class="link" data-action="goto-recipes">更多</button></div>
        <div class="horizontal-list">${recents.map(miniCardHtml).join("")}</div>` : ""}
      ${favs.length ? `
        <div class="section-title"><span>我的收藏</span><button class="link" data-action="goto-recipes">更多</button></div>
        <div class="horizontal-list">${favs.map(miniCardHtml).join("")}</div>` : ""}
    </div>`;
}

function miniCardHtml(recipe) {
  return `<article class="mini-card" data-action="open-detail" data-id="${recipe.id}">
    <img src="${recipe.imageUrl}" alt="${esc(recipe.name)}" loading="lazy" onerror="imgFallback(this, '${recipe.emoji}', 'mini-card')">
    <div class="mini-card-body"><h4>${esc(recipe.name)}</h4><p>${recipe.calories} kcal · ¥${recipe.price}</p></div>
  </article>`;
}

function chipHtml(options, current, type, labels) {
  return options
    .map(
      (v) =>
        `<button class="chip${current === v ? " active" : ""}" data-action="recipe-filter" data-type="${type}" data-value="${v}">${labels[v]}</button>`
    )
    .join("");
}

function snackSceneChipsHtml(current) {
  const labels = { all: "全部", ...SNACK_SCENES };
  const options = ["all", ...Object.keys(SNACK_SCENES)];
  for (const tag of customTagOptions()) {
    if (!labels[tag]) {
      labels[tag] = tag;
      options.push(tag);
    }
  }
  return chipHtml(options, current, "snackScene", labels);
}

function setupOverflowGroups() {
  $$(".overflow-group").forEach((group) => {
    const type = group.dataset.type;
    const scroll = $(".filter-scroll", group);
    if (!scroll) return;
    const chips = $$(".chip", scroll);
    if (scroll.scrollWidth <= scroll.clientWidth + 4) return;
    const maxW = scroll.clientWidth - 72;
    let used = 0;
    const visible = [];
    for (const chip of chips) {
      const w = chip.offsetWidth + 8;
      if (used + w <= maxW || visible.length === 0) {
        used += w;
        visible.push(chip);
      } else {
        break;
      }
    }
    const hidden = chips.slice(visible.length);
    if (!hidden.length) return;
    const moreBtn = document.createElement("button");
    moreBtn.type = "button";
    moreBtn.className = "chip more-chip";
    moreBtn.dataset.more = type;
    moreBtn.innerHTML = `更多 ${icon("chevron")}`;
    const panel = document.createElement("div");
    panel.className = "filter-dropdown";
    panel.dataset.morePanel = type;
    panel.hidden = true;
    hidden.forEach((chip) => panel.appendChild(chip));
    scroll.appendChild(moreBtn);
    group.appendChild(panel);
  });
}

function toggleMorePanel(type) {
  const panel = $(`[data-more-panel="${type}"]`);
  const btn = $(`[data-more="${type}"]`);
  if (!panel) return;
  const willOpen = panel.hidden;
  $$(".filter-dropdown").forEach((p) => {
    p.hidden = true;
  });
  $$(".more-chip").forEach((b) => b.classList.remove("active"));
  if (willOpen) {
    panel.hidden = false;
    if (btn) btn.classList.add("active");
  }
}

function renderRecipes() {
  const f = state.filters;
  $("#app").innerHTML = `
    ${topbarHtml("菜谱库", `<span class="subtitle">${RECIPES.length} 个通用方案</span>`)}${storageWarningHtml()}
    <div class="view-body">
      <div class="search-wrap">${icon("search")}<input class="search-input" id="recipeSearch" placeholder="搜菜名、食材或位置" value="${esc(f.q)}"></div>
      <div class="filter-group overflow-group" data-type="source">
        <div class="filter-group-label">来源</div>
        <div class="filter-scroll">${chipHtml(["all", ...Object.keys(SOURCE_LABELS)], f.source, "source", { all: "全部", ...SOURCE_LABELS })}</div>
      </div>
      <div class="filter-group">
        <div class="filter-group-label">餐次</div>
        <div class="filter-scroll">${chipHtml(["all", "breakfast", "lunch", "dinner", "snack"], f.meal, "meal", { all: "全部", ...MEAL_LABELS })}</div>
      </div>
      ${f.meal === "snack" ? `
      <div class="filter-group overflow-group" data-type="snackScene">
        <div class="filter-group-label">加餐场景</div>
        <div class="filter-scroll">${snackSceneChipsHtml(f.snackScene)}</div>
      </div>` : ""}
      <div class="filter-group overflow-group" data-type="cal">
        <div class="filter-group-label">热量（kcal）</div>
        <div class="filter-scroll">${chipHtml(["all", "low", "mid", "high"], f.cal, "cal", { all: "全部", low: "≤400 kcal", mid: "400-600 kcal", high: ">600 kcal" })}</div>
      </div>
      <div class="filter-group">
        <div class="filter-group-label">预算（¥）</div>
        <div class="filter-scroll">${chipHtml(["all", "low", "mid", "high"], f.price, "price", { all: "全部", low: "≤¥10", mid: "¥10-15", high: ">¥15" })}</div>
      </div>
      <div class="filter-group overflow-group" data-type="sort">
        <div class="filter-group-label">排序</div>
        <div class="filter-scroll">${chipHtml(["default", "calAsc", "priceAsc", "timeAsc"], f.sort, "sort", { default: "默认排序", calAsc: "热量从低到高", priceAsc: "价格从低到高", timeAsc: "制作时间从短到长" })}</div>
      </div>
      <div id="recipeResults"></div>
    </div>`;
  renderRecipeResults();
  $("#recipeSearch").addEventListener("input", debounce((e) => {
    state.filters.q = e.target.value;
    renderRecipeResults();
  }, 250));
  setupOverflowGroups();
}

function getFilteredRecipes() {
  const f = state.filters;
  const q = f.q.trim().toLowerCase();
  let list = RECIPES.slice();
  if (q) {
    list = list.filter((r) =>
      [r.name, r.place, ...(r.tags || []), ...(r.ingredients || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  if (f.source !== "all") list = list.filter((r) => r.source === f.source);
  if (f.meal !== "all") list = list.filter((r) => r.mealTypes.includes(f.meal));
  if (f.meal === "snack" && f.snackScene !== "all") {
    const scene = f.snackScene;
    const builtIn = Object.prototype.hasOwnProperty.call(SNACK_SCENES, scene);
    list = list.filter((r) => {
      if (builtIn) {
        return (r.snackScenes || []).includes(scene) || recipeTagsOf(r.id).includes(scene);
      }
      return recipeTagsOf(r.id).includes(scene);
    });
  }
  if (f.cal === "low") list = list.filter((r) => r.calories <= 400);
  if (f.cal === "mid") list = list.filter((r) => r.calories > 400 && r.calories <= 600);
  if (f.cal === "high") list = list.filter((r) => r.calories > 600);
  if (f.price === "low") list = list.filter((r) => r.price <= 10);
  if (f.price === "mid") list = list.filter((r) => r.price > 10 && r.price <= 15);
  if (f.price === "high") list = list.filter((r) => r.price > 15);
  if (f.sort === "calAsc") list.sort((a, b) => a.calories - b.calories);
  if (f.sort === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (f.sort === "timeAsc") list.sort((a, b) => (a.cookTime || 99) - (b.cookTime || 99));
  return list;
}

function renderRecipeResults() {
  const el = $("#recipeResults");
  if (!el) return;
  try {
    const list = getFilteredRecipes();
    if (!list.length) {
      el.innerHTML = empty("没有找到符合条件的菜谱");
      return;
    }
    el.innerHTML = `<div class="recipe-list">${list.map(recipeCardHtml).join("")}</div>`;
  } catch (err) {
    el.innerHTML = empty("搜索出了一点问题，请换个关键词");
  }
}

function recipeCardHtml(recipe) {
  const fresh = freshInfo(recipe);
  return `<article class="recipe-card" data-action="open-detail" data-id="${recipe.id}">
    <img class="recipe-thumb" src="${recipe.imageUrl}" alt="${esc(recipe.name)}" loading="lazy" onerror="imgFallback(this, '${recipe.emoji}', 'recipe-thumb')">
    <div class="recipe-main">
      <h3>${esc(recipe.name)}</h3>
      <div class="recipe-tags">${recipe.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="recipe-foot">
        <span>${SOURCE_LABELS[recipe.source]}</span>
        <b>${recipe.calories} kcal</b>
        <span>¥${recipe.price}</span>
        <span class="badge ${fresh.cls}">${fresh.label}</span>
      </div>
    </div>
    <button class="recipe-add" data-action="record-recipe" data-id="${recipe.id}" aria-label="记录这餐">${icon("plus")}</button>
  </article>`;
}

function openCalendar() {
  state.calDate = `${state.recordDate.slice(0, 7)}-01`;
  renderCalendarModal();
}

function closeCalendar() {
  const el = $("#calendar-overlay");
  if (el) el.remove();
}

function renderCalendarModal() {
  const [y, m] = state.calDate.slice(0, 7).split("-").map(Number);
  const today = todayStr();
  const first = new Date(y, m - 1, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const recordDates = new Set(state.records.map((r) => r.date));
  const week = ["日", "一", "二", "三", "四", "五", "六"].map((w) => `<span class="cal-week">${w}</span>`).join("");
  let cells = "";
  for (let i = 0; i < startDow; i += 1) cells += '<span class="cal-empty"></span>';
  for (let d = 1; d <= daysInMonth; d += 1) {
    const ds = `${y}-${pad2(m)}-${pad2(d)}`;
    const cls = ["cal-day"];
    if (ds === today) cls.push("today");
    if (ds === state.recordDate) cls.push("selected");
    if (recordDates.has(ds)) cls.push("has-record");
    cells += `<button class="${cls.join(" ")}" data-action="calendar-pick" data-value="${ds}">${d}${recordDates.has(ds) ? "<i></i>" : ""}</button>`;
  }
  const html = `<div class="sheet-backdrop" id="calendar-overlay" data-action="close-calendar">
    <div class="sheet">
      <div class="sheet-head"><h2>选择日期</h2><button class="icon-btn" data-action="close-calendar" aria-label="关闭">${icon("x")}</button></div>
      <div class="cal-nav">
        <button class="nav-btn" data-action="cal-month" data-delta="-1" aria-label="上个月">${icon("left")}</button>
        <span class="cal-title">${y}年${m}月</span>
        <button class="nav-btn" data-action="cal-month" data-delta="1" aria-label="下个月">${icon("right")}</button>
      </div>
      <div class="cal-grid">${week}${cells}</div>
      <button class="btn-ghost btn-block" data-action="cal-today" style="margin-top:12px">回到今天</button>
    </div>
  </div>`;
  const overlay = $("#calendar-overlay");
  if (overlay) overlay.outerHTML = html;
  else $("#modal-root").insertAdjacentHTML("beforeend", html);
}

function renderRecordView() {
  const sub = state.recordSubTab;
  $("#app").innerHTML = `
    ${topbarHtml("记录与统计")}${storageWarningHtml()}
    <div class="view-body">
      <div class="sub-tabs">
        <button class="sub-tab${sub === "log" ? " active" : ""}" data-action="record-subtab" data-value="log">记录</button>
        <button class="sub-tab${sub === "stats" ? " active" : ""}" data-action="record-subtab" data-value="stats">统计</button>
      </div>
      ${sub === "log" ? recordLogHtml() : statsHtml()}
    </div>`;
}

function recordLogHtml() {
  const date = state.recordDate;
  const today = todayStr();
  const isToday = date === today;
  const label = date === today ? "今天" : date === addDays(today, -1) ? "昨天" : `${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;
  const totals = totalsForDate(date);
  const groups = recordGroups(date);
  return `
    <div class="date-nav">
      <button class="nav-btn" data-action="record-date-prev" aria-label="前一天">${icon("left")}</button>
      <button class="date-label" data-action="open-calendar" aria-label="选择日期">${label}<span>${isToday ? "今日已摄入 " : ""}${totals.calories} kcal</span></button>
      <button class="nav-btn" data-action="record-date-next" ${isToday ? "disabled" : ""} aria-label="后一天">${icon("right")}</button>
    </div>
    ${groups.length ? groups.map((g) => `
      <div class="record-group">
        <div class="record-group-title"><span>${MEAL_LABELS[g.mealType]}</span><span>${g.items.reduce((s, r) => s + (r.calories || 0), 0)} kcal</span></div>
        ${g.items.map(recordItemHtml).join("")}
      </div>`).join("") : empty("这天还没有记录", "🍽️")}
    <button class="btn-primary btn-block" data-action="add-record" style="margin-top:14px">${icon("plus")} 记一餐</button>`;
}

function recordItemHtml(record) {
  const emoji = SOURCE_EMOJI[record.source] || "🍽️";
  const thumb = record.photo ? `<img src="${record.photo}" alt="食物照片">` : emoji;
  const meta = [record.servings !== 1 ? `${record.servings} 份` : "", record.time, record.note ? esc(record.note) : ""]
    .filter(Boolean)
    .join(" · ");
  const recipe = RECIPES.find((r) => r.id === record.source);
  const tags = recipe ? [...(recipe.tags || [])] : [];
  for (const t of recipeTagsOf(record.source)) {
    const label = SNACK_SCENES[t] || t;
    if (!tags.includes(label)) tags.push(label);
  }
  const tagHtml = tags.length ? `<div class="rec-tags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : "";
  return `<div class="record-item">
    <span class="rec-emoji">${thumb}</span>
    <div class="rec-main"><h4>${esc(record.name)}</h4>${meta ? `<p>${meta}</p>` : ""}${tagHtml}</div>
    <span class="rec-kcal">${record.calories} kcal</span>
    <button class="rec-del" data-action="delete-record" data-id="${record.id}" aria-label="删除">${icon("trash")}</button>
  </div>`;
}

function statsHtml() {
  const days = lastNDays(7);
  const perDay = days.map((date) => ({ date, ...totalsForDate(date) }));
  const goal = state.settings.dailyGoal;
  const maxCal = Math.max(goal, ...perDay.map((d) => d.calories), 400);
  const totals = perDay.reduce(
    (acc, d) => {
      acc.calories += d.calories;
      acc.protein += d.protein;
      acc.carbs += d.carbs;
      acc.fat += d.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const avg = Math.round(totals.calories / 7);
  const streak = computeStreak();
  const grams = totals.protein + totals.carbs + totals.fat;
  let donutStyle = "background:#e7f0e4";
  if (grams > 0) {
    const p = Math.round((totals.protein / grams) * 100);
    const c = Math.round((totals.carbs / grams) * 100);
    donutStyle = `background:conic-gradient(#6fae6a 0 ${p}%, #d9822b ${p}% ${p + c}%, #5b7fa6 ${p + c}% 100%)`;
  }
  return `
    <div class="surface">
      <div class="section-title" style="margin-top:0"><span>近 7 天摄入</span><span class="subtitle">目标 ${goal} kcal</span></div>
      <div class="bar-chart">${perDay
        .map((d) => {
          const h = Math.max(3, Math.round((d.calories / maxCal) * 100));
          return `<div class="bar-col"><div class="bar${d.calories === 0 ? " zero" : ""}" style="height:${h}%"></div><span>${Number(d.date.slice(5, 7))}/${Number(d.date.slice(8, 10))}</span></div>`;
        })
        .join("")}</div>
    </div>
    <div class="surface" style="margin-top:12px">
      <div class="section-title" style="margin-top:0"><span>营养构成</span></div>
      <div class="donut-wrap">
        <div class="donut" style="${donutStyle}"><div class="donut-inner">7 天<br>合计</div></div>
        <div class="legend">
          <div class="legend-row"><span class="legend-dot" style="background:#6fae6a"></span>蛋白质 ${Math.round(totals.protein)}g</div>
          <div class="legend-row"><span class="legend-dot" style="background:#d9822b"></span>碳水 ${Math.round(totals.carbs)}g</div>
          <div class="legend-row"><span class="legend-dot" style="background:#5b7fa6"></span>脂肪 ${Math.round(totals.fat)}g</div>
        </div>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-cell"><b>${avg}</b><span>日均 kcal</span></div>
      <div class="stat-cell"><b>${streak} 天</b><span>连续记录</span></div>
    </div>`;
}

function renderMine() {
  const latestDataDate = RECIPES.reduce((mx, r) => (r.dataUpdatedAt > mx ? r.dataUpdatedAt : mx), "");
  $("#app").innerHTML = `
    ${topbarHtml("我的")}${storageWarningHtml()}
    <div class="view-body">
      <div class="info-banner">${icon("leaf")} 无需登录 · 数据保存在本机</div>
      <div class="setting-group">
        <div class="setting-label">反馈</div>
        <button class="btn-ghost btn-block" data-action="open-feedback">${icon("alert")} 纠错与建议</button>
      </div>
      <div class="setting-group">
        <div class="setting-label">每日热量目标</div>
        <div class="goal-stepper">
          <button data-action="goal-minus" aria-label="减少">−</button>
          <span class="goal-value">${state.settings.dailyGoal}<span> kcal</span></span>
          <button data-action="goal-plus" aria-label="增加">+</button>
        </div>
        <div class="filter-scroll" style="margin-top:10px">${[1400, 1600, 1800, 2000]
          .map((v) => `<button class="chip${state.settings.dailyGoal === v ? " active" : ""}" data-action="goal-chip" data-value="${v}">${v}</button>`)
          .join("")}</div>
      </div>
      <div class="setting-group">
        <div class="setting-label">常去来源</div>
        <div class="filter-scroll">${Object.keys(SOURCE_LABELS)
          .map((k) => `<button class="chip${state.settings.sources.includes(k) ? " active" : ""}" data-action="source-pref" data-value="${k}">${SOURCE_LABELS[k]}</button>`)
          .join("")}</div>
      </div>
      <div class="setting-group">
        <div class="setting-label">不太吃这些标签</div>
        <div class="filter-scroll">${TAG_OPTIONS.map(
          (t) => `<button class="chip${state.settings.dislikes.includes(t) ? " active" : ""}" data-action="dislike-pref" data-value="${t}">${t}</button>`
        ).join("")}</div>
      </div>
      <div class="setting-group">
        <div class="setting-label">数据管理</div>
        <div class="data-actions">
          <button class="btn-ghost" data-action="export-data">${icon("download")} 导出</button>
          <button class="btn-ghost" data-action="import-data">${icon("upload")} 导入</button>
        </div>
        <button class="btn-warm btn-block" style="margin-top:10px" data-action="clear-data">${icon("trash")} 清空本机数据</button>
      </div>
      <div class="setting-group">
        <div class="setting-label">数据与免责</div>
        <div class="about-card">
          <div class="about-row"><span>菜谱数据更新</span><b>${latestDataDate || "待更新"}</b></div>
          <div class="about-row"><span>图片来源</span><b>公开网络检索 · 本地缓存</b></div>
          <p>热量、营养与价格均为估算值，具体供应以食堂、店铺当日实际为准。菜品图片版权归原作者或来源平台所有，正式发布前需替换为可商用图源。本产品不替代医生、营养师或健身教练的专业建议。</p>
        </div>
      </div>
      <div class="about-note">再e亿下 · MVP 原型 V0.1（对应 PRD V1.2）</div>
    </div>`;
}

function openAddModal(mode, recipeId) {
  state.addMode = mode || "recipe";
  state.addMealType = guessMeal();
  state.addRecipeId = recipeId || null;
  state.addQ = "";
  state.foodQ = "";
  state.servings = 1;
  state.estimateDraft = [];
  state.addPhoto = null;
  renderAddModal();
}

function renderAddModal() {
  const mode = state.addMode;
  $("#modal-root").innerHTML = `
    <div class="sheet-backdrop" data-action="close-modal">
      <div class="sheet">
        <div class="sheet-head"><h2>记一餐</h2><button class="icon-btn" data-action="close-modal" aria-label="关闭">${icon("x")}</button></div>
        <div class="segmented">
          <button class="${mode === "recipe" ? "active" : ""}" data-action="add-tab" data-value="recipe">从菜谱</button>
          <button class="${mode === "estimate" ? "active" : ""}" data-action="add-tab" data-value="estimate">估算器</button>
          <button class="${mode === "manual" ? "active" : ""}" data-action="add-tab" data-value="manual">手动填写</button>
        </div>
        <div class="meal-chips">${Object.keys(MEAL_LABELS)
          .map((mt) => `<button class="chip${state.addMealType === mt ? " active" : ""}" data-action="add-meal" data-value="${mt}">${MEAL_LABELS[mt]}</button>`)
          .join("")}</div>
        <div class="photo-row">
          <button class="btn-ghost photo-btn" data-action="pick-photo">${icon("camera")} 拍照/选图</button>
          ${state.addPhoto ? `<div class="photo-preview"><img src="${state.addPhoto}" alt="食物照片"><button class="rec-del" data-action="remove-photo" aria-label="移除照片">${icon("x")}</button></div>` : ""}
        </div>
        ${mode === "recipe" ? addRecipeModeHtml() : mode === "estimate" ? estimateModeHtml() : manualModeHtml()}
      </div>
    </div>`;
  const addSearch = $("#addRecipeSearch");
  if (addSearch) {
    addSearch.addEventListener("input", debounce((e) => {
      state.addQ = e.target.value;
      renderAddRecipeList();
    }, 250));
  }
  const foodSearch = $("#estimateFoodSearch");
  if (foodSearch) {
    foodSearch.addEventListener("input", debounce((e) => {
      state.foodQ = e.target.value;
      renderFoodList();
    }, 250));
  }
}

function addRecipeModeHtml() {
  const selected = RECIPES.find((r) => r.id === state.addRecipeId);
  return `
    <div class="search-wrap add-search">${icon("search")}<input class="search-input" id="addRecipeSearch" placeholder="搜菜谱"></div>
    <div id="addRecipeList" class="add-recipe-list">${addRecipeListHtml()}</div>
    ${selected ? `
      <div class="draft-box">
        <h4>已选择：${esc(selected.name)}</h4>
        <div class="draft-item"><span class="name">${esc(selected.name)}</span><span class="kcal">${selected.calories} kcal</span></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px">
          <span class="subtitle">份数</span>
          <div class="stepper"><button data-action="servings-minus" aria-label="减少">−</button><span>${state.servings}</span><button data-action="servings-plus" aria-label="增加">+</button></div>
        </div>
        <button class="btn-primary btn-block" style="margin-top:12px" data-action="save-recipe-record">${icon("check")} 保存这餐</button>
      </div>` : ""}`;
}

function addRecipeListHtml() {
  const q = state.addQ.trim().toLowerCase();
  const list = RECIPES.filter(
    (r) => !q || [r.name, r.place, ...(r.tags || [])].join(" ").toLowerCase().includes(q)
  );
  return list
    .map(
      (r) => `
      <div class="add-recipe-item${state.addRecipeId === r.id ? " active" : ""}" data-action="choose-recipe" data-id="${r.id}">
        <img src="${r.imageUrl}" alt="${esc(r.name)}" loading="lazy" onerror="imgFallback(this, '${r.emoji}', 'add-recipe-item')">
        <div><h4>${esc(r.name)}</h4><p>${SOURCE_LABELS[r.source]} · ${r.calories} kcal · ¥${r.price}</p></div>
        <span class="plus">${icon("plus")}</span>
      </div>`
    )
    .join("") || empty("没有找到菜谱", "🍽️");
}

function renderAddRecipeList() {
  const el = $("#addRecipeList");
  if (!el) return;
  try {
    el.innerHTML = addRecipeListHtml();
  } catch (err) {
    el.innerHTML = empty("没有找到菜谱");
  }
}

function estimateModeHtml() {
  const totals = estimateTotals();
  return `
    <div class="search-wrap add-search">${icon("search")}<input class="search-input" id="estimateFoodSearch" placeholder="搜常见食物"></div>
    <div id="foodList" class="food-grid">${foodListHtml()}</div>
    ${state.estimateDraft.length ? `
      <div class="draft-box" style="margin-top:12px">
        <h4>本餐组合</h4>
        ${state.estimateDraft.map(draftItemHtml).join("")}
        <div class="draft-item"><span class="name">合计</span><span class="kcal">${totals.calories} kcal</span></div>
        <button class="btn-primary btn-block" style="margin-top:10px" data-action="save-estimate-record">${icon("check")} 保存这餐</button>
      </div>` : ""}`;
}

function foodListHtml() {
  const q = state.foodQ.trim().toLowerCase();
  const list = FOODS.filter((f) => !q || f.name.toLowerCase().includes(q));
  return list
    .map((f) => {
      const kcal = Math.round((f.kcal * f.grams) / 100);
      return `<button class="food-item" data-action="estimate-pick" data-id="${f.name}">
        <span class="food-emoji">${f.emoji}</span>
        <span><h5>${f.name}</h5><p>1${f.unit}约 ${kcal} kcal</p></span>
      </button>`;
    })
    .join("") || empty("没有这个食物", "🍎");
}

function renderFoodList() {
  const el = $("#foodList");
  if (!el) return;
  try {
    el.innerHTML = foodListHtml();
  } catch (err) {
    el.innerHTML = empty("没有找到食物");
  }
}

function draftItemHtml(item) {
  const kcal = Math.round((item.kcal * item.grams * item.qty) / 100);
  return `<div class="draft-item">
    <span class="name">${item.qty}${item.unit}${item.name}</span>
    <span class="kcal">${kcal} kcal</span>
    <div class="stepper">
      <button data-action="estimate-qty" data-id="${item.name}" data-delta="-0.5" aria-label="减少">−</button>
      <span>${item.qty}</span>
      <button data-action="estimate-qty" data-id="${item.name}" data-delta="0.5" aria-label="增加">+</button>
    </div>
    <button class="rec-del" data-action="estimate-remove" data-id="${item.name}" aria-label="移除">${icon("x")}</button>
  </div>`;
}

function estimateTotals() {
  return state.estimateDraft.reduce(
    (acc, item) => {
      acc.calories += (item.kcal * item.grams * item.qty) / 100;
      acc.protein += (item.p * item.grams * item.qty) / 100;
      acc.carbs += (item.c * item.grams * item.qty) / 100;
      acc.fat += (item.f * item.grams * item.qty) / 100;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function addEstimateFood(name) {
  const food = FOODS.find((f) => f.name === name);
  if (!food) return;
  const existing = state.estimateDraft.find((i) => i.name === food.name);
  if (existing) existing.qty += 1;
  else state.estimateDraft.push({ ...food, qty: 1 });
  renderAddModal();
}

function adjustEstimateQty(name, delta) {
  const item = state.estimateDraft.find((i) => i.name === name);
  if (!item) return;
  item.qty = Math.max(0.5, Math.min(4, item.qty + delta));
  renderAddModal();
}

function removeEstimateFood(name) {
  state.estimateDraft = state.estimateDraft.filter((i) => i.name !== name);
  renderAddModal();
}

function manualModeHtml() {
  return `
    <div class="form-grid">
      <div class="field"><label>名称</label><input id="manualName" placeholder="例如：食堂晚餐组合"></div>
      <div class="field"><label>热量（大卡）</label><input id="manualCal" type="number" min="0" placeholder="例如 450"></div>
      <div class="form-grid" style="grid-template-columns:repeat(3,1fr);gap:8px">
        <div class="field"><label>蛋白质 g</label><input id="manualP" type="number" min="0" placeholder="0"></div>
        <div class="field"><label>碳水 g</label><input id="manualC" type="number" min="0" placeholder="0"></div>
        <div class="field"><label>脂肪 g</label><input id="manualF" type="number" min="0" placeholder="0"></div>
      </div>
      <div class="field"><label>备注（可选）</label><textarea id="manualNote" placeholder="例如：食堂二楼，少油"></textarea></div>
      <button class="btn-primary btn-block" data-action="save-manual-record">${icon("check")} 保存这餐</button>
    </div>`;
}

function saveRecipeRecord() {
  const recipe = RECIPES.find((r) => r.id === state.addRecipeId);
  if (!recipe) return;
  addRecord({
    name: recipe.name,
    mealType: state.addMealType,
    source: recipe.id,
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    servings: state.servings,
    photo: state.addPhoto
  });
  markRecent(recipe.id);
  closeModal();
  switchTab("home");
  toast("已记录");
}

function saveEstimateRecord() {
  if (!state.estimateDraft.length) {
    toast("先选择食物");
    return;
  }
  const totals = estimateTotals();
  const names = state.estimateDraft.map((i) => i.name);
  const preview = names.slice(0, 3).join("、") + (names.length > 3 ? " 等" : "");
  addRecord({
    name: `自定义组合（${preview}）`,
    mealType: state.addMealType,
    source: "",
    calories: totals.calories,
    protein: totals.protein,
    carbs: totals.carbs,
    fat: totals.fat,
    servings: 1,
    photo: state.addPhoto
  });
  closeModal();
  switchTab("home");
  toast("已记录");
}

function saveManualRecord() {
  const name = $("#manualName").value.trim();
  const calories = Number($("#manualCal").value);
  if (!name || !calories || calories <= 0) {
    toast("名称和热量不能为空");
    return;
  }
  addRecord({
    name,
    mealType: state.addMealType,
    source: "",
    calories,
    protein: Number($("#manualP").value) || 0,
    carbs: Number($("#manualC").value) || 0,
    fat: Number($("#manualF").value) || 0,
    servings: 1,
    note: $("#manualNote").value.trim(),
    photo: state.addPhoto
  });
  closeModal();
  switchTab("home");
  toast("已记录");
}

function deleteRecord(id) {
  if (!window.confirm("删除这条记录？")) return;
  state.records = state.records.filter((r) => r.id !== id);
  saveJSON(KEYS.records, state.records);
  renderRecordView();
  toast("已删除");
}

function adjustGoal(delta) {
  state.settings.dailyGoal = Math.max(1000, Math.min(3000, state.settings.dailyGoal + delta));
  saveSettings();
  renderAll();
}

function toggleSetting(key, value) {
  const arr = state.settings[key] || [];
  state.settings[key] = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
  saveSettings();
  renderAll();
}

function exportData() {
  const data = {
    app: "zaiyixia",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: state.settings,
    records: state.records,
    favorites: state.favorites,
    recent: state.recent,
    recipeTags: state.customTags,
    feedback: state.feedback
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `再e亿下-数据备份-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("已导出");
}

function clearData() {
  if (!window.confirm("确定清空本机所有记录和设置？")) return;
  state.records = [];
  state.favorites = [];
  state.recent = [];
  state.customTags = {};
  state.feedback = [];
  state.settings = { dailyGoal: 1600, sources: [], dislikes: [] };
  Object.values(KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch (err) {
      // ignore
    }
  });
  saveSettings();
  renderAll();
  toast("已清空");
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action], [data-more]");
  if (!el) return;
  if (el.dataset.more) {
    toggleMorePanel(el.dataset.more);
    return;
  }
  const action = el.dataset.action;
  const value = el.dataset.value;
  const id = el.dataset.id;
  if (action === "tab") switchTab(value);
  else if (action === "add-record") openAddModal();
  else if (action === "goto-recipes") switchTab("recipes");
  else if (action === "open-detail") openDetail(id);
  else if (action === "close-detail") closeModal();
  else if (action === "open-feedback") openFeedbackModal(id || null);
  else if (action === "close-feedback") {
    if (el.classList.contains("sheet-backdrop") && e.target !== el) return;
    closeFeedback();
  } else if (action === "open-calendar") openCalendar();
  else if (action === "close-calendar") {
    if (el.classList.contains("sheet-backdrop") && e.target !== el) return;
    closeCalendar();
  } else if (action === "cal-month") {
    const [y, m] = state.calDate.slice(0, 7).split("-").map(Number);
    const next = new Date(y, m - 1 + Number(el.dataset.delta), 1);
    state.calDate = `${next.getFullYear()}-${pad2(next.getMonth() + 1)}-01`;
    renderCalendarModal();
  } else if (action === "calendar-pick") {
    state.recordDate = value;
    closeCalendar();
    renderRecordView();
  } else if (action === "cal-today") {
    state.recordDate = todayStr();
    closeCalendar();
    renderRecordView();
  }
  else if (action === "feedback-type") { state.feedbackType = value; renderFeedbackOverlay(); }
  else if (action === "feedback-submit") submitFeedback();
  else if (action === "feedback-copy") copyFeedback();
  else if (action === "toggle-fav") toggleFavorite(id);
  else if (action === "toggle-recipe-tag") toggleRecipeTag(id, value);
  else if (action === "add-recipe-tag") addRecipeTag(id);
  else if (action === "record-recipe") quickRecordRecipe(id);
  else if (action === "pick-again") refreshPicks();
  else if (action === "recipe-filter") {
    state.filters[el.dataset.type] = value;
    if (el.dataset.type === "meal" && value !== "snack") state.filters.snackScene = "all";
    renderRecipes();
  } else if (action === "record-date-prev") {
    state.recordDate = addDays(state.recordDate, -1);
    renderRecordView();
  } else if (action === "record-date-next") {
    const next = addDays(state.recordDate, 1);
    if (next <= todayStr()) {
      state.recordDate = next;
      renderRecordView();
    }
  } else if (action === "record-subtab") {
    state.recordSubTab = value;
    renderRecordView();
  } else if (action === "delete-record") deleteRecord(id);
  else if (action === "goal-minus") adjustGoal(-50);
  else if (action === "goal-plus") adjustGoal(50);
  else if (action === "goal-chip") {
    state.settings.dailyGoal = Number(value);
    saveSettings();
    renderAll();
  } else if (action === "source-pref") toggleSetting("sources", value);
  else if (action === "dislike-pref") toggleSetting("dislikes", value);
  else if (action === "export-data") exportData();
  else if (action === "import-data") $("#import-file").click();
  else if (action === "clear-data") clearData();
  else if (action === "close-modal") {
    if (el.classList.contains("sheet-backdrop") && e.target !== el) return;
    closeModal();
  }
  else if (action === "add-tab") {
    state.addMode = value;
    renderAddModal();
  } else if (action === "add-meal") {
    state.addMealType = value;
    renderAddModal();
  } else if (action === "pick-photo") {
    $("#photo-file").click();
  } else if (action === "remove-photo") {
    state.addPhoto = null;
    renderAddModal();
  } else if (action === "choose-recipe") {
    state.addRecipeId = id;
    state.servings = 1;
    renderAddModal();
  } else if (action === "servings-minus") {
    state.servings = Math.max(0.5, state.servings - 0.5);
    renderAddModal();
  } else if (action === "servings-plus") {
    state.servings = Math.min(4, state.servings + 0.5);
    renderAddModal();
  } else if (action === "save-recipe-record") saveRecipeRecord();
  else if (action === "estimate-pick") addEstimateFood(id);
  else if (action === "estimate-qty") adjustEstimateQty(id, Number(el.dataset.delta));
  else if (action === "estimate-remove") removeEstimateFood(id);
  else if (action === "save-estimate-record") saveEstimateRecord();
  else if (action === "save-manual-record") saveManualRecord();
});

$("#import-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (Array.isArray(data.records)) state.records = data.records;
    if (data.settings) state.settings = Object.assign({ dailyGoal: 1600, sources: [], dislikes: [] }, data.settings);
    if (Array.isArray(data.favorites)) state.favorites = data.favorites;
    if (Array.isArray(data.recent)) state.recent = data.recent;
    if (data.recipeTags && typeof data.recipeTags === "object") state.customTags = data.recipeTags;
    if (Array.isArray(data.feedback)) state.feedback = data.feedback;
    saveJSON(KEYS.records, state.records);
    saveJSON(KEYS.settings, state.settings);
    saveJSON(KEYS.favorites, state.favorites);
    saveJSON(KEYS.recent, state.recent);
    saveJSON(KEYS.recipeTags, state.customTags);
    saveJSON(KEYS.feedback, state.feedback);
    renderAll();
    toast("已导入");
  } catch (err) {
    toast("导入失败，文件格式不对");
  }
  e.target.value = "";
});

$("#photo-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    state.addPhoto = await readPhotoFile(file);
    renderAddModal();
  } catch (err) {
    toast("照片读取失败");
  }
  e.target.value = "";
});

renderAll();
