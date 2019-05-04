import City from './City';
import Ant from './Ant';
import cities from './sources/cities';
import weights from './sources/weights'

class Map {
  constructor(numberOfAnts, startCity) {
    this.initCities(cities, weights);
    this.initAnts(numberOfAnts, startCity)
  }

  initCities(cities, weights) {
    this.cities = cities.map(({ x, y }, index) => {
      return new City(x, y, index, weights[index]);
    });
  }

  initAnts(numberOfAnts, startCity) {
    this.numberOfAnts = numberOfAnts;
  }

  handleCityResolved(newIndex) {
    //this.cities[oldIndex].feromons[newIndex] = this.cities[oldIndex].feromons[newIndex] + addPheromon;
    return this.cities[newIndex];
  }

  start(renderFn, delay, returns, handleChangeAntPosition) {
    for (let j = 0; j < returns; ++j) {
      let i = 0
      const ants = Array(this.numberOfAnts).fill(undefined)
        .map((_, index) => {
          const ant = new Ant(this.cities[0], this.handleCityResolved.bind(this), handleChangeAntPosition, index);

          return ant
        });

      const interval = setInterval(() => {
        if (i >= this.cities.length - 1) {
          clearInterval(interval);
          this.correctFeromons(ants);
          renderFn(this.cities);
          return;
        }
        ants.map(ant => ant.go());
        i++;
        renderFn(this.cities);
      }, delay);

    }
  }

  correctFeromons(ants) {
    // console.log(ants)
    ants.map(ant => {
      console.log(ant, ant.visitedCities)
      window.ant = ant
      const {currentRouteCost, visitedCities} = ant;
      // console.log(visitedCities)
      visitedCities.reduce((acc, next) => {
        if (acc === -1) {
          return next;
        }

        this.cities[acc].feromons[next] = .9 * this.cities[acc].feromons[next] + 1/currentRouteCost;
        return next;
      }, -1)
    });
  }

  static initMap(ants, startCity = 0) {
    return new Map(ants, startCity);
  }
}

export default Map;