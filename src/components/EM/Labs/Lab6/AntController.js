import Ant from './Ant';

class AntController {
  constructor(mapController) {
    this.ants = [];
    this.mapController = mapController
    this.counter = 0;
    this.needStop = false;
    this.minimum = 6000;
    this.minimumRoute = [];
  }

  initAnts({ antsNumber, params }) {
    this.ants = [];
    for (let i = 0; i < antsNumber; ++i) {
      this.ants.push(new Ant(this.mapController.getStartCity(), params));
    }
  }

  start({ antsNumber, params, handleChangeMinimum }) {
    this.counter += 1
    window.requestAnimationFrame(() => {
      if (this.needStop) {
        return;
      }
      this.mapController.cities.map(city => city.weatherPheromone());
      this.initAnts({ antsNumber, params });
      this.ants.map(ant => ant.run(this.handleAntRunFinished));

      this.calcMinimum(handleChangeMinimum);

      console.log("Iteration #", this.counter)
      window.requestAnimationFrame(this.start.bind(this, { antsNumber, params, handleChangeMinimum }));
    });
  }

  stop = () => {
    this.needStop = true;
  }

  calcMinimum = (handleChangeMinimum) => {
    const values = this.ants.map(ant => {
      const { routeLength, route } = ant;
      return { route, length: routeLength + route.reverse()[0].routes[0].weight };
    });

    const min = values.reduce((min, next) => min.length < next.length ? min : next, { length: 6000 });
    if (min.length > this.minimum) {
      return;
    }

    this.minimum = min.length;
    this.minimumRoute = [...min.route, min.route[0]];

    handleChangeMinimum({ length: this.minimum, route: this.minimumRoute });
  }

  handleAntRunFinished = (route, sum) => {
    const [first, ...rest] = route;
    first.putPheromone(rest, sum)
  }
}

export default AntController;