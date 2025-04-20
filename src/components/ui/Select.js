import React from "react";
export default function Select({ label, name, options, value, onChange, required=false, error }) {
    return (
        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"}
        >
             <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
