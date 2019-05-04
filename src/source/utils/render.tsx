import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

export default (Component: Function) => {
    return ReactDOM.render(
        <BrowserRouter>
            <Component/>
        </BrowserRouter>,
        document.getElementById('root')
    );
};