"use client"
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';


function Page() {
    const [formData, setFormData] = useState({
        schoolName: '',
        location: '',
        month: '',
        year: '',
        country: '',
        degree: '',
        fieldOfStudy: '',
    });
    const [showCountry, setShowCountry] = useState(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === 'showCountry') {
            setShowCountry(checked);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const isFieldFilled = (field: string) => field.trim() !== '';

    return (
        <div className='bg-white rounded flex flex-col h-screen shadow w-[100%] lg:w-[900px] xl:w-[1150px] 2xl:w-[1300px] mt-12 mx-auto py-10 px-4 lg:px-12'>

            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='font-bold text-lg md:text-2xl'>Education</h1>
                    <p className='text-lg md:text-xl'>Start with your most recent education and work backwards, including the degree/certification, institution's name and location, and year of completion.</p>
                </div>
                <div className='bg-gray-200 my-10 p-5'>
                    <form className='flex flex-col md:flex-row gap-x-3 justify-evenly'>
                        {/* Left side Input */}
                        <div className='border-r pr-3 md:border-black'>
                            <div className='relative'>
                                <Input
                                    type='text'
                                    placeholder='School Name'
                                    className="rounded-sm text-lg h-16 my-5 w-full xl:w-[500px]"
                                    onChange={handleChange}
                                    name="schoolName"
                                />
                                {isFieldFilled(formData.schoolName) && (
                                    <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-6' />
                                )}
                            </div>

                            <div className='relative'>
                                <Input
                                    type='text'
                                    placeholder='Location'
                                    className="rounded-sm text-lg h-16 my-5 w-full xl:w-[500px]"
                                    onChange={handleChange}
                                    name="location"
                                />
                                {isFieldFilled(formData.location) && (
                                    <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-6' />
                                )}
                            </div>

                            <div className='flex gap-x-3'>
                                <input
                                    type='checkbox'
                                    onChange={handleChange}
                                    name="showCountry"
                                />
                                <p>Show Country</p>
                            </div>

                            {showCountry && (
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        placeholder='Country'
                                        className="rounded-sm text-lg h-16 my-5 w-full xl:w-[500px]"
                                        onChange={handleChange}
                                        name="country"
                                    />
                                    {isFieldFilled(formData.country) && (
                                        <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-6' />
                                    )}
                                </div>
                            )}

                            <div className='flex flex-col md:flex-row gap-x-5'>
                                <div className='relative'>
                                    <Input
                                        type='month'
                                        placeholder='Month'
                                        className="rounded-sm text-lg h-16 my-5 w-full md:w-[250px]"
                                        onChange={handleChange}
                                        name="month"
                                    />
                                    {isFieldFilled(formData.month) && (
                                        <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-11' />
                                    )}
                                </div>

                                <div className='relative'>
                                    <Input
                                            type='year'
                                            placeholder='Year'
                                            className="rounded-sm text-lg h-16 my-5 w-full md:w-[235px]"
                                            onChange={handleChange}
                                            name="year"
                                        />
                                    {isFieldFilled(formData.year) && (
                                        <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-11' />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right side div */}
                        <div>
                            <div className='flex flex-col  gap-x-5'>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        placeholder='Degree'
                                        className="rounded-sm text-lg h-16 my-5 w-full xl:w-[500px]"
                                        onChange={handleChange}
                                        name="degree"
                                    />
                                    {isFieldFilled(formData.degree) && (
                                        <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-10' />
                                    )}
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        placeholder='Field of Study'
                                        className="rounded-sm text-lg h-16 my-5 w-full xl:w-[500px]"
                                        onChange={handleChange}
                                        name="fieldOfStudy"
                                    />
                                    {isFieldFilled(formData.fieldOfStudy) && (
                                        <FaCheckCircle size={15} className='text-green-600 absolute right-4 top-10' />
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='flex flex-col gap-y-5 md:flex-row justify-between mt-6 md:mt-28'>
                    <Button className='font-bold text-black text-xl flex flex-row items-center gap-x-2'>
                        <IoIosArrowBack size={25} />Back
                    </Button>
                    <Link href="/work-experience">
                        <Button
                            className='font-bold white bg-black hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row items-center gap-x-2'
                        >
                            Work Experience <MdNavigateNext size={25} />
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Page;
