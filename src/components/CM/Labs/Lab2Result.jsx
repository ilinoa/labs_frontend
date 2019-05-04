import React from 'react';

export default ({result:{result}, loc}) => {
    console.log(result)
    return (
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>{loc('firstSize')}</th>
                <th>{loc('secondSize')}</th>
                <th>{loc('thirdSize')}</th>
            </tr>
                {result && result[0] &&
                <tr>
                    <th>{loc('firstFactoryPlain')}</th>
                    <td>{result[0][0]}</td>
                    <td>{result[0][1]}</td>
                    <td>{result[0][2]}</td>
                </tr>}
                {result && result[1] &&
                <tr>
                    <th>{loc('secondFactoryPlain')}</th>
                    <td>{result[1][0]}</td>
                    <td>{result[1][1]}</td>
                    <td>{result[1][2]}</td>
                </tr>}

                {result && result[2] &&
                <tr>
                    <th>{loc('thirdFactoryPlain')}</th>
                    <td>{result[2][0]}</td>
                    <td>{result[2][1]}</td>
                    <td>{result[2][2]}</td>
                </tr>
                }
            </tbody>
        </table>
    );
}