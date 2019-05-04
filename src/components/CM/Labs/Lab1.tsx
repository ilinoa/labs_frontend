import React from 'react';

import BackButton from '../../controls/BackButton';

interface IProps {
    onBack: () => void
}

export default (props: IProps) => {
    return (
        <div>
            <BackButton onClick={props.onBack}/>
        </div>
    )
}