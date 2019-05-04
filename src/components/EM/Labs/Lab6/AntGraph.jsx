import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MapController from './MapController';
import AntController from './AntController';

export default class AntGraph extends PureComponent {
  static propTypees = {
    alphaCoeff: PropTypes.number,
    betaCoeff: PropTypes.number,
    initialPheromoneValue: PropTypes.number,
    weatherPheromoneValue: PropTypes.number,
    antsNumber: PropTypes.number
  };

  static defaultProps = {
    alphaCoeff: 1,
    betaCoeff: 1,
    initialPheromoneValue: .0001,
    weatherPheromoneValue: .50,
    antsNumber: 100,
  };

  state = {
    isStarted: false,
    minimum: {length: 6000, route: []},
  }

  prevMinimum = 6000;

  handleChangeMinimum = (minimum) => {
    this.setState({ minimum });
  }

  handleStop = () => {
    this.mapController.stop();
    this.antController.stop();

    this.setState({ isStarted: false })
    this.prevMinimum = 6000;
    clearInterval(this.timer);
  }

  handleStart = () => {
    this.setState({minimum: 6000,});
    this.prevMinimum = 6000;

    const {
      initialPheromoneValue,
      weatherPheromoneValue,
      antsNumber,
      alphaCoeff,
      betaCoeff
    } = this.props;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    this.mapController = new MapController(ctx);
    this.mapController.initCities(initialPheromoneValue, weatherPheromoneValue);
    this.mapController.start();

    this.antController = new AntController(this.mapController);
    this.antController.start({
      antsNumber,
      params: { alpha: alphaCoeff, beta: betaCoeff },
      handleChangeMinimum: this.handleChangeMinimum,
    });
    this.setState({ isStarted: true });

    this.timer = setInterval(this.checkMinimumFound, 2000);
  }

  checkMinimumFound = () => {
    if (this.prevMinimum !== this.state.minimum.length) {
      this.prevMinimum = this.state.minimum.length;
      return;
    }

    this.handleMinimumFound();
  }

  handleMinimumFound() {
    this.antController.stop();

    this.mapController.minimumFound(this.state.minimum.route);

    this.setState({isStarted: false})
    clearInterval(this.timer);
  }

  render() {
    const { isStarted, minimum } = this.state;
    return (
      <div>
        {isStarted
          ? <button onClick={this.handleStop}>Stop</button>
          : <button onClick={this.handleStart}>Start</button>}
          <span>Minimum length is {minimum.length}</span>
        <canvas id="canvas" height="800" width="800"></canvas>
      </div>
    );
  }
}
