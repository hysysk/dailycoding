/**
 * Delaunay Triangulation & Voronoi Diagram with Circumcircles
 * Bowyer-Watson Algorithm — animated in real decision order
 */

// --- ユーティリティ関数 ---

function pointsToTriangle(p1, p2, p3) {
  return [p1, p2, p3];
}

/**
 * 幾何学的な公式を用いた外接円の中心計算
 * 3点の座標 (x1,y1), (x2,y2), (x3,y3) から中心 (ux, uy) と半径 r を求める
 */
function getCircumcenter(p1, p2, p3) {
  const x1 = p1.x, y1 = p1.y;
  const x2 = p2.x, y2 = p2.y;
  const x3 = p3.x, y3 = p3.y;

  const D = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

  if (Math.abs(D) < 1e-7) return { x: 0, y: 0, r: -1 }; // 3点が一直線上の場合

  const ux = ((x1 * x1 + y1 * y1) * (y2 - y3) + (x2 * x2 + y2 * y2) * (y3 - y1) + (x3 * x3 + y3 * y3) * (y1 - y2)) / D;
  const uy = ((x1 * x1 + y1 * y1) * (x3 - x2) + (x2 * x2 + y2 * y2) * (x1 - x3) + (x3 * x3 + y3 * y3) * (x2 - x1)) / D;

  const radius = Math.sqrt(Math.pow(x1 - ux, 2) + Math.pow(y1 - uy, 2));

  return { x: ux, y: uy, r: radius };
}

function getDistance(center, point) {
  return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2));
}

function isSamePoint(p1, p2) {
  return Math.abs(p1.x - p2.x) < 1e-7 && Math.abs(p1.y - p2.y) < 1e-7;
}

const SUPER_POINTS = [
  { x: -2000, y: -2000 },
  { x: 4000, y: -2000 },
  { x: 1000, y: 4000 }
];

function hasSuperPoint(tri) {
  return tri.some(tp => SUPER_POINTS.some(sp => isSamePoint(sp, tp)));
}

// --- メインアルゴリズム (Bowyer-Watson) — 各ステップを記録 ---

function genDelaunaySteps(points) {
  const st = [
    { x: -2000, y: -2000 },
    { x: 4000, y: -2000 },
    { x: 1000, y: 4000 }
  ];
  let delaunay = [pointsToTriangle(st[0], st[1], st[2])];
  const steps = [];

  for (let n = 0; n < points.length; n++) {
    const p = { x: points[n][0], y: points[n][1] };

    // 2. 外接円の中に新しい点が含まれる三角形（"悪い"三角形）を探す
    let badTriangles = [];
    for (let i = 0; i < delaunay.length; i++) {
      const cc = getCircumcenter(delaunay[i][0], delaunay[i][1], delaunay[i][2]);
      if (cc.r > 0 && getDistance(cc, p) < cc.r) badTriangles.push(i);
    }

    // その外接円（ハイライト用・実在の三角形のみ）
    const badCircles = badTriangles
      .map(i => delaunay[i])
      .filter(t => !hasSuperPoint(t))
      .map(t => { const cc = getCircumcenter(t[0], t[1], t[2]); return cc.r > 0 ? cc : null; })
      .filter(Boolean);

    // 3. 境界エッジ（穴の縁）の抽出
    let polygon = [];
    for (let i = 0; i < badTriangles.length; i++) {
      const tri = delaunay[badTriangles[i]];
      const edges = [
        [tri[0], tri[1]],
        [tri[1], tri[2]],
        [tri[2], tri[0]]
      ];
      for (let edge of edges) {
        let isShared = false;
        for (let j = 0; j < badTriangles.length; j++) {
          if (i === j) continue;
          const other = delaunay[badTriangles[j]];
          let sharedCount = 0;
          if (isSamePoint(edge[0], other[0]) || isSamePoint(edge[0], other[1]) || isSamePoint(edge[0], other[2])) sharedCount++;
          if (isSamePoint(edge[1], other[0]) || isSamePoint(edge[1], other[1]) || isSamePoint(edge[1], other[2])) sharedCount++;
          if (sharedCount === 2) { isShared = true; break; }
        }
        if (!isShared) polygon.push(edge);
      }
    }

    // 4. 無効な三角形を削除
    badTriangles.sort((a, b) => b - a);
    for (let idx of badTriangles) delaunay.splice(idx, 1);

    // 5. 新しい三角形を追加
    for (let edge of polygon) {
      delaunay.push(pointsToTriangle(edge[0], edge[1], p));
    }

    steps.push({
      point: p,
      badCircles,
      newEdges: polygon,
      snapshot: delaunay.slice()  // この時点の全ての三角形（参照は安定している）
    });
  }

  return { steps, triangles: delaunay };
}

