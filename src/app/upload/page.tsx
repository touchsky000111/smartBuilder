'use client';

import { useState } from 'react';
import Link from 'next/link';

const UploadModelPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log('Uploading file:', selectedFile.name);
      alert('File uploaded successfully!');
    } else {
      alert('Please choose a file to upload.');
    }
  };

  return (
    <div className='w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
      <div className="w-full max-w-7xl mt-10 md:mt-20 flex flex-col items-start justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800 dark:text-white">Upload Model</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Upload a model file</p>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-6">
            <label className="bg-[#24587e] hover:bg-[#1a4260] text-white py-2 px-4 rounded cursor-pointer text-center transition-colors">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base break-all">
              {selectedFile ? selectedFile.name : 'No file chosen'}
            </span>
          </div>
          <button
            onClick={handleUpload}
            className="w-full md:w-auto bg-[#137bc4] hover:bg-[#0e5a94] text-white py-2 px-6 rounded cursor-pointer transition-colors"
          >
            Upload
          </button>
        </div>

        <Link href="/" className="w-full md:w-auto">
          <button className="mt-8 bg-[#137bc4] hover:bg-[#0e5a94] text-white p-2 rounded flex items-center justify-center text-sm cursor-pointer transition-colors w-full md:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to List
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UploadModelPage;