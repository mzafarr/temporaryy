"use client"
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { FiPlusCircle } from "react-icons/fi";
import Link from 'next/link';

function Page() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
  });

  const jobData = [
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

  const handleJobClick = (jobTitle) => {
    setSelectedJobs(prevSelectedJobs =>
      prevSelectedJobs.includes(jobTitle)
        ? prevSelectedJobs.filter(job => job !== jobTitle)
        : [...prevSelectedJobs, jobTitle]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setFormData({ jobTitle: selectedJobs[index] });
  };

  const handleSaveClick = () => {
    if (isEditing) {
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
    setFormData({ jobTitle: '' });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({ jobTitle: '' });
  };

  return (
    <div className="bg-white/80 rounded-md shadow xl:max-w-[1000px] mt-12 mx-auto py-10 px-4 lg:px-12">
      <div className='flex flex-col justify-between'>
        <div className='my-4 flex flex-col gap-y-2'>
          <h1 className='font-bold text-lg md:text-2xl'>Summary</h1>
          <p className='text-lg md:text-xl'>Briefly describe the value that you bring through</p>
          <p className='text-lg md:text-xl'>your skills, background and experience.</p>
        </div>

        <div className='flex flex-col lg:flex-row justify-between gap-x-5'>
          {/* Left div */}
          <div className='w-full lg:w-[550px] h-[600px] border'>
            {/* Header of the div */}
            <div className='w-full h-[100px] bg-black rounded'>
              <p className='text-white font-bold text-xl text-center pt-8 '>Selected Jobs</p>
            </div>
            <div className=' p-2 h-[380px] overflow-y-scroll'>
              {selectedJobs.length > 0 ? (
                selectedJobs.map((jobTitle, index) => (
                  <div key={index} className='flex justify-between gap-x-3 items-center my-2'>
                    <div className='bg-zinc-100 rounded-xl  w-full'>
                    <p className='bg-zinc-100 rounded-full p-2 text-justify'>{jobTitle}</p>

                    </div>
                    <button onClick={() => handleEditClick(index)} className='bg-blue-500 text-white border rounded-full px-4 py-2'>Edit</button>
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

          {/* Right div */}
          <div className='w-full lg:w-[550px] h-[600px] border'>
            {/* the header */}
            <div className='h-[120px] md:h-[100px] w-full rounded bg-black'>
              <p className='text-white font-bold text-xl text-center py-2'>Search by job title and keyword</p>
              <div className="w-[90%] rounded bg-white px-3 py-1 flex gap-x-4 items-center mx-5">
                <SlMagnifier size={25} />
                <input type="search" className='focus:outline-none py-1 w-full' />
              </div>
            </div>
            {/* The main content of the right div */}
            <div className='h-[440px] overflow-y-scroll'>
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
                  <p className='font-normal '>{data.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons start from here */}
        <div className='flex flex-row justify-between items-center my-5'>
          <Link href="/contact-info">
            <Button className='font-bold text-black text-xl flex flex-row items-center gap-x-2'>
              <IoIosArrowBack size={25} />Back
            </Button>
          </Link>
          <Link href="/education">
            <Button
              className='font-bold white bg-black hover:bg-gray-600 rounded-full px-3 md:px-5 py-3 text-white text-xl flex flex-row items-center gap-x-2'
            >
              Education <MdNavigateNext size={25} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
