import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import styles from './ApplicationLayout.scss';

interface IProps {
    children: any,
    className: String,
}

export default (props: IProps) => {
    return (
        <div className={classnames(props.className, styles.container)}>
            <header>
                <Link to='/' className={styles.main}>
                    <h1>{loc('title')}</h1>
                </Link>
            </header>
            <section className={styles.paper}>
                {props.children}
            </section>
        </div>
    )
}