import React from 'react';

const FormInput = ({ 
  label, 
  labelClass,
  value, 
  placeholder, 
  type,
  name,
  classList,
  onChange,
  onBlur,
  error
} = { 
  type: 'text',
  onBlur: () => {} 
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input 
        type={type} 
        name={name} 
        //value={value || ''} 
        onChange={onChange} 
        //onBlur={onBlur}
        placeholder={placeholder}
        className={classList} 
        />
      {/* {error && <span className="form-error">{error}</span>} */}
      {/* <p className="text-red-dark text-xs italic">{error}</p> */}
    </div>
  );
};

export default FormInput;