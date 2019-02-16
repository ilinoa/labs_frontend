import {useState} from 'react';

export default function (initialState) {
  const [values, setValue] = useState(initialState);

  const handleFieldChange = (fieldKey, {target: {value}}) => {
    setValue({
      ...values,
      [fieldKey]: value,
    });
  };

  return {values, handleFieldChange};
}