'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../lib/redux/store';
import { fetchResumes } from '../lib/redux/resume/getResumeList/GetResumeListThunk';;
import { deleteResume } from '../lib/redux/resume/deleteResume/deleteResumeThunk';
import { resumePoints } from '../lib/redux/resumePoints/resumePointsThunk';


const Page = () => {  

  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  const { resumes, loading, error } = useSelector((state: RootState) => state.getResume);
  const { resumepoints, loadingPoints,errorPoints } = useSelector((state: RootState) => state.resumePoints);
  const [searchQuery, setSearchQuery] = useState('');

  console.log("ResumePoints are here",resumepoints.points)
  console.log("Email",session?.user?.email)
  console.log("ID",session?.user?.id)


  // Get All Resumes
  useEffect(() => {
      // Fetching resume Points on component mount
      dispatch(fetchResumes(session?.user?.email));
      dispatch(resumePoints(session?.user?.id));
    
  }, [session?.user?.email || session?.user?.id ]);

  // Delete API
  const handleDelete = async (resumeId: string) => {
    try {
      await dispatch(deleteResume({ resumeId, session })); 
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  // Search Functionality
  const filteredResumes = resumes.filter(resume => 
    resume.resumeFileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='mt-12 max-w-[900px] px-4 mx-auto'>
      <div className='flex flex-col gap-y-3 justify-between items-center'>
        {status === 'loading' ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <p className='font-semibold text-3xl text-end'>{session?.user?.name}'s Resume</p>
        )}
        {status === 'loading' ? (
          <div className=" w-[100%] flex justify-center">
          {/* <Loader2 className="mr-2 h-5 w-5 animate-spin" /> */}
          </div>
        ) : (
          <p className='font-semibold text-3xl text-center w-[100%]'>{resumepoints.points}<span className='font-normal text-xl'> Points Remaining</span></p>
        )}
        <div className='flex items-center justify-between px-3 border rounded-full w-full h-[50px]'>
          <input
            type="search"
            placeholder='Search resume here'
            className='py-2 w-full focus:outline-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.length > 0 ? '' :
            <SlMagnifier size={20} />
          }
        </div>
      </div>
      <div className="overflow-x-scroll shadow-xl">
        <table className="mt-4 min-w-[800px] w-full h-fit table-container">
          <thead>
            <tr>
              <th className="text-center px-4 py-2">Filename</th>
              <th className="text-center px-4 py-2">Uploaded At</th>
              <th className="text-center px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody >
            {status === 'loading' ? (
              <tr>
                <td className="text-center px-4 py-2 "></td>
                <td className="text-center px-4 pb-0 pt-4 mt-1 text-lg font-medium">Loading...</td>
                <td className="text-center px-4 py-2"></td>
              </tr>
            ) : loading === false && filteredResumes.length === 0  ?  (
              <tr>
                <td className="text-center px-4 py-2 "></td>
                <td className="text-center px-4 pb-0 pt-4 mt-1 text-lg font-medium">No resumes found.</td>
                <td className="text-center px-4 py-2 "></td>
              </tr>
            ) : (
              filteredResumes.map((resume) => (
                <tr key={resume._id} className="bg-gray-100">
                  <td className="px-4 py-2 text-center">{resume.resumeFileName}</td>
                  <td className="px-4 py-2 text-center">{resume.updatedAt.substring(0, 10)}</td>
                  <td className="px-4 py-2 flex gap-x-4 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">Edit</button>
                    <button onClick={() => handleDelete(resume._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
