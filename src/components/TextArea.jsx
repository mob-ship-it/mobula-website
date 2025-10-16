import React from "react";

export const TextArea = ({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder = "",
  required = false,
  rows = 6,
  className = "",
  ...props 
}) => {
  return (
    <div className="flex flex-col items-start gap-5 relative w-full">
      {label && (
        <label className="relative h-[26.92px] mt-[-1.00px] [font-family:'Be_Vietnam',Helvetica] font-normal text-[#13243c] text-2xl tracking-[0] leading-[29.3px]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative w-full">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`
            flex items-start gap-2.5 pl-[30px] pr-2.5 pt-[30px] pb-2.5 
            relative w-full bg-white rounded-[20px] border border-solid 
            ${error ? 'border-red-500' : 'border-[#13243cb5]'}
            focus:outline-none focus:ring-2 focus:ring-[#211ee1] focus:border-[#211ee1]
            [font-family:'Be_Vietnam',Helvetica] font-normal text-xl text-[#13243c]
            placeholder:text-[#13243cb5] transition-all duration-200 resize-none
            ${className}
          `.trim()}
          {...props}
        />
        
        {error && (
          <div className="absolute -bottom-6 left-0 text-red-500 text-sm [font-family:'Be_Vietnam',Helvetica]">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
