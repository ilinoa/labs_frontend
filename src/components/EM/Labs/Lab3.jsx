import React, { useState, useEffect } from 'react';
import EPApi from '../../../api/EPApi';
import useFieldChange from '../../../hooks/use-field-change';
import drawPoints from './drawPoints';

export default () => {
    const [file, setFile] = useState();
    const { values, handleFieldChange } = useFieldChange({
        quantity: 20,
        iterations: 30,
    });
    const [route, seetRoute] = useState();
    const onFileUpload = e => {
        setFile(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { quantity, iterations } = values;

        const route = await EPApi.thirdLab(quantity, iterations, file);

        seetRoute(route);
    }

    useEffect(() => {
        drawPoints(route);
    }, [route])

    return (
        <div>
            <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
                <input type='file' onChange={onFileUpload} />
                <input onChange={handleFieldChange.bind(this, 'quantity')} value={values.quantity} />
                <input type='submit' />
            </form>
            <canvas id="canvas" height="750" width="750" onLoad={drawPoints}></canvas>
        </div>
    )
}

