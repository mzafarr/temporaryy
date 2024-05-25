"use client";
import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

type Props = {
  password: string;
  handlePasswordChange: (pe: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordInput({
  password,
  handlePasswordChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className={`w-full mb-4`}>
      <div
        className={`${
          passwordFocused && "border border-slate-50"
        } text-slate-700 bg-slate-100 rounded-full w-full py-1 px-3 mb-4`}
      >
        <div className="relative flex items-center gap-2">
          <KeyIcon className="w-8 text-blue-400" />
          <div className="flex flex-col">
            <label className="text-[#6c7880] text-[11px]">Password</label>
            <input
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder={"************"}
              onChange={handlePasswordChange}
              className={`bg-transparent border-none outline-none flex placeholder-slate-800 placeholder-opacity-50 font-medium w-[95vw] max-w-[320px]`}
              //   className="bg-transparent border-none outline-none w-[250px] placeholder-[#C59A78] placeholder-opacity-50 bg-[#F0F0F0] font-medium"
            />
          </div>
          {password && (
            <div
              className="z-1 absolute top-2 right-2 text-black cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 text-slate-600" />
              ) : (
                <EyeIcon className="w-5 text-slate-600" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;
