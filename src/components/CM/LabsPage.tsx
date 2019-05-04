import React from 'react';
import _ from 'lodash';

import styles from './LabsPage.scss';
import useInternalSelector from '../../hooks/use-internal-selector';
import Lab1 from './Labs/Lab1';
import Lab2 from './Labs/Lab2';

interface IProps {

}

const tabs = [
    Lab1,
    Lab2,
];

export default (props: IProps) => {
    const {TabComponent, index, setSelected} = useInternalSelector(0, tabs);
    if (index !== 0) {
        return <TabComponent onBack={() => {setSelected(0)}} loc={loc}/>;
    }

    const renderLab = (item: number, key: number) => {
        return (
            <li key={key} className={styles.item} onClick={() => setSelected(item)}>
                <div>{`${loc('lab')} ${item}`}</div>
            </li>
        )
    };

    return (
        <div className={styles.container}>
            <h2>{loc('labs')}</h2>
            <div className={styles.list}>
                <ul>{_.range(1, 3).map(renderLab)}</ul>
            </div>
        </div>
    );
};
