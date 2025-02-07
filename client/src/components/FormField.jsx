import React from 'react'
import './FormField.css';
const FormField = ( {LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div >
      <div className='flex items-center gap-5 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-grey-900'
         >
          {LabelName} 
        </label>
        
        {isSurpriseMe && (
          
          <button 
          type='button'
          onClick={handleSurpriseMe}
          className="button">
          Surprise Me
        </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-[#ffffffec] text-gray-900 text-sm rounded-lg focus:ring-[#4daffa] focus:bg-[#ffffffc8] focus:border-[#4daffa] outline-none block w-full p-3"
      />

    </div>
  )
}

export default FormField
