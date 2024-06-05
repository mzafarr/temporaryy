"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import InputField from "@/app/components/InputField";

function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleNextClick = () => {
    const payload = { name, email, phone };
    console.log("Form Data:", payload);
  };

  return (
    // Parent div
    <div className="bg-white/80 rounded-md shadow xl:max-w-[1000px] mt-12 mx-auto py-10 px-4 lg:px-12">
      <div className="mb-5">
        <h1 className="text-2xl lg:text-4xl mb-2 font-bold">
          How can employers get in touch with you?
        </h1>
        <p className="text-sm sm:text-md lg:text-[16px]">
          For your resume header, include (at minimum) your name and email so
          employers can contact you.
        </p>
      </div>

      {/* This div is for Card */}
      <div className="border border-slate-300 rounded-lg p-5 my-8">
        <div>
          <form className="flex flex-col max-w-auto lg:flex-row gap-x-3">
            {/* Left side Input */}
            <div className="border-r pr-6 border-slate-300">
              {/* For Name */}
              <InputField
                className="bg-slate-300/60"
                title="Name"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Muhammad Zafar"
                iconName="profile"
              />
              {/* For Email */}
              <InputField
                className="bg-slate-300/60"
                title="Email"
                type="email"
                value={email}
                setValue={setEmail}
                placeholder="example@gmail.com"
                iconName="email"
              />
              {/* For Phone Number */}
              <InputField
                className="bg-slate-300/60"
                title="Phone Number"
                type="text"
                value={phone}
                setValue={setPhone}
                placeholder="+123456789"
                iconName="phone"
              />
            </div>
            {/* Right side div */}
            <div className="lg:pl-3">
              <InputField
                className="bg-slate-300/60"
                title="Location"
                type="text"
                value={location}
                setValue={setLocation}
                placeholder="London, UK"
                iconName="location"
              />
              <InputField
                className="bg-slate-300/60"
                title="Website"
                type="text"
                value={website}
                setValue={setWebsite}
                placeholder="London, UK"
                iconName="website"
              />
            </div>
          </form>
        </div>
      </div>

      {/* This div is for previous and next button */}
      <div className="flex flex-row justify-between">
        <Button className="font-bold text-black text-xl flex flex-row items-center gap-x-2">
          <IoIosArrowBack size={25} />
          Back
        </Button>
        <Link href="/new-resume/summary">
          <Button
            className="font-bold white bg-[#131313] hover:bg-[#131313]/90 rounded-full px-3 md:px-5 py-3 text-white text-xl flex flex-row items-center gap-x-2"
            onClick={handleNextClick}
          >
            Next: Summary <MdNavigateNext size={25} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
