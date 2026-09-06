/**
 * Delaunay Triangulation - Robust Version
 */

// --- ユーティリティ関数 ---

function pointsToTriangle(p1, p2, p3) {
  return [p1, p2, p3];
}

function triangleToCircumcenter(triangle) {
  let x = math.complex(triangle[0].x, triangle[0].y);
  let y = math.complex(triangle[1].x, triangle[1].y);
  let z = math.complex(triangle[2].x, triangle[2].y);
  // w = z - x
  let w = math.subtract(z, x);
  // w = (y - x) / w
  w = math.divide(w, math.subtract(y, x));
  // c = (x - y) * (w - abs(w) ** 2) / 2j / w.imag - x
  let c = math.subtract(math.divide(math.divide(math.multiply(math.subtract(x, y), math.subtract(w, math.pow(w.abs(), 2))), math.complex(0, 2)), w.im), x);
  let radius = math.abs(math.add(c, x));
  return [[math.subtract(0, c.re), math.subtract(0, c.im)], radius];
}

function getDistance(center, point) {
  const dx = center[0] - point.x;
  const dy = center[1] - point.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// --- メインアルゴリズム ---

function genDelaunay(points) {
  // 1. 初期三角形 (キャンバスを完全に包む巨大な三角形)
  // 座標が大きすぎると精度が落ちるため、適切な範囲に設定
  let delaunay = [pointsToTriangle({ x: -1000, y: -1000 }, { x: 2000, y: -1000 }, { x: 500, y: 2000 })];

  for (let n = 0; n < points.length; n++) {
    const p = points[n];
    const pointToAdd = { x: p[0], y: p[1] };

    let invalidTriangles = [];

    // 2. 無効な三角形を探す
    for (let i = 0; i < delaunay.length; i++) {
      const [circumCenter, radius] = triangleToCircumcenter(delaunay[i]);
      if (radius > 0 && getDistance(circumCenter, pointToAdd) < radius) {
        invalidTriangles.push(delaunay[i]);
      }
    }

    // 3. 無効な三角形を削除し、その頂点を収集
    let pointsInInvalid = [];
    for (let i = 0; i < invalidTriangles.length; i++) {
      const tri = invalidTriangles[i];
      
      // delaunay から削除
      const idx = delaunay.indexOf(tri);
      if (idx > -1) delaunay.splice(idx, 1);

      // 頂点を追加
      for (let j = 0; j < tri.length; j++) {
        pointsInInvalid.push(tri[j]);
      }
    }

    // 4. 重複を排除 (参照を維持)
    const uniquePointsMap = new Map();
    for (const pt of pointsInInvalid) {
      const key = `${pt.x.toFixed(5)},${pt.y.toFixed(5)}`; // 精度を考慮して文字列化
      if (!uniquePointsMap.has(key)) {
        uniquePointsMap.set(key, pt);
      }
    }
    const uniquePoints = Array.from(uniquePointsMap.values());

    // 5. 境界線（エッジ）を特定して新しい三角形を作る
    for (let i = 0; i < uniquePoints.length; i++) {
      for (let j = i + 1; j < uniquePoints.length; j++) {
        let countOccurrences = 0;

        for (let k = 0; k < invalidTriangles.length; k++) {
          // 参照比較
          const p1InTri = invalidTriangles[k].includes(uniquePoints[i]);
          const p2InTri = invalidTriangles[k].includes(uniquePoints[j]);

          if (p1InTri && p2InTri) {
            countOccurrences++;
          }
        }

        // 境界線（1つの無効な三角形にしか含まれない辺）に対して新しい三角形を作成
        if (countOccurrences === 1) {
          delaunay.push(pointsToTriangle(uniquePoints[i], uniquePoints[j], pointToAdd));
        }
      }
    }
  }

  // 最後に、初期三角形の頂点（キャンバス外の点）を含む三角形を除去したい場合はここで行う
  // 今回はシンプルにするため、そのまま返します
  return delaunay;
}

// --- 描画関数 ---

function drawDelaunay(ctx, delaunay, points) {
  // 三角形の描画
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  for (const tri of delaunay) {
    // 初期三角形（キャンバス外）は描画しないように判定
    const isOutside = tri.some(p => p.x < 0 || p.x > 500 || p.y < 0 || p.y > 500);
    if (isOutside) continue;

    ctx.beginPath();
    ctx.moveTo(tri[0].x, tri[0].y);
    ctx.lineTo(tri[1].x, tri[1].y);
    ctx.lineTo(tri[2].x, tri[2].y);
    ctx.closePath();
    ctx.stroke();
  }

  // 点の描画
  ctx.fillStyle = "red";
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- 実行制御 ---

function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  // ランダムな点を10個生成
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push([Math.random() * 500, Math.random() * 500]);
  }

  // アルゴリズム実行
  const delaunay = genDelaunay(points);

  // 描画
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDelaunay(ctx, delaunay, points);
  
  console.log("Delaunay triangles count:", delaunay.length);
}

main();