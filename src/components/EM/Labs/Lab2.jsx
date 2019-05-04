import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import EPApi from '../../../api/EPApi';
import useFieldChange from '../../../hooks/use-field-change';
import surface from './data.json';

export default () => {
    const [result, setResult] = useState([]);
    const {values, handleFieldChange} = useFieldChange({
        floor: -2.048,
	    ceil: 2.048,
	    measures: 2,
        quantity: 300,
        iterations: 0,
    });
    const getResult = async (e) => {
        e.preventDefault();
        const res = await EPApi.secondLab(values);
        setResult(res)
    };
    
    const data = result.map(({x, y}) => {
        return {x: x[0], y: x[1],  z: y}
    })

    const surfaceData = [];
    const {floor, ceil} = values;
    for (let i=floor; i<ceil; i+=.01 ) {
        for (let j=floor; j<ceil; j+=.01 ) {
            const z = 100*Math.pow((j-Math.pow(i, 2)), 2) + Math.pow((1-i), 2)
            surfaceData.push([z, i , j])
        }
    }


    const res = {
        x: data.map(val => val.x),
        y: data.map(val => val.y),
        z: data.map(val => val.z),
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
        <div>
            <form onSubmit={getResult}>
                <input value={values.floor} onChange={handleFieldChange.bind(this, 'floor')} placeholder='floor'/>
                <input value={values.ceil} onChange={handleFieldChange.bind(this, 'ceil')} placeholder='ceil'/>
                <input value={values.measures} onChange={handleFieldChange.bind(this, 'measures')} placeholder='measures'/>
                <input value={values.quantity} onChange={handleFieldChange.bind(this, 'quantity')} placeholder='quantity'/>
                <input value={values.iterations} onChange={handleFieldChange.bind(this, 'iterations')} placeholder='iterations'/>
                <input type='submit' />
            </form>
            <Plot data={[res, surface]}
                    layout={ {width: 700, height: 740, title: 'Rosenbrock valley'} }/>
        </div>
    )
}