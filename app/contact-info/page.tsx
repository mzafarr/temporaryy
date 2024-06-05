"use client";
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';

function Page() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);

    const handleNextClick = () => {
        const payload = { name, email, phone, city, country };
        console.log("Form Data:", payload);
    };

    return (
        // Parent div
        <div className='bg-white rounded shadow w-[100%] lg:w-[900px] xl:w-[1150px] 2xl:[1300px] mt-12 mx-auto py-10 px-4 lg:px-12'>
            <h1 className='text-2xl lg:text-4xl my-1 font-bold'>How can employers get in touch with you?</h1>
            <p className='text-lg md:text-2xl'>For your resume header, include (at minimum) your name and email so employers can contact you.</p>

            {/* This div is for Card */}
            <div className='bg-gray-200 my-10 p-5'>
                <p className='text-lg'>* indicates a required field</p>

                <div>
                    <form className='flex flex-col md:flex-row gap-x-3 justify-between'>
                        {/* Left side Input */}
                        <div className='lg:border-r pr-3 border-black'>
                            {/* For Name */}
                            <div className='flex justify-end'>
                                {name && <FaCheckCircle size={15} className='text-green-600 relative top-16 mr-4' />}
                            </div>
                            <Input
                                type='text'
                                placeholder='Full Name'
                                className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[350px] xl:w-[500px]"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {/* For Email */}
                            <div className='flex justify-end'>
                                {isValidEmail(email) && <FaCheckCircle size={15} className='text-green-600 relative top-16 mr-4' />}
                            </div>
                            <Input
                                type='email'
                                placeholder='Email *'
                                className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[350px] xl:w-[500px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* For Phone Number */}
                            <div className='flex justify-end'>
                                {isValidPhone(phone) && <FaCheckCircle size={15} className='text-green-600 relative top-16 mr-4' />}
                            </div>
                            <Input
                                type='text'
                                placeholder='Phone Number'
                                className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[350px] xl:w-[500px]"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Right side div */}
                        <div>
                            {/* For City */}
                            <div className='flex justify-end'>
                                {city && <FaCheckCircle size={15} className='text-green-600 relative top-16 mr-4' />}
                            </div>
                            <Input
                                type='text'
                                placeholder='City'
                                className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[350px] xl:w-[500px]"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {/* For Country */}
                            <div className='flex justify-end'>
                                {country && <FaCheckCircle size={15} className='text-green-600 relative top-16 mr-4' />}
                            </div>
                            <Input
                                type='text'
                                placeholder='Country'
                                className="rounded-sm text-lg h-16 my-5 w-full md:w-[300px] lg:w-[350px] xl:w-[500px]"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* This div is for previous and next button */}
            <div className='flex flex-row justify-between'>
                <Button className='font-bold text-black text-xl flex flex-row items-center gap-x-2'>
                    <IoIosArrowBack size={25} />Back
                </Button>
                <Link href="/summary">
                    <Button
                        className='font-bold white bg-black hover:bg-gray-600 rounded-full px-3 md:px-5 py-3 text-white text-xl flex flex-row items-center gap-x-2'
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
