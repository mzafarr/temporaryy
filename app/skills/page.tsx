// "use client"
// import React, { useState } from 'react';
// import { Button } from '../components/Button';
// import { IoIosArrowBack } from 'react-icons/io';
// import { MdNavigateNext } from 'react-icons/md';
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { SlMagnifier } from "react-icons/sl";
// import { FiPlusCircle } from "react-icons/fi";
// import Link from 'next/link';

// function Page() {
//   const [selectedJobs, setSelectedJobs] = useState([]);

//   const jobData = [
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Leadership",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Data Entry",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Public Speaking",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Critical Thinking",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Customer Services",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Data Management",
//     },
//     {
//       icon: <FiPlusCircle size={25} />,
//       jobTitle: "Organization and time management",
//     },
//   ];

//   const handleNextClick = () => {
//   };

//   const handleJobClick = (jobTitle) => {
//     setSelectedJobs(prevSelectedJobs =>
//       prevSelectedJobs.includes(jobTitle)
//         ? prevSelectedJobs.filter(job => job !== jobTitle)
//         : [...prevSelectedJobs, jobTitle]
//     );
//   };

//   return (
//     <div className='bg-white rounded flex flex-col h-full shadow w-[100%] lg:w-[900px] xl:w-[1150px] 2xl:w-[1300px] mt-12 mx-auto py-10 px-4 lg:px-12'>

//         {/* // Parent div */}
//         <div className='flex flex-col justify-between'>
//           <div className='my-4 flex flex-col gap-y-3'>
//             <h1 className='font-bold text-lg md:text-2xl'>Skills</h1>
//             <p className='text-lg md:text-xl'>Bullet points should separate skills. Add a few skills to show employers you’re good in your field.</p>
//           </div>

//           <div className='flex flex-col lg:flex-row justify-between'>
//             {/* left div */}
//             <div className='w-full lg:w-[550px] h-[600px] border'>
//               {/* Header of the div */}
//               <div className='w-full h-[100px] bg-black rounded'>
//                 <p className='text-white font-bold text-xl text-center pt-8 '></p>
//               </div>
//               <div className='p-4'>
//                 {selectedJobs.length > 0 ? (
//                   selectedJobs.map((jobTitle, index) => (
//                     <li key={index} className='text-xl my-2'>{jobTitle}</li>
//                   ))
//                 ) : (
//                   <p className='text-xl'>No skills selected</p>
//                 )}
//               </div>
//             </div>

//             {/* Right div */}
//             <div className='w-full lg:w-[550px] h-[600px] border'>
//               {/* the header */}
//               <div className='h-[160px] w-full rounded bg-black'>
//                 <p className='text-white font-bold text-xl lg:text-2xl text-center py-4'>Search by job title and keyword</p>
//                 <div className="w-[90%] rounded bg-white p-3 flex gap-x-4 items-center mx-5">
//                   <SlMagnifier size={25} />
//                   <input type="search" className='focus:outline-none py-2 w-full' />
//                 </div>
//               </div>
//               {/* The main content of the right div */}
//               <div className='h-[440px] overflow-y-scroll'>
//               {jobData.map((data) => (
//                 <div
//                   className='flex flex-row items-center border p-5 my-3 mx-2 rounded gap-x-5 cursor-pointer'
//                   key={data.jobTitle}
//                   onClick={() => handleJobClick(data.jobTitle)}
//                   style={{ color: selectedJobs.includes(data.jobTitle) ? 'gray' : 'black' }}
//                 >
//                   <p>
//                     {selectedJobs.includes(data.jobTitle) ? (
//                       <IoIosCheckmarkCircleOutline size={25} />
//                     ) : (
//                       <FiPlusCircle size={25} />
//                     )}
//                   </p>
//                   <p className='font-normal text-lg md:text-xl'>{data.jobTitle}</p>
//                 </div>
//               ))}
//               </div>
           
//             </div>
//           </div>

//           {/* Buttons start from here */}
//           <div className='flex flex-col gap-y-5 md:flex-row justify-between mt-6 md:mt-28'>
//             <Link href="/work-experience">
      
//             <Button className='font-bold text-black border rounded-full px-5 py-3 w-full text-xl flex flex-row justify-center items-center gap-x-2'>
//               <IoIosArrowBack size={25} />Back
//             </Button>
//             </Link>

//             <Button
//               className='font-bold white bg-black hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row justify-center items-center gap-x-2'
//               onClick={handleNextClick}
//             >
//               Save <MdNavigateNext size={25} />
//             </Button>
//           </div>
//         </div>
//     </div>
//   );
// }

// export default Page;

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
      jobTitle: "Leadership",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Data Entry",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Public Speaking",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Critical Thinking",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Customer Services",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Data Management",
    },
    {
      icon: <FiPlusCircle size={25} />,
      jobTitle: "Organization and time management",
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
    <div className='bg-white rounded flex flex-col h-full shadow w-[100%] lg:w-[900px] xl:w-[1150px] 2xl:w-[1300px] mt-12 mx-auto py-10 px-4 lg:px-12'>
      <div className='flex flex-col justify-between'>
        <div className='my-4 flex flex-col gap-y-3'>
          <h1 className='font-bold text-lg md:text-2xl'>Skills</h1>
          <p className='text-lg md:text-xl'>Bullet points should separate skills. Add a few skills to show employers you’re good in your field.</p>
        </div>

        <div className='flex flex-col lg:flex-row justify-between'>
          {/* Left div */}
          <div className='w-full lg:w-[550px] h-[600px] border'>
            {/* Header of the div */}
            <div className='w-full h-[100px] bg-black rounded'>
              <p className='text-white font-bold text-xl text-center pt-8 '>Selected Skills</p>
            </div>
            <div className='p-4'>
              {selectedJobs.length > 0 ? (
                selectedJobs.map((jobTitle, index) => (
                  <div key={index} className='flex justify-between items-center'>
                    <p className='text-xl my-2'>{jobTitle}</p>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  </div>
                ))
              ) : (
                <p className='text-xl'>No skills selected</p>
              )}
            </div>
            <div className='p-4'>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter skill"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className='border p-2 w-full mb-2'
              />
              <div className='flex justify-between'>
                <button onClick={handleSaveClick} className='bg-blue-500 text-white px-4 py-2 rounded'>Save</button>
                {isEditing && <button onClick={handleCancelClick} className='bg-red-500 text-white px-4 py-2 rounded'>Cancel</button>}
              </div>
            </div>
          </div>

          {/* Right div */}
          <div className='w-full lg:w-[550px] h-[600px] border'>
            {/* the header */}
            <div className='h-[160px] w-full rounded bg-black'>
              <p className='text-white font-bold text-xl lg:text-2xl text-center py-4'>Search by skill title and keyword</p>
              <div className="w-[90%] rounded bg-white p-3 flex gap-x-4 items-center mx-5">
                <SlMagnifier size={25} />
                <input type="search" className='focus:outline-none py-2 w-full' />
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
                  <p className='font-normal text-lg md:text-xl'>{data.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons start from here */}
        <div className='flex flex-col gap-y-5 md:flex-row justify-between mt-6 md:mt-28'>
          <Link href="/work-experience">
            <Button className='font-bold text-black border rounded-full px-5 py-3 w-full text-xl flex flex-row justify-center items-center gap-x-2'>
              <IoIosArrowBack size={25} />Back
            </Button>
          </Link>

          <Button
            className='font-bold white bg-black hover:bg-gray-600 rounded-full px-5 py-3 text-white text-xl flex flex-row justify-center items-center gap-x-2'
            // onClick={handleNextClick}
          >
            Save <MdNavigateNext size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
