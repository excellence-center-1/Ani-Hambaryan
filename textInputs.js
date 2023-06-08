import React from 'react';

export default function TextInput({ placeholder, value, onChange, id }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
}
