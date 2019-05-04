export default class Ant {
  constructor(city, { alpha, beta }) {
    this.currentCity = city;
    this.routeLength = 0;
    this.route = [city];
    this.coefficents = { alpha, beta };
  }

  run(cb) {
    const next = this.resolveNextRoute();
    const weight = next ? this.currentCity.routes[next.index].weight : 0;
    this.routeLength += weight;
    if (!next) {
      return cb(this.route, this.routeLength);
    }

    this.currentCity = next;

    this.route = [
      ...this.route,
      this.currentCity,
    ];

    return this.run(cb);
  }

  resolveNextRoute() {
    const { routes } = this.currentCity;
    const { alpha, beta } = this.coefficents;
    const keys = Object.keys(routes);

    const values = keys.map(index => {
      const { pheromone, weight, city } = routes[index];

      const tao = pheromone === 0 ? 0 : Math.pow(pheromone, alpha);
      const mult = weight === 0 ? 0 : Math.pow((1 / weight), beta);
      return { value: (tao * mult), city }
    }).filter(({ value, city }) => !this.route.includes(city) && value !== 0);

    const sum = values.reduce((acc, { value }) => acc + value, 0);
    const chances = values
      .map(val => ({ ...val, value: val.value / sum, }))
      .reduce((acc, { value, city }) => {
        const { cumulate, roulette } = acc;
        const newCumulate = cumulate + value;
        return {
          cumulate: newCumulate,
          roulette: [...roulette, { city, v: newCumulate }],
        }
      }, { cumulate: 0, roulette: [] });

    const r = Math.random();
    let prev = 0
    for (let val of chances.roulette) {
      if (r > prev && r <= val.v) {
        return val.city;
      }
      prev = val.v
    }
  }
}