// --- 派生幾何（現在のスナップショットから辺・円・ボロノイを求める） ---

function edgeKey(a, b) {
  const ra = a.x.toFixed(3) + "," + a.y.toFixed(3);
  const rb = b.x.toFixed(3) + "," + b.y.toFixed(3);
  return ra < rb ? ra + "|" + rb : rb + "|" + ra;
}

// 外接円のキー（同じ3点 → 同じ中心と半径）
function circKey(c) {
  return c.x.toFixed(3) + "," + c.y.toFixed(3) + "," + c.r.toFixed(3);
}

function deriveGeometry(tris) {
  const circumcenters = tris.map(t => getCircumcenter(t[0], t[1], t[2]));
  const edgeSet = [];
  const edgeKeys = new Set();
  const circles = [];

  for (let i = 0; i < tris.length; i++) {
    const t = tris[i];
    if (hasSuperPoint(t)) continue;

    const pairs = [[0, 1], [1, 2], [2, 0]];
    for (const [a, b] of pairs) {
      const key = edgeKey(t[a], t[b]);
      if (!edgeKeys.has(key)) {
        edgeKeys.add(key);
        edgeSet.push([t[a], t[b]]);
      }
    }
    const cc = circumcenters[i];
    if (cc.r > 0) circles.push(cc);
  }

  // Voronoi: 共有頂点が2つある隣接三角形の中心を結ぶ
  const voronoi = [];
  const vorKeys = new Set();
  const valid = [];
  for (let i = 0; i < tris.length; i++) if (!hasSuperPoint(tris[i])) valid.push(i);
  for (let a = 0; a < valid.length; a++) {
    for (let b = a + 1; b < valid.length; b++) {
      const i = valid[a], j = valid[b];
      let common = 0;
      for (const p1 of tris[i]) for (const p2 of tris[j]) if (isSamePoint(p1, p2)) common++;
      if (common === 2) {
        const c1 = circumcenters[i], c2 = circumcenters[j];
        if (Math.abs(c1.x) < 2000 && Math.abs(c1.y) < 2000 &&
            Math.abs(c2.x) < 2000 && Math.abs(c2.y) < 2000) {
          const key = edgeKey(c1, c2);
          if (!vorKeys.has(key)) { vorKeys.add(key); voronoi.push([c1, c2]); }
        }
      }
    }
  }

  return { edges: edgeSet, circles, voronoi };
}

// （辺の差分は animate 内で各ステップごとに事前計算 stepGeo へ格納する）

// --- アニメーション ---

const COL = {
  dot: "#0f172a",
  line: "#2563eb",
  voronoi: "#93c5fd",
  circle: "#cbd5e1",
  bad: "#dc2626"
};

function drawCirclePath(ctx, c) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
}

// 0..1 へのクランプ（トップレベルに定義し、animate 外側の revealCircles などからも参照可能にする）
function clamp01(x) { return Math.max(0, Math.min(1, x)); }

// easeInOutQuad：始まりと終わりが緩やかで、変化が自然に「現れる」ようにする
function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

