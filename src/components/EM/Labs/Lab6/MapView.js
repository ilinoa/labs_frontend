class MapView {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawCities(cities) {
    this.ctx.clearRect(0, 0, 800, 800);

    cities.map(this.drawCityWithRoutes.bind(this));
  }

  drawCityWithRoutes(city) {
    const { x, y, routes } = city;

    this.drawCity(x, y);

    routes.map(this.drawRoute.bind(this, { x, y }));
  }

  drawRoute({ x, y }, route) {
    const { ctx } = this;
    const { pheromone, city } = route;

    ctx.strokeStyle = `rgba(0, 250, 0, ${pheromone * 10})`
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(city.x, city.y);
    ctx.stroke();
  }

  drawMinimum([first, ...restRoute]) {
    const {ctx} = this;
    if (!restRoute[0]) {
      return;
    }

    const {x, y} = first;
    const {x: x1, y: y1} = restRoute[0];

    ctx.strokeStyle =  `rgb(255, 0, 0)`
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    this.drawMinimum(restRoute);
  }

  drawCity(x, y) {
    this.ctx.fillRect(x, y, 5, 5)
  }
}

export default MapView;