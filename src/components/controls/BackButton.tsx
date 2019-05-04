import React from 'react';

import styles from './BackButton.scss';

interface IProps {
    onClick: () => void
}

export default (props: IProps) => {
    return (
        <div className={styles.button} onClick={props.onClick}/>
    )
}