import {useState} from 'react';
import React from "react";

interface IProps {
    onBack: () => void,
    loc?: (s: string) => string
}

interface IObject {
    TabComponent: React.FunctionComponent<IProps>,
    index: number
    setSelected: (value: number) => void
}

export default (initSelected: number, tabs: any): IObject => {
    const [selected, setSelected] = useState(initSelected);

    return {
        TabComponent: tabs[selected - 1],
        index: selected,
        setSelected
    };
}