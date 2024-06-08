"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import InputField from "@/app/components/InputField";

function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const handleNextClick = () => {
    const payload = { name, email, phone };
    console.log("Form Data:", payload);
  };

  return (
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

      <div className="border border-slate-300 rounded-lg p-5 my-8">
        <div>
          <form className="flex flex-col max-w-auto lg:flex-row gap-x-3">
            <div className="lg:border-r lg:pr-6 border-slate-300">
              <InputField
                title="Name"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Muhammad Zafar"
                FieldIcon={FaUser}
              />
              <InputField
                title="Email"
                type="email"
                value={email}
                setValue={setEmail}
                placeholder="example@gmail.com"
                FieldIcon={FaEnvelope}
              />
              <InputField
                title="Phone Number"
                type="text"
                value={phone}
                setValue={setPhone}
                placeholder="+123456789"
                FieldIcon={FaPhone}
              />
            </div>
            <div className="lg:pl-3">
              <InputField
                title="Location"
                type="text"
                value={location}
                setValue={setLocation}
                placeholder="London, UK"
                FieldIcon={FaMapMarkerAlt}
              />
              <InputField
                title="Website"
                type="text"
                value={website}
                setValue={setWebsite}
                placeholder="https://example.com"
                FieldIcon={FaGlobe}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <Button className="font-bold text-black text-xl flex flex-row items-center gap-x-2">
          <IoIosArrowBack size={25} />
          Back
        </Button>
        <Link href="/summary">
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
