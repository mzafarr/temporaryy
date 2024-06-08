"use client";
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { FaSchool, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaGraduationCap, FaBook } from "react-icons/fa";
import Link from 'next/link';
import InputField from "@/app/components/InputField";

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
    // const [date, setDate] = React.useState<Date | undefined>(new Date())

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

    return (
        <div className="bg-white/80 rounded-md shadow xl:max-w-[1000px] mt-12 mx-auto py-10 px-4 lg:px-12">
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='font-bold text-lg md:text-2xl'>Education</h1>
                    <p className='text-lg md:text-xl'>Start with your most recent education and work backwards, including the degree/certification, institution's name and location, and year of completion.</p>
                </div>
                <div className="border border-slate-300 rounded-lg p-5 my-8">
                    <form className='flex flex-col lg:flex-row gap-x-3 justify-evenly pt-12'>
                        {/* Left side Input */}
                        <div className="lg:border-r lg:pr-6 border-slate-300">
                            <InputField
                                title="School Name"
                                type="text"
                                value={formData.schoolName}
                                setValue={(value) => setFormData({ ...formData, schoolName: value })}
                                placeholder="School Name"
                                FieldIcon={FaSchool}
                            />
                            <InputField
                                title="Location"
                                type="text"
                                value={formData.location}
                                setValue={(value) => setFormData({ ...formData, location: value })}
                                placeholder="Location"
                                FieldIcon={FaMapMarkerAlt}
                            />
                            <div className='flex gap-x-3 my-3'>
                                <input
                                    type='checkbox'
                                    onChange={handleChange}
                                    name="showCountry"
                                />
                                <p>Show Country</p>
                            </div>
                            {showCountry && (
                                <InputField
                                    title="Country"
                                    type="text"
                                    value={formData.country}
                                    setValue={(value) => setFormData({ ...formData, country: value })}
                                    placeholder="Country"
                                    FieldIcon={FaGlobe}
                                />
                            )}
                            <InputField
                                title="Month"
                                type="month"
                                value={formData.month}
                                setValue={(value) => setFormData({ ...formData, month: value })}
                                placeholder="Month"
                                FieldIcon={FaCalendarAlt}
                            />
                            <InputField
                                title="Year"
                                type="year"
                                value={formData.year}
                                setValue={(value) => setFormData({ ...formData, year: value })}
                                placeholder="Year"
                                FieldIcon={FaCalendarAlt}
                            />
                        </div>
                        {/* Right side div */}
                        <div>
                            <InputField
                                title="Degree"
                                type="text"
                                value={formData.degree}
                                setValue={(value) => setFormData({ ...formData, degree: value })}
                                placeholder="Degree"
                                FieldIcon={FaGraduationCap}
                            />
                            <InputField
                                title="Field of Study"
                                type="text"
                                value={formData.fieldOfStudy}
                                setValue={(value) => setFormData({ ...formData, fieldOfStudy: value })}
                                placeholder="Field of Study"
                                FieldIcon={FaBook}
                            />
                        </div>
                    </form>
                </div>

                <div className='flex flex-col gap-y-5 md:flex-row justify-between mt-6 md:mt-28'>
                    <Button className='font-bold text-black border px-4 py-3 w-full md:w-fit rounded-full text-xl flex flex-row justify-center items-center gap-x-2'>
                        <IoIosArrowBack size={25} />Back
                    </Button>
                    <Link href="/work-experience">
                        <Button className='font-bold white bg-black w-full hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row justify-center items-center gap-x-2'>
                            Work Experience <MdNavigateNext size={25} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
