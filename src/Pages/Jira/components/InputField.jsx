import React from 'react';
import "./InputField.css"

export const InputField = ({ value, name, placeholder, type, onChange }) => (
    <div>
      <input className='inputField'
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
