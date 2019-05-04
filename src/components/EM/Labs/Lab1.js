import React, {useState} from 'react';
import {Scatter} from 'react-chartjs-2';
import EPApi from '../../../api/EPApi';
import useFieldChange from '../../../hooks/use-field-change';

export default () => {
    const [result, setResult] = useState([]);
    const {values, handleFieldChange} = useFieldChange({
        floor: -20,
	    ceil: -2.3,
	    precision: 3,
        quantity: 300,
        iterations: 0,
    });
    const getResult = async (e) => {
        e.preventDefault();
        const res = await EPApi.firstLab(values);
        setResult(res)
    };
    const dataSet = [];
    //Cos(2x)/x^2
    let x = -20

    while (x <= -2.3) {
        dataSet.push({x, y: Math.cos(2*x) / (x * x)})
        x += .1
    }
    const data = {
        datasets: [
            {
                label: "Persons",
                backgroundColor: "rgba(75,192,192,0.4)",
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointRadius: 2,
                pointHitRadius: 10,
                data: result.result
              },
              {
                borderColor: 'rgba(75,192,192,0.4)',
                borderWidth: 1,
                label: "cos(2x)/x^2",
                data: dataSet,
                pointRadius: 0,
                showLine: true
              }
        ]
      };
      console.log(result.result)
    return (
        <div>
            <form onSubmit={getResult}>
                <input value={values.floor} onChange={handleFieldChange.bind(this, 'floor')} placeholder='floor'/>
                <input value={values.ceil} onChange={handleFieldChange.bind(this, 'ceil')} placeholder='ceil'/>
                <input value={values.precision} onChange={handleFieldChange.bind(this, 'precision')} placeholder='precision'/>
                <input value={values.quantity} onChange={handleFieldChange.bind(this, 'quantity')} placeholder='quantity'/>
                <input value={values.iterations} onChange={handleFieldChange.bind(this, 'iterations')} placeholder='iterations'/>
                <input type='submit' />
            </form>
        
            <Scatter data={data} />
        </div>
    )
}