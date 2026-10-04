import React, { useState } from 'react';

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="controlledInput">Input Contrôlé :</label>
      <input
        type="text"
        id="controlledInput"
        value={inputValue}
        onChange={handleChange}
      />
      <p>Valeur actuelle : {inputValue}</p>
    </div>
  );
};

export default ControlledInput;
