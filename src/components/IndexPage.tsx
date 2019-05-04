import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import styles from './IndexPage.scss';
import {subjectsList} from '../source/const/subjects';

interface IProps {

}

export default (props: IProps) => {
    const [state, setState] = useState({x: 0});

    const renderSubject = (name: string, key: number) => {
        return (
            <li key={key} className={styles.item} onClick={setState.bind({x: 2}) as any}>
                <Link to={`/${name}`}>{loc(name)}</Link>
            </li>
        )
    };

    return (
        <div className={styles.container}>
            <h2>{loc('subjects')}</h2>
            <div className={styles.list}>
                <ul>{subjectsList.map(renderSubject)}</ul>
            </div>
        </div>
    )
}