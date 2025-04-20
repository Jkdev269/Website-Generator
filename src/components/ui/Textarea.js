import React from "react";
export default function Select({ label, name, options,placeholder, value, onChange, required=false,rows=4, error }) {
    return (
        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className={"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}