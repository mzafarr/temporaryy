"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/Button";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

function Page() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
  });

  const handleNextClick = () => {
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFieldFilled = (field: string) => field.trim() !== "";

  return (
    <div className="bg-white rounded flex flex-col h-screen shadow w-[100%] lg:w-[900px] xl:w-[1150px] 2xl:w-[1300px] mt-12 mx-auto py-10 px-4 lg:px-12">
      <div className="flex flex-col justify-between">
        <div className="my-4 flex flex-col gap-y-2">
          <h1 className="font-bold text-lg md:text-2xl">Work Experience</h1>
          <p className="text-lg md:text-xl">
            Let’s start with your most recent job.
          </p>
        </div>
        <div className="bg-gray-200 my-10 p-5">
          <form className="flex flex-col md:flex-row gap-x-3 justify-evenly">
            {/* Left side Input */}
            <div className="lg:border-r pr-3 border-black">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Job Title"
                  className={`rounded-sm text-lg h-16 my-5  w-full md:w-[300px] lg:w-[480px] xl:w-[500px]`}
                  onChange={handleChange}
                  name="jobTitle"
                />
                {isFieldFilled(formData.jobTitle) && (
                  <FaCheckCircle
                    size={15}
                    className="text-green-600 absolute right-4 top-6"
                  />
                )}
              </div>

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Employer"
                  className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[480px] xl:w-[500px]"
                  onChange={handleChange}
                  name="employer"
                />
                {isFieldFilled(formData.employer) && (
                  <FaCheckCircle
                    size={15}
                    className="text-green-600 absolute right-4 top-6"
                  />
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-x-5">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="City/Town"
                    className="rounded-sm text-lg h-16 my-5 w-full xl:w-[250px]"
                    onChange={handleChange}
                    name="city"
                  />
                  {isFieldFilled(formData.city) && (
                    <FaCheckCircle
                      size={15}
                      className="text-green-600 absolute right-4 top-11"
                    />
                  )}
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Country"
                    className="rounded-sm text-lg h-16 my-5 w-full xl:w-[235px]"
                    onChange={handleChange}
                    name="country"
                  />
                  {isFieldFilled(formData.country) && (
                    <FaCheckCircle
                      size={15}
                      className="text-green-600 absolute right-4 top-11"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right side div */}
            <div>
              <div className="flex flex-col xl:flex-row gap-x-5">
                <div className="relative">
                  <p className="font-semibold text-lg">Start Date</p>
                  <Input
                    type="date"
                    placeholder="Start Date"
                    className="rounded-sm text-lg h-16 my-5 w-full md:w-[200px]"
                    onChange={handleChange}
                    name="startDate"
                  />
                  {isFieldFilled(formData.startDate) && (
                    <FaCheckCircle
                      size={15}
                      className="text-green-600 absolute right-4 top-[70px]
                                            "
                    />
                  )}
                </div>
                <div className="relative">
                  <p className="font-semibold text-lg">End Date</p>
                  <Input
                    type="date"
                    placeholder="End Date"
                    className="rounded-sm text-lg h-16 my-5 w-full md:w-[200px]"
                    onChange={handleChange}
                    name="endDate"
                  />
                  {isFieldFilled(formData.endDate) && (
                    <FaCheckCircle
                      size={15}
                      className="text-green-600 absolute right-4 top-[70px]"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-x-3">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="currentlyWorking"
                />
                <p>Currently Work here</p>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-y-5 md:flex-row justify-between mt-6 mb-4 md:mt-28">
          <Button className="font-bold text-black border px-4 py-3 w-full md:w-fit rounded-full text-xl flex flex-row justify-center items-center gap-x-2">
            <IoIosArrowBack size={25} />
            Back
          </Button>
          <Link href="/skills">
            <Button
              className="font-bold white bg-black w-full hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row justify-center items-center gap-x-2"
              onClick={handleNextClick}
            >
              Next: Skills <MdNavigateNext size={25} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
