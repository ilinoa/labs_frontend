import React from 'react';
import {Switch, Route} from 'react-router-dom';
import IndexPage from '../components/IndexPage';
import CMLabsPage from '../components/CM/LabsPage';
import EMLabsPage from '../components/EM/LabsPage';

interface IProps {

};

export default (props: IProps) => {
    return (
        <Switch>
            <Route path='/' component={IndexPage} exact/>
            <Route path='/computerModelling' component={CMLabsPage} />
            }/>
            <Route path='/evolutionPO' component={EMLabsPage} />
        </Switch>
    )
}