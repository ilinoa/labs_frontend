import React from 'react';

export default ({onFieldChange, value, labels, fieldKey}) => {
    const handleFieldChange = (index) => ({target: {value: val}}) => {
        onFieldChange(fieldKey, {
            target: {
                value: value.map((v, i) => {
                    if (i === index) {
                        return val;
                    }

                    return v;
                })
            }
        })
    };

    return (
        <div>
            {labels.map((val, index) => {
                return (
                    <label>
                        <div>{val}</div>
                        <input 
                            key={index} 
                            value={value[index]}
                            onChange={handleFieldChange(index)}
                        />
                    </label>
                )
            })}
        </div>
    )
}