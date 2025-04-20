import React from "react";
 function Input({ lable,name,type='type', placeholder, value, onChange ,required,error}) {
return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" >
            {lable} {required }
              websiteName <span className="text-red-500">*</span>
            </label>
      <input
        className={"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"}
        id={name}
        type={type}
        name={ name }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
export default Input;