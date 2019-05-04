class City {
  constructor(initialPheromoneValue, weatherPheromoneCoefficent, { x, y }, index) {
    this.routes = [];
    this.initialPheromoneValue = initialPheromoneValue;
    this.weatherPheromoneCoefficent = weatherPheromoneCoefficent;
    this.x = x / 3;
    this.y = y / 3;
    this.index = index;
  }

  addRoute(city, weight, index) {
    const route = {
      city,
      weight,
      pheromone: this.initialPheromoneValue,
    }

    this.routes = [
      ...this.routes,
      route,
    ];
  }

  addRoutes(cities, weights) {
    cities.map((city, index) => {
      this.addRoute(city, weights[index], index)
    })
  }

  putPheromone([city, ...restCities], value) {
    if (!city) {
      return;
    }
    
    this.routes[city.index].pheromone += 1 / value;

    this.routes[city.index].city.putPheromone(restCities, value)
  }

  weatherPheromone() {
    Object.values(this.routes).map(route => {
      route.pheromone *= this.weatherPheromoneCoefficent
    })
  }
}

export default City;