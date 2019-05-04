import React, { Component } from 'react';
import Map from './Map'
import AntGraph from './AntGraph';
import styles from './Lab6.scss';

export default class Lab6 extends Component {
  constructor(props) {
    super(props)
    this.map = Map.initMap(50);
    this.state = {
      alphaCoeff: 1,
      betaCoeff: 1,
      initialPheromoneValue: .001,
      weatherPheromoneValue: .7,
      antNumber: 100,
    }
  }

  handleStart = () => {
    this.map.start(this.renderCities, 500, 1000, this.handleChangeAntPosition);
  }

  handleChangeAntPosition = (position, id) => {
    this.setState({
      ants: this.state.ants.map((ant, index) => index === id ? position : ant)
    })
  }


  renderCities = (cities) => {
    this.setState({ cities })
  }

  handleFieldChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { alphaCoeff, betaCoeff, initialPheromoneValue, weatherPheromoneValue, antNumber } = this.state;

    return (
      <>
        <fieldset className={styles.fieldset}>
          <field>
            <label>Alpha coefficient</label>
            <input name='alphaCoeff' value={alphaCoeff} onChange={this.handleFieldChange} />
          </field>

          <field>
            <label>Beta coefficient</label>
            <input name='betaCoeff' value={betaCoeff} onChange={this.handleFieldChange} />
          </field>

          <field>
            <label>Initial pheromone value</label>
            <input name='initialPheromoneValue' value={initialPheromoneValue} onChange={this.handleFieldChange} />
          </field>
          <field>
            <label>Weather coefficient</label>
            <input name='weatherPheromoneValue' value={weatherPheromoneValue} onChange={this.handleFieldChange} />
          </field>
          <field>
            <label>Ants number</label>
            <input name='antNumber' value={antNumber} onChange={this.handleFieldChange} />
          </field>
        </fieldset>
        <AntGraph
          alphaCoeff={alphaCoeff}
          betaCoeff={betaCoeff}
          initialPheromoneValue={initialPheromoneValue}
          weatherPheromoneValue={weatherPheromoneValue}
          antNumber={antNumber}
        />
      </>
    )
  }
}