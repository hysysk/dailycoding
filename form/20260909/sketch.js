/**
 * Delaunay Triangulation & Voronoi Diagram with Circumcircles
 * Full Implementation: Bowyer-Watson Algorithm
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

// --- メインアルゴリズム (Bowyer-Watson) ---

function genDelaunay(points) {
  // 1. Super-triangle (キャンバスを十分に覆う巨大な三角形)
  const st = [
    { x: -2000, y: -2000 },
    { x: 4000, y: -2000 },
    { x: 1000, y: 4000 }
  ];
  let delaunay = [pointsToTriangle(st[0], st[1], st[2])];

  for (let n = 0; n < points.length; n++) {
    const p = { x: points[n][0], y: points[n][1] };
    let badTriangles = [];

    // 2. 外接円の中に新しい点が含まれる三角形を探す
    for (let i = 0; i < delaunay.length; i++) {
      const tri = delaunay[i];
      const cc = getCircumcenter(tri[0], tri[1], tri[2]);
      if (cc.r > 0 && getDistance(cc, p) < cc.r) {
        badTriangles.push(i);
      }
    }

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
          const otherTri = delaunay[badTriangles[j]];
          let sharedCount = 0;
          if (isSamePoint(edge[0], otherTri[0]) || isSamePoint(edge[0], otherTri[1]) || isSamePoint(edge[0], otherTri[2])) sharedCount++;
          if (isSamePoint(edge[1], otherTri[0]) || isSamePoint(edge[1], otherTri[1]) || isSamePoint(edge[1], otherTri[2])) sharedCount++;
          if (sharedCount === 2) { isShared = true; break; }
        }
        if (!isShared) polygon.push(edge);
      }
    }

    // 4. 無効な三角形を削除
    badTriangles.sort((a, b) => b - a);
    for (let idx of badTriangles) {
      delaunay.splice(idx, 1);
    }

    // 5. 新しい三角形を追加
    for (let edge of polygon) {
      delaunay.push(pointsToTriangle(edge[0], edge[1], p));
    }
  }
  return delaunay;
}

// --- 描画関数 ---

function drawCircumcircles(ctx, delaunay, circumcenters, points) {
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  const superPoints = [{ x: -2000, y: -2000 }, { x: 4000, y: -2000 }, { x: 1000, y: 4000 }];

  for (let i = 0; i < delaunay.length; i++) {
    const hasSuper = delaunay[i].some(tp => 
      superPoints.some(sp => isSamePoint(sp, tp))
    );
    if (hasSuper) continue;

    const cc = circumcenters[i];
    if (cc.r > 0) {
      ctx.beginPath();
      ctx.arc(cc.x, cc.y, cc.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawDelaunay(ctx, delaunay, points) {
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  const superPoints = [{ x: -2000, y: -2000 }, { x: 4000, y: -2000 }, { x: 1000, y: 4000 }];

  for (const tri of delaunay) {
    const hasSuper = tri.some(tp => superPoints.some(sp => isSamePoint(sp, tp)));
    if (hasSuper) continue;

    ctx.beginPath();
    ctx.moveTo(tri[0].x, tri[0].y);
    ctx.lineTo(tri[1].x, tri[1].y);
    ctx.lineTo(tri[2].x, tri[2].y);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillStyle = "#000000";
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVoronoi(ctx, delaunay, circumcenters, points) {
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  const superPoints = [{ x: -2000, y: -2000 }, { x: 4000, y: -2000 }, { x: 1000, y: 4000 }];

  const triHasSuper = delaunay.map(tri => 
    tri.some(tp => superPoints.some(sp => isSamePoint(sp, tp)))
  );

  for (let i = 0; i < delaunay.length; i++) {
    for (let j = i + 1; j < delaunay.length; j++) {
      if (triHasSuper[i] && triHasSuper[j]) continue;

      let common = 0;
      for (let p1 of delaunay[i]) {
        for (let p2 of delaunay[j]) {
          if (isSamePoint(p1, p2)) common++;
        }
      }

      if (common === 2) {
        const c1 = circumcenters[i];
        const c2 = circumcenters[j];

        // 画面外に飛びすぎる線をカット
        if (Math.abs(c1.x) < 2000 && Math.abs(c1.y) < 2000 &&
            Math.abs(c2.x) < 2000 && Math.abs(c2.y) < 2000) {
          ctx.beginPath();
          ctx.moveTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.stroke();
        }
      }
    }
  }
}

// --- 実行制御 ---

function main() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  // ランダムな点の生成
  const points = [];
  for (let i = 0; i < 12; i++) {
    points.push([Math.random() * 400 + 50, Math.random() * 400 + 50]);
  }

  // アルゴリズム実行
  const delaunay = genDelaunay(points);
  const circumcenters = delaunay.map(tri => getCircumcenter(tri[0], tri[1], tri[2]));

  // 描画レイヤーの重ね合わせ
  // 1. 外接円 (一番下)
  drawCircumcircles(ctx, delaunay, circumcenters, points);
  // 2. Delaunay三角形 (中間)
  drawDelaunay(ctx, delaunay, points);
  // 3. ボロノイ図 (一番上)
  drawVoronoi(ctx, delaunay, circumcenters, points);
}

window.onload = main;