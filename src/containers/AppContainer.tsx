import React from 'react';
import Router from './Router';
import styles from '../styles/App.scss';

import ApplicationLayout from '../components/Layout/ApplicationLayout';

interface IProps {

}

export default (props: IProps) => {
    return (
        <ApplicationLayout className={styles.app}>
            <Router />
        </ApplicationLayout>
    )
}