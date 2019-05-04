import React, {useState} from 'react';

import KMApi from '../../../api/KMApi';
import BackButton from '../../controls/BackButton';
import InputGroup from '../../controls/InputGroup';
import useFieldChange from '../../../hooks/use-field-change';
import Lab2Result from './Lab2Result';
import styles from './Lab2.scss';


export default (props) => {
    const {loc} = props;
    const {values, handleFieldChange} = useFieldChange({
        factories: [1000, 1500, 2500],
        sizes: [1000, 1500, 1200],
        fPrices: [110, 115, 126],
        sPrices: [107, 115, 130],
        tPrices: [104, 109, 116],
    }); 
    const [result, setResult] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await KMApi.secondLab({
            factories: values.factories,
            sizes: values.sizes,
            prices: [
                values.fPrices,
                values.sPrices,
                values.tPrices
            ]
        });
        console.log(res);
        setResult(res);
    }

    return (
        <div>
            <BackButton onClick={props.onBack}/>

            <form
                onSubmit={handleSubmit}
            >
                <InputGroup 
                    onFieldChange={handleFieldChange}
                    fieldKey='factories'
                    labels={[loc('firstFactory'), loc('secondFactory'), loc('thirdFactory')]}
                    value={values.factories}
                />
                <InputGroup 
                    onFieldChange={handleFieldChange}
                    fieldKey='sizes'
                    labels={[loc('firstSize'), loc('secondSize'), loc('thirdSize')]}
                    value={values.sizes}
                />
                <div className={styles.threeCols}>
                <label>
                <div>{loc('firstFactoryPrices')}</div>
                <InputGroup 
                    onFieldChange={handleFieldChange}
                    fieldKey='fPrices'
                    labels={[loc('firstSize'), loc('secondSize'), loc('thirdSize')]}
                    value={values.fPrices}
                />
                </label>
                <label>
                    <div>{loc('secondFactoryPrices')}</div>
                    <InputGroup 
                        onFieldChange={handleFieldChange}
                        fieldKey='sPrices'
                        labels={[loc('firstSize'), loc('secondSize'), loc('thirdSize')]}
                        value={values.sPrices}
                    />
                    </label>
                <label>
                    <div>{loc('thirdFactoryPrices')}</div>
                    <InputGroup 
                        onFieldChange={handleFieldChange}
                        fieldKey='tPrices'
                        labels={[loc('firstSize'), loc('secondSize'), loc('thirdSize')]}
                        value={values.tPrices}
                    />
                </label>
                </div>
                <input type='submit' />
            </form>
            <Lab2Result result={result} loc={loc}/>
        </div>
    )
}