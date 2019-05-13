import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import NES from './NES';

import surface from './data.json';

export default class Lab5 extends Component {
  state = {
    data: [],
    restriction: 2.048,
    sigma: .5,
    populationNumber: 100,

  };

  componentDidMount() {
    const { sigma, populationNumber, personLength = 2, restriction } = this.state;
    NES.addDataChangedEventListener(this.dataChanged);
    NES.start({
      sigma,
      populationNumber,
      personLength,
      restriction
    });
  }

  dataChanged = (type, data) => {
    switch (type) {
      case 'population:new':
        this.setState({ data });
        return;
      case 'minimum:found':
        this.setState({ min: data }, console.log);

        return;
      default:
    }
  }

  render() {
    const { data, min } = this.state;

    const res = {
      x: data.map(val => val[0]),
      y: data.map(val => val[1]),
      z: data.map(val => val[2]),
      type: 'scatter3d',
      mode: 'markers',
      marker: {
        size: 5,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5
        },
        opacity: 0.8
      },
    };

    return (
      <>
        {min && <div>Minimum is - x: {min[1]}, y: {min[2]} z: {min[0]}</div>}
        <Plot data={[surface, res]}
          layout={{ width: 700, height: 740, title: 'Rosenbrock valley' }} />
      </>
    )
  }
}