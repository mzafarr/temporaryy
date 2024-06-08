"use client";
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { IoIosArrowBack, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';
import { SlMagnifier } from 'react-icons/sl';
import InputField from "@/app/components/InputField";

type JobData = {
    icon: JSX.Element;
    jobTitle: string;

};
type formData = {
    jobTitle:string;
    employer:string;
    location:string;
    country:string;
    startDate:string;
    endDate:string;
    currentlyWorking: boolean;


}

const Page: React.FC = () => {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState <formData>({
        jobTitle: '',
        employer: '',
        location: '',
        country: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
    });

    const jobData: JobData[] = [
        {
            icon: <FiPlusCircle size={25} />,
            jobTitle: "Dedicated professional with demonstrated strengths in customer service, time management and trend tracking. Good at troubleshooting problems and building successful solutions. Excellent verbal and written communicator with strong background cultivating positive relationships and exceeding goals.",
        },
        {
            icon: <FiPlusCircle size={25} />,
            jobTitle: "Talented [Job Title] skilled at completing daily assignments and contributing to team success. Always willing to take on any task. Adapts quickly to new needs and policies.",
        },
        {
            icon: <FiPlusCircle size={25} />,
            jobTitle: "Willing to take on any task to support team and help business succeed. Offers strong [Skill] and [Skill] abilities.",
        },
        {
            icon: <FiPlusCircle size={25} />,
            jobTitle: "Dependable employee seeking opportunity to expand skills and contribute to company success. Considered hardworking, ethical and detail-oriented.",
        },
    ];

    const handleNextClick = () => {
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleJobClick = (jobTitle: string) => {
        setSelectedJobs(prevSelectedJobs =>
            prevSelectedJobs.includes(jobTitle)
                ? prevSelectedJobs.filter(job => job !== jobTitle)
                : [...prevSelectedJobs, jobTitle]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditClick = (index: number) => {
        setIsEditing(true);
        setEditingIndex(index);
        const selectedJob = selectedJobs[index];
        setFormData({ ...formData, jobTitle: selectedJob });
    };

    const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isEditing && editingIndex !== null) {
            setSelectedJobs(prevSelectedJobs =>
                prevSelectedJobs.map((job, index) =>
                    index === editingIndex ? formData.jobTitle : job
                )
            );
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            setSelectedJobs(prevSelectedJobs => [...prevSelectedJobs, formData.jobTitle]);
        }
        setFormData({ ...formData, jobTitle: '' });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditingIndex(null);
        setFormData({ ...formData, jobTitle: '' });
    };

    return (
        <div className="bg-white/80 rounded-md shadow xl:max-w-[1000px] mt-12 mx-auto py-10 px-4 lg:px-12">
            <div className='flex flex-col justify-between'>
                <div className='my-4 flex flex-col gap-y-2'>
                    <h1 className='font-bold text-lg md:text-2xl'>Work Experience</h1>
                    <p className='text-lg md:text-xl'>Let’s start with your most recent job.</p>
                </div>
                <div className="border border-slate-300 rounded-lg p-5 my-8">
                    <form className='flex flex-col md:flex-row gap-x-3 justify-evenly pt-12'>
                        {/* Left side Input */}
                        <div className="lg:border-r lg:pr-6 border-slate-300">
                            <InputField
                                title="Job Title"
                                type="text"
                                value={formData.jobTitle}
                                setValue={(value) => setFormData({ ...formData, jobTitle: value })}
                                placeholder="Job Title"
                                FieldIcon={FaBriefcase}
                            />
                            <InputField
                                title="Employer"
                                type="text"
                                value={formData.employer}
                                setValue={(value) => setFormData({ ...formData, employer: value })}
                                placeholder="Employer"
                                FieldIcon={FaBuilding}
                            />
                            <InputField
                                title="Location"
                                type="text"
                                value={formData.location}
                                setValue={(value) => setFormData({ ...formData, location: value })}
                                placeholder="Location"
                                FieldIcon={FaMapMarkerAlt}
                            />
                            <div className='flex flex-col xl:flex-row xl:w-[175px] gap-x-9'>
                                <InputField
                                    title="Start Date"
                                    type="date"
                                    value={formData.startDate}
                                    setValue={(value) => setFormData({ ...formData, startDate: value })}
                                    placeholder="Start Date"
                                    FieldIcon={FaCalendarAlt}
                                />
                                <InputField
                                    title="End Date"
                                    type="date"
                                    value={formData.endDate}
                                    setValue={(value) => setFormData({ ...formData, endDate: value })}
                                    placeholder="End Date"
                                    FieldIcon={FaCalendarAlt}
                                />
                            </div>

                            {/* This div is for selected job from right div */}
                            <div className='w-full lg:w-[410px] border'>
                                {/* Header of the div */}
                                <div className='w-full h-[70px] bg-black rounded'>
                                    <p className='text-white font-bold text-xl text-center pt-8 '>Selected Jobs</p>
                                </div>
                                <div className='p-4 h-[400px] overflow-y-scroll'>
                                    {selectedJobs.length > 0 ? (
                                        selectedJobs.map((jobTitle, index) => (
                                            <div key={index} className='flex justify-between gap-x-3 items-center my-2'>
                                                <div className='bg-zinc-100 rounded-xl w-full'>
                                                    <p className='bg-zinc-100 rounded-full p-2 text-justify'>{jobTitle}</p>
                                                </div>
                                                <button onClick={(e) => { e.preventDefault(); handleEditClick(index); }} className='bg-blue-500 text-white border rounded-full px-4 py-2'>Edit</button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-xl flex justify-around items-center'>No jobs selected</p>
                                    )}
                                </div>


                                <div className='p-4'>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        placeholder="Enter job title"
                                        value={formData.jobTitle}
                                        onChange={handleInputChange}
                                        className='border p-2 w-full mb-2'
                                    />
                                    <div className='flex justify-between'>
                                        <button onClick={handleSaveClick} className='bg-green-500 text-white px-4 py-2 rounded-full'>Save</button>
                                        {isEditing && <button onClick={handleCancelClick} className='bg-red-500 text-white px-4 py-2 rounded-full'>Cancel</button>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side div */}
                        <div className='w-full  border'>
                            {/* the header */}
                            <div className='h-[130px] md:h-[100px] w-full rounded bg-black'>
                                <p className='text-white font-bold text-xl text-center py-2'>Search by Work Experience and keyword</p>
                                <div className="w-[90%] rounded bg-white px-3 py-1 flex gap-x-4 items-center mx-5">
                                    <SlMagnifier size={25} />
                                    <input type="search" className='focus:outline-none py-2 w-full' />
                                </div>
                            </div>
                            {/* The main content of the right div */}
                            <div className='h-[760px] overflow-y-scroll'>
                                {jobData.map((data) => (
                                    <div
                                        className='flex flex-row items-center border p-5 my-3 mx-2 rounded gap-x-5 cursor-pointer'
                                        key={data.jobTitle}
                                        onClick={() => handleJobClick(data.jobTitle)}
                                        style={{ color: selectedJobs.includes(data.jobTitle) ? 'gray' : 'black' }}
                                    >
                                        <p>
                                            {selectedJobs.includes(data.jobTitle) ? (
                                                <IoIosCheckmarkCircleOutline size={25} />
                                            ) : (
                                                <FiPlusCircle size={25} />
                                            )}
                                        </p>
                                        <p className='font-normal'>{data.jobTitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                    {/* <div className='flex flex-col justify-between gap-x-3 md:flex-row'>
                        <Link href="/summary">
                            <Button icon={<IoIosArrowBack size={20} />} />
                        </Link>
                        <Button  icon={<MdNavigateNext size={20} onClick={handleNextClick} />} />
                    </div> */}
                       <div className='flex flex-col gap-y-5 md:flex-row justify-between mt-6 md:mt-28'>
                    <Button className='font-bold text-black border px-4 py-3 w-full md:w-fit rounded-full text-xl flex flex-row justify-center items-center gap-x-2'>
                        <IoIosArrowBack size={25} />Back
                    </Button>
                    <Link href="/work-experience">
                        <Button className='font-bold white bg-black w-full hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row justify-center items-center gap-x-2'>
                            Save <MdNavigateNext size={25} />
                        </Button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Page;