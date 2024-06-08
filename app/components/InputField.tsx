"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconType } from "react-icons";

// type Props = {
//   title: string;
//   iconName?: string;
//   placeholder: string;
//   value: string;
//   type?: string;
//   maxLength?: number;
//   size?: "sm" | "md" | "lg";
//   setValue: React.Dispatch<React.SetStateAction<string>>;
//   FieldIcon?: IconType;
// };
type Props = {
  title: string;
  iconName?: string;
  placeholder: string;
  value: string;
  type?: string;
  maxLength?: number;
  size?: "sm" | "md" | "lg";
  setValue: React.Dispatch<React.SetStateAction<string>>;
  FieldIcon?: IconType;
};


function InputField({
  title,
  placeholder,
  value,
  type,
  setValue,
  maxLength,
  size,
  FieldIcon, // Added this line
}: Props) {
  const handleClear = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter("");
  };

  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div
      className={`${inputFocused ? "border border-[#aaafb3]" : ""
        }  bg-slate-100 rounded-full w-full py-1 px-3 mb-5`}
    >
      <div className={`relative flex items-center gap-2 `}>
        {FieldIcon && <FieldIcon className="w-8 text-blue-400" />} {/* Conditionally render the icon */}
        <div className="flex flex-col px-1">
          <label className="text-[#6c7880] text-[11px]">{title}</label>
          <input
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            type={type ? type : "text"}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className={`bg-transparent border-none outline-none flex placeholder-slate-800 placeholder-opacity-50 font-medium md:w-[95vw] max-w-[320px]`}
          />
        </div>
        {value && (
          <div
            className="z-1 absolute top-2 right-2  text-black cursor-pointer"
            onClick={() => handleClear(setValue)}
          >
            <XMarkIcon className="w-5 text-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
