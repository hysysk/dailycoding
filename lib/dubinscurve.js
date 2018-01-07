// ported from
// https://github.com/AtsushiSakai/PythonRobotics/blob/master/PathPlanning/DubinsPath/dubins_path_planning.py

function mod2pi(theta) {
  return theta - 2.0 * Math.PI * Math.floor(theta / 2.0 / Math.PI);
}

function pi2pi(angle) {
  while(angle >= Math.PI) {
    angle = angle - 2.0 * Math.PI;
  }

  while(angle <= -Math.PI) {
    angle = angle + 2.0 * Math.PI;
  }

  return angle;
}

function zip() {
    let args = [].slice.call(arguments);
    let shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

function lsl(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["L", "S", "L"];
  let pSquared = 2 + (d * d) - (2 * cab) + (2 * d * (sa - sb));
  if(pSquared < 0) {
    return [null, null, null, mode];
  }

  let tmp0 = d + sa - sb;
  let tmp1 = Math.atan2((cb - ca), tmp0);
  let t = mod2pi(-alpha + tmp1);
  let p = Math.sqrt(pSquared);
  let q = mod2pi(beta - tmp1);

  return [t, p, q, mode];
}

function rsr(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["R", "S", "R"];
  let pSquared = 2 + (d * d) - (2 * cab) + (2 * d * (sb - sa));
  if(pSquared < 0) {
    return [null, null, null, mode];
  }

  let tmp0 = d - sa + sb;
  let tmp1 = Math.atan2((ca - cb), tmp0);
  let t = mod2pi(alpha - tmp1);
  let p = Math.sqrt(pSquared);
  let q = mod2pi(-beta + tmp1);

  return [t, p, q, mode];
}

function lsr(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["L", "S", "R"];
  let pSquared = -2 + (d * d) - (2 * cab) + (2 * d * (sa + sb));
  if(pSquared < 0) {
    return [null, null, null, mode];
  }
  let p = Math.sqrt(pSquared);
  let tmp0 = d + sa + sb;
  let tmp1 = Math.atan2((-cb - ca), tmp0) - Math.atan2(-2.0, p);
  let t = mod2pi(-alpha + tmp1);
  let q = mod2pi(-mod2pi(beta) + tmp1);

  return [t, p, q, mode];
}

function rsl(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["R", "S", "L"];
  let pSquared = -2 + (d * d) - (2 * cab) - (2 * d * (sa + sb));
  if(pSquared < 0) {
    return [null, null, null, mode];
  }
  let p = Math.sqrt(pSquared);
  let tmp0 = d - sa - sb;
  let tmp1 = Math.atan2((ca + cb), tmp0) - Math.atan2(2.0, p);
  let t = mod2pi(alpha - tmp1);
  let q = mod2pi(beta - tmp1);

  return [t, p, q, mode];
}

function rlr(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["R", "L", "R"];
  let tmpRLR = (6.0 - d * d + 2.0 * cab + 2.0 * d * (sa - sb)) / 8.0;
  if(Math.abs(tmpRLR) > 1.0) {
    return [null, null, null, mode];
  }
  let p = mod2pi(2 * Math.PI - Math.acos(tmpRLR));
  let tmp0 = d - sa + sb;
  let tmp1 = Math.atan2((ca - cb), tmp0) + mod2pi(p / 2.0);
  let t = mod2pi(alpha - tmp1);
  let q = mod2pi(alpha - beta - t + mod2pi(p));

  return [t, p, q, mode];
}

function lrl(alpha, beta, d) {
  let sa = Math.sin(alpha);
  let sb = Math.sin(beta);
  let ca = Math.cos(alpha);
  let cb = Math.cos(beta);
  let cab = Math.cos(alpha - beta);

  let mode = ["L", "R", "L"];
  let tmpLRL = (6.0 - d * d + 2.0 * cab + 2.0 * d * (sb - sa)) / 8.0;
  if(Math.abs(tmpLRL) > 1.0) {
    return [null, null, null, mode];
  }
  let p = mod2pi(2 * Math.PI - Math.acos(tmpLRL));
  let tmp0 = d + sa - sb;
  let tmp1 = Math.atan2((ca - cb), tmp0) + p / 2.0;
  let t = mod2pi(-alpha - tmp1);
  let q = mod2pi(mod2pi(beta) - alpha - t + mod2pi(p));

  return [t, p, q, mode];
}

function pathPlanningFromOrigin(ex, ey, eyaw, c) {
  let dx = ex;
  let dy = ey;
  let tmp = Math.sqrt(dx ** 2.0 + dy ** 2.0)
  let d = tmp / c;

  let theta = mod2pi(Math.atan2(dy, dx));
  let alpha = mod2pi(-theta);
  let beta = mod2pi(eyaw - theta);

  let planners = [lsl, rsr, lsr, rsl, rlr, lrl];

  let bcost = Infinity;
  let [bt, bp, bq, bmode] = [null, null, null, null];

  for(let i=0; i<planners.length; i++) {
    let [t, p, q, mode] = planners[i](alpha, beta, d)
    if(!t) {
      // console.log(mode.join(""), "cannot generate path");
      continue;
    }

    let cost = (Math.abs(t) + Math.abs(p) + Math.abs(q));

    if(bcost > cost) {
      [bt, bp, bq, bmode] = [t, p, q, mode];
      bcost = cost;
    }
  }

  let [px, py, pyaw] = generateCourse([bt, bp, bq], bmode, c);

  return [px, py, pyaw, bmode, bcost];
}

function pathPlanning(sx, sy, syaw, ex, ey, eyaw, c) {
  ex = ex - sx;
  ey = ey - sy;

  let lex = Math.cos(syaw) * ex + Math.sin(syaw) * ey;
  let ley = -Math.sin(syaw) * ex + Math.cos(syaw) * ey;
  let leyaw = eyaw - syaw;

  let [lpx, lpy, lpyaw, mode, clen] = pathPlanningFromOrigin(lex, ley, leyaw, c);

  let px = [];
  let lp = zip(lpx, lpy);
  for(let i=0; i<lp.length; i++) {
    px.push(Math.cos(-syaw) * lp[i][0] + Math.sin(-syaw) * lp[i][1] + sx);
  }

  let py = [];
  let lp2 = zip(lpx, lpy);
  for(let i=0; i<lp2.length; i++) {
    py.push(-Math.sin(-syaw) * lp2[i][0] + Math.cos(-syaw) * lp2[i][1] + sy);
  }

  let pyaw = [];
  for(let i=0; i<lpyaw.length; i++) {
    pyaw.push(pi2pi(lpyaw[i] + syaw));
  }

  return [px, py, pyaw, mode, clen];
}

function generateCourse(length, mode, c) {
  let px = [0.0];
  let py = [0.0];
  let pyaw = [0.0];

  let modeAndLength = zip(mode, length);

  for(let i=0; i<modeAndLength.length; i++) {
    pd = 0.0;
    let d;
    let [m, l] = modeAndLength[i];

    if(m == "S") {
      d = 1.0 / c;
    } else {
      d = deg2rad(3.0);
    }

    while(pd < Math.abs(l - d)) {
      px.push(px[px.length-1] + d * c * Math.cos(pyaw[pyaw.length-1]));
      py.push(py[py.length-1] + d * c * Math.sin(pyaw[pyaw.length-1]));

      if(m == "L") {
        pyaw.push(pyaw[pyaw.length-1] + d);
      } else if(m == "S") {
        pyaw.push(pyaw[pyaw.length-1]);
      } else if(m == "R") {
        pyaw.push(pyaw[pyaw.length-1] - d);
      }

      pd += d;
    }

    d = l - pd;
    px.push(px[px.length-1] + d * c * Math.cos(pyaw[pyaw.length-1]));
    py.push(py[py.length-1] + d * c * Math.sin(pyaw[pyaw.length-1]));

    if(m == "L") {
      pyaw.push(pyaw[pyaw.length-1] + d);
    } else if(m == "S") {
      pyaw.push(pyaw[pyaw.length-1])
    } else if(m == "R") {
      pyaw.push(pyaw[pyaw.length-1] - d);
    }
    pd += d;
  }

  return [px, py, pyaw];
}
