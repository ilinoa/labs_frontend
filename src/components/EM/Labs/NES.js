import gaussian from 'gaussian';

class NES {
  constructor() {
    this.listener = null;
  }

  start({
    sigma,
    populationNumber,
    personLength,
    restriction,
    timeout = 100,
  }) {
    this.distibution = gaussian(0, sigma);
    this.timeout = timeout;
    this.min = 9e100;
    this.counter = 0;
    this.iteration = 0
    this.restriction = restriction;
    this.initPopulation(populationNumber, personLength);
    this.listener(this.population.map(this.getPersonWithSolution.bind(this)));
    this.evolution();
  }

  mutatePopulation() {
    this.population = this.population.map(this.mutatePerson.bind(this));
  }

  mutatePerson(person) {
    const parentFnVal = this.getSolution(person);
    const newPerson = person.map(gen => {
      let s = this.distibution.ppf(Math.random());
      while (Math.abs(s + gen) > this.restriction) {
        s = this.distibution.ppf(Math.random());
      }
      return gen + s;
    });

    const childFnVal = this.getSolution(newPerson);

    return childFnVal < parentFnVal ? newPerson : person;
  }

  evolution() {
    this.mutatePopulation();
    const population = this.population.map(this.getPersonWithSolution.bind(this));
    this.listener('population:new', population)
    console.log(this.iteration++)

    const {min, index} = population.map(person => person.reverse()[0]).reduce((acc, solution, i) => {
      if (acc.min > solution) {
        return { min: solution, index: i };
      }

      return acc;
    }, { min: 9e100, index: 9000 });

    if (min < this.min) {
      this.min = min;
      this.counter = 0;
      this.minSolution = population[index];
      this.listener('minimum:found', this.minSolution)
    } else {
      this.counter++;

      if (this.counter > 100) {
        return;
      }
    }

    setTimeout(this.evolution.bind(this), this.timeout);
  }

  initPopulation(populationNumber, personLength) {
    this.population = Array(populationNumber).fill(null).map(this.initPerson.bind(this, { length: personLength }))
  }

  initPerson({ length, restriction }) {
    const person = Array(length).fill(null).map(this.getRandomNumberWithRestriction.bind(this));

    return person;
  }

  getSolution(person) {
    return person.reduce((acc, next, index) => {
      const prev = next;
      if (index % 2 === 0) {
        return { ...acc, prev, };
      }

      const sum = acc.sum + 100 * Math.pow((next - acc.prev * acc.prev), 2) + (1 - acc.prev) * (1 - acc.prev)

      return { prev: next, sum };
    }, { prev: 0, sum: 0 }).sum;
  }

  getPersonWithSolution(person) {
    const solution = this.getSolution(person);
    return [...person, solution]
  }

  getRandomNumberWithRestriction() {
    const doubled = this.restriction * 2;
    return Math.random() * doubled - this.restriction;
  }

  addDataChangedEventListener(listener) {
    this.listener = listener;
  }
}

export default new NES();