const points = [
  [1150.0, 1760.0],
  [630.0, 1660.0],
  [40.0, 2090.0],
  [750.0, 1100.0],
  [750.0, 2030.0],
  [1030.0, 2070.0],
  [1650.0, 650.0],
  [1490.0, 1630.0],
  [790.0, 2260.0],
  [710.0, 1310.0],
  [840.0, 550.0],
  [1170.0, 2300.0],
  [970.0, 1340.0],
  [510.0, 700.0],
  [750.0, 900.0],
  [1280.0, 1200.0],
  [230.0, 590.0],
  [460.0, 860.0],
  [1040.0, 950.0],
  [590.0, 1390.0],
  [830.0, 1770.0],
  [490.0, 500.0],
  [1840.0, 1240.0],
  [1260.0, 1500.0],
  [1280.0, 790.0],
  [490.0, 2130.0],
  [1460.0, 1420.0],
  [1260.0, 1910.0],
  [360.0, 1980.0],
];
export default function drawPoints(route = []) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  clearCanvasRectangle(ctx);
  drawEmptyRoute(ctx);
  if (route.length)  {
    drawRoute(ctx, route);
  }
}

function clearCanvasRectangle(context) {
    context.clearRect (0, 0, 800, 800);
}

function drawEmptyRoute(ctx) {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  points.map(point => {
    ctx.fillRect(...getPointCoordinates(point, 2) , 5, 5)
  });
}

function drawRoute(ctx, route) {
  ctx.fillStyle = 'rgb(0, 0, 255)';
  const next = route[0];
  drawLine(ctx, getPointCoordinates(points[0]), getPointCoordinates(points[next]));
  for (let i=next; i !== 0; i=route[i]) {
    drawLine(ctx, getPointCoordinates(points[i]), getPointCoordinates(points[route[i]]));
  }
}

function getPointCoordinates(point, substractor = 0) {
  return [point[0] / 10 * 2 - substractor, point[1] / 10 * 2 - substractor];
}

function drawLine(context, first, last) {
  context.beginPath(); 
  context.moveTo(...first);
  context.lineTo(...last);
  context.stroke();
}