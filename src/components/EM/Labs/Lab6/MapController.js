import weights from './sources/weights.json';
import cities from './sources/cities.json';
import City from './City';
import MapView from './MapView';

class MapController {
  constructor(ctx) {
    this.cities = [];
    this.view = new MapView(ctx);
    this.needStop = false;
  }

  initCities(initialPheromone, weatherPheromoneCoefficent) {
    this.createCitiesInstances(initialPheromone, weatherPheromoneCoefficent);

    this.cities.map((city, index) => {
      city.addRoutes(this.cities, weights[index]);
    });
  }

  createCitiesInstances(initialPheromone, weatherPheromoneCoefficent) {
    this.cities = cities.map((city, index) => {
        return new City(initialPheromone, weatherPheromoneCoefficent, city, index);
    });
  }

  start = () => {
    window.requestAnimationFrame(() => {
      if (this.needStop) {
        return;
      }
      this.view.drawCities(this.cities);

      window.requestAnimationFrame(this.start)
    });
  }

  stop = () => {
    this.needStop = true;
  }

  minimumFound = (route) => {
    this.needStop = true;

    this.view.drawMinimum(route);
  }

  getStartCity = () => {
    return this.cities[0];
  }
}

export default MapController;