// 以下はすべて ms ベース：各アイテム i は [i*unitMs, (i+1)*unitMs] の区間を占有し、
// 1 個ずつ順番に（unitMs ずつ）アニメーションする。

// 円群を 1 枚ずつ順番に出現させる（α : 0→1）。
function revealCircles(ctx, circles, ms, unitMs, color, width) {
  if (circles.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i < circles.length; i++) {
    const local = clamp01((ms - i * unitMs) / unitMs);
    if (local <= 0) continue;
    ctx.globalAlpha = local;
    drawCirclePath(ctx, circles[i]);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// 円群を 1 枚ずつ順番に消去する（α : alpha→0）。
function fadeOutCircles(ctx, circles, ms, unitMs, color, width, alpha) {
  if (circles.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i < circles.length; i++) {
    const local = clamp01((ms - i * unitMs) / unitMs);
    if (local >= 1) continue; // 完全に消えた分は描画しない
    ctx.globalAlpha = alpha * (1 - local);
    drawCirclePath(ctx, circles[i]);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// "悪い"外接円群の赤ハイライト（出現 → 消去 を 1 枚ずつ順番に）。
// inMs/outMs は各フェーズ内の経過 ms。アイテム i の α = 出現 * (1 - 消去)。
function flashCircles(ctx, circles, inMs, outMs, unitIn, unitOut, color, width) {
  if (circles.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i < circles.length; i++) {
    const inA = clamp01((inMs - i * unitIn) / unitIn);
    const outA = clamp01((outMs - i * unitOut) / unitOut);
    const a = inA * (1 - outA);
    if (a <= 0) continue;
    ctx.globalAlpha = a;
    drawCirclePath(ctx, circles[i]);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// 線分群を 1 本ずつ順番に引く（a→b へ延伸 + α : 0→alpha）。
function revealLines(ctx, segs, ms, unitMs, color, width, alpha) {
  if (segs.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i < segs.length; i++) {
    const local = clamp01((ms - i * unitMs) / unitMs);
    if (local <= 0) continue;
    const [a, b] = segs[i];
    ctx.globalAlpha = alpha * local;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(a.x + (b.x - a.x) * local, a.y + (b.y - a.y) * local);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// 線分群を 1 本ずつ順番に消去する（α : alpha→0）。
function fadeOutLines(ctx, segs, ms, unitMs, color, width, alpha) {
  if (segs.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i < segs.length; i++) {
    const local = clamp01((ms - i * unitMs) / unitMs);
    if (local >= 1) continue; // 完全に消えた分は描画しない
    const [a, b] = segs[i];
    ctx.globalAlpha = alpha * (1 - local);
    drawSeg(ctx, a, b);
  }
  ctx.globalAlpha = 1;
}

function drawSeg(ctx, a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

// --- アニメーション時間設定 (ms) ---
// 個々の操作（点を打つ / 線 1 本を引く・消す / 円 1 枚を描く・消す）の所要時間。
// ひとつずつ順番に動くため、実行速度は遅いが動作が理解やすい。
const ITEM_MS = 300;

// 最後の「完成の渡り」：外接円を薄め、Voronoi が太れて現れるまでの時間。
const FINISH_MS = 1200;
// 完成時の Voronoi の太さ（アニメ中の 1px から太れていく）
const VORONOI_FINAL_W = 2;

function animate(canvas, points, steps) {
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  const HOLD_MS = 3000; // 完成図を表示した後の停止時間

  let sIdx = 0;
  let stepStart = -1;
  let holdStart = -1;
  let finishStart = -1;
  let mode = "running"; // "running" | "finishing" | "holding"

  const finalGeo = deriveGeometry(steps[steps.length - 1].snapshot);

  // 各ステップの「新規 / 削除」分を事前計算。
  // renderStep では古い分はそのまま（静的）、新增加分のみアニメーションする
  const stepGeo = steps.map((step, idx) => {
    const prev = idx === 0 ? null : steps[idx - 1];
    const cur = deriveGeometry(step.snapshot);
    const prevGeo = prev
      ? deriveGeometry(prev.snapshot)
      : { edges: [], circles: [], voronoi: [] };

    const prevEdgeKeys = new Set(prevGeo.edges.map(([a, b]) => edgeKey(a, b)));
    const curEdgeKeys = new Set(cur.edges.map(([a, b]) => edgeKey(a, b)));
    const vorKey = ([a, b]) => edgeKey(a, b);
    const prevVorKeys = new Set(prevGeo.voronoi.map(vorKey));
    const curVorKeys = new Set(cur.voronoi.map(vorKey));
    const prevCircKeys = new Set(prevGeo.circles.map(circKey));
    const curCircKeys = new Set(cur.circles.map(circKey));

    return {
      step,
      cur,
      oldEdges: cur.edges.filter(([a, b]) => prevEdgeKeys.has(edgeKey(a, b))),
      addedEdges: cur.edges.filter(([a, b]) => !prevEdgeKeys.has(edgeKey(a, b))),
      removedEdges: prevGeo.edges.filter(([a, b]) => !curEdgeKeys.has(edgeKey(a, b))),
      oldVoronoi: cur.voronoi.filter(([a, b]) => prevVorKeys.has(edgeKey(a, b))),
      newVoronoi: cur.voronoi.filter(([a, b]) => !prevVorKeys.has(edgeKey(a, b))),
      removedVoronoi: prevGeo.voronoi.filter(([a, b]) => !curVorKeys.has(edgeKey(a, b))),
      oldCircles: cur.circles.filter(c => prevCircKeys.has(circKey(c))),
      newCircles: cur.circles.filter(c => !prevCircKeys.has(circKey(c))),
      removedCircles: prevGeo.circles.filter(c => !curCircKeys.has(circKey(c)))
    };
  });

  // 各ステップの段階別タイムライン（ms）。
  // 各フェーズの長さは「対象アイテム数 × ITEM_MS」。操作は 1 個ずつ順番に、各 ITEM_MS。
  // 順：点 → 悪い円(赤出現) → 消去(悪い円+辺+円) → 辺追加 → 円追加 → バロノイ追加
  const timelines = stepGeo.map(sg => {
    const badN = sg.step.badCircles.length;
    const eraseN = Math.max(badN, sg.removedEdges.length, sg.removedVoronoi.length, sg.removedCircles.length);
    const phases = [
      { name: "dot",     n: 1 },
      { name: "badIn",   n: badN },
      { name: "erase",   n: eraseN },
      { name: "add",     n: sg.addedEdges.length },
      { name: "newCirc", n: sg.newCircles.length },
      { name: "newVor",  n: sg.newVoronoi.length }
    ];
    const tl = {};
    let acc = 0;
    for (const p of phases) {
      tl[p.name] = { start: acc, dur: p.n * ITEM_MS };
      acc += p.n * ITEM_MS;
    }
    tl.total = acc;
    return tl;
  });
  const stepDur = timelines.map(tl => tl.total);

  // 最後のステップで新規に追加された Voronoi 辺／Delaunay 辺（渡りで"からの"太さ・薄さを決める）
  const lastSG = stepGeo[steps.length - 1];
  const lastNewVorKeys  = new Set(lastSG.newVoronoi.map(([a, b]) => edgeKey(a, b)));
  const lastNewEdgeKeys = new Set(lastSG.addedEdges.map(([a, b]) => edgeKey(a, b)));

  function drawFrame(ts) {
    if (stepStart < 0) stepStart = ts;

    if (mode === "holding") {
      // 完成図を表示したまま待つ
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticFull();
      if (ts - holdStart >= HOLD_MS) {
        sIdx = 0;
        stepStart = ts;
        holdStart = -1;
        mode = "running";
      }
      requestAnimationFrame(drawFrame);
      return;
    }

    if (mode === "finishing") {
      // 完成直前：外接円を薄め、Voronoi を太らせて現れる（滑らかな渡り）
      const pf = clamp01((ts - finishStart) / FINISH_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFinishing(pf);
      if (ts - finishStart >= FINISH_MS) {
        mode = "holding";
        holdStart = ts;
      }
      requestAnimationFrame(drawFrame);
      return;
    }

    const total = stepDur[sIdx] > 0 ? stepDur[sIdx] : ITEM_MS;
    let t = (ts - stepStart) / total;
    if (t >= 1) {
      sIdx++;
      stepStart = ts;
      if (sIdx >= steps.length) {
        mode = "finishing";
        finishStart = ts;
        sIdx = steps.length - 1;
        t = 1;
      } else {
        t = 0;
      }
    }

    renderStep(t);
    requestAnimationFrame(drawFrame);
  }

  function drawStaticFull() {
    // 外接円は最後に薄く消えるため、完成図では描画しない
    // Voronoi（太めのメインライン）
    ctx.strokeStyle = COL.voronoi;
    ctx.lineWidth = VORONOI_FINAL_W;
    for (const [a, b] of finalGeo.voronoi) drawSeg(ctx, a, b);
    // Delaunay
    ctx.strokeStyle = COL.line;
    ctx.lineWidth = 1;
    for (const [a, b] of finalGeo.edges) drawSeg(ctx, a, b);
    // dots
    ctx.fillStyle = COL.dot;
    for (const pt of points) {
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 4, 0, Math.PI * 2); ctx.fill();
    }
  }

  // 完成直前の「渡り」：外接円が消え、Voronoi が太って現れる。
  // p=0 ではステップ最後と同一、p=1 では完成図（drawStaticFull と一致）。
  function drawFinishing(p) {
    const e = easeInOutQuad(p);

    // 1) 点を打つ（常に最下層、完全表示）
    ctx.fillStyle = COL.dot;
    for (const [x, y] of points) {
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 2) 外接円：最後のフレーム（α=1）から薄めて消す
    ctx.strokeStyle = COL.circle;
    ctx.lineWidth = 1;
    const circA = 1 - e;
    if (circA > 0.004) {
      ctx.globalAlpha = circA;
      for (const c of finalGeo.circles) { drawCirclePath(ctx, c); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;

    // 3) Voronoi：α を 0.4/0.6 → 1、線の太さを 1 → 太めへ
    ctx.strokeStyle = COL.voronoi;
    for (const [a, b] of finalGeo.voronoi) {
      const fromA = lastNewVorKeys.has(edgeKey(a, b)) ? 0.6 : 0.4;
      ctx.globalAlpha = fromA + (1 - fromA) * e;
      ctx.lineWidth = 1 + (VORONOI_FINAL_W - 1) * e;
      drawSeg(ctx, a, b);
    }
    ctx.globalAlpha = 1;

    // 4) Delaunay：最後のステップで追加された辺だけ太さを 1.6 → 1 へ戻す
    ctx.strokeStyle = COL.line;
    for (const [a, b] of finalGeo.edges) {
      ctx.globalAlpha = 1;
      ctx.lineWidth = lastNewEdgeKeys.has(edgeKey(a, b)) ? 1.6 - 0.6 * e : 1;
      drawSeg(ctx, a, b);
    }
    ctx.globalAlpha = 1;
  }

  function renderStep(t) {
    const sg = stepGeo[sIdx];
    const { step } = sg;
    const tl = timelines[sIdx];
    const el = t * tl.total; // このステップ内の経過時間(ms)

    // 各フェーズ内の経過(ms)：下限0、上限は各フェーズの長さにクランプ。
    // フェーズは順番に走るため、完了フェーズは dur に張り付く（全部完成・全部消滅）。
    const phMs = ph => Math.max(0, Math.min(el - ph.start, ph.dur));
    const dotMs     = phMs(tl.dot);
    const badInMs   = phMs(tl.badIn);
    const eraseMs   = phMs(tl.erase);
    const addMs     = phMs(tl.add);
    const newCircMs = phMs(tl.newCirc);
    const newVorMs  = phMs(tl.newVor);

    const dotP = clamp01(dotMs / ITEM_MS);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 1) 点を打つ（最下層）：古い点はそのまま、新規の点は ITEM_MS で成長 ---
    ctx.fillStyle = COL.dot;
    for (let i = 0; i <= sIdx; i++) {
      const isNewest = i === sIdx;
      const [x, y] = points[i];
      const r = isNewest ? 4 * dotP : 4;
      if (r > 0.1) {
        ctx.globalAlpha = isNewest ? dotP : 1;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // --- 2) Voronoi：消される(1本ずつ)/古い(薄い)/新しい(1本ずつ) ---
    ctx.strokeStyle = COL.voronoi;
    ctx.lineWidth = 1;
    fadeOutLines(ctx, sg.removedVoronoi, eraseMs, ITEM_MS, COL.voronoi, 1, 0.6);
    ctx.globalAlpha = 0.4;
    for (const [a, b] of sg.oldVoronoi) drawSeg(ctx, a, b);
    ctx.globalAlpha = 1;
    revealLines(ctx, sg.newVoronoi, newVorMs, ITEM_MS, COL.voronoi, 1, 0.6);

    // --- 3) Delaunay 辺：消される(1本ずつ)/古い/新しい(1本ずつ) ---
    ctx.strokeStyle = COL.line;
    ctx.lineWidth = 1;
    fadeOutLines(ctx, sg.removedEdges, eraseMs, ITEM_MS, COL.line, 1, 0.6);
    ctx.globalAlpha = 1;
    for (const [a, b] of sg.oldEdges) drawSeg(ctx, a, b);
    ctx.globalAlpha = 1;
    revealLines(ctx, sg.addedEdges, addMs, ITEM_MS, COL.line, 1.6, 1);

    // --- 4) 円（外接円）：古い/消される/悪い(赤)/新しい（1枚ずつ） ---
    ctx.strokeStyle = COL.circle;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    for (const c of sg.oldCircles) { drawCirclePath(ctx, c); ctx.stroke(); }
    fadeOutCircles(ctx, sg.removedCircles, eraseMs, ITEM_MS, COL.circle, 1, 1);   // 差分で消える円（グレー）
    flashCircles(ctx, step.badCircles, badInMs, eraseMs, ITEM_MS, ITEM_MS, COL.bad, 0.5); // 悪い円（赤で出現→消去）
    revealCircles(ctx, sg.newCircles, newCircMs, ITEM_MS, COL.circle, 1);          // 新しい外接円

    // 新しい点 p：悪い円が存在する間だけ赤く（badIn で出現 → erase で黒へ復帰）
    const badN = step.badCircles.length;
    if (badN > 0) {
      const pIn  = clamp01(badInMs / ITEM_MS);
      const pOut = clamp01(eraseMs / (Math.max(1, badN) * ITEM_MS));
      const pA = pIn * (1 - pOut);
      if (pA > 0) {
        const [px, py] = points[sIdx];
        ctx.globalAlpha = pA;
        ctx.fillStyle = COL.bad;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  requestAnimationFrame(ts => { stepStart = ts; drawFrame(ts); });
}

// --- 実行制御 ---

function main() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  // ランダムな点の生成
  const points = [];
  for (let i = 0; i < 12; i++) {
    points.push([Math.random() * 400 + 50, Math.random() * 400 + 50]);
  }

  const { steps } = genDelaunaySteps(points);
  animate(canvas, points, steps);
}

window.onload = main;
