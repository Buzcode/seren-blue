import React from 'react';
import { assets } from '../assets/assets';

const DiagnosticCare = () => {
  const testData = [
    {
      name: 'CT Scan',
      image: assets.ct_scan,
      path: 'ct-scan',
    },
    {
      name: 'Blood Tests',
      image: assets.blood_tests,
      path: 'blood-tests',
    },
    {
      name: 'Endoscopy',
      image: assets.endoscopy,
      path: 'endoscopy',
    },
    {
      name: 'Ultrasound',
      image: assets.ultrasound,
      path: 'ultrasound',
    },
    {
      name: 'X-Ray',
      image: assets.xray,
      path: 'x-ray',
    },
    {
      name: 'Microbiology',
      image: assets.microbiology,
      path: 'microbiology',
    },
  ];

    const handleTestClick = (testPath) => {
      window.location.href = `/diagnostic-tests/${testPath}`;
    };

  return (
    <div className="bg-[#f0f8ff] py-8 px-4 font-sans rounded-md">
      <div className="mb-8">
        <h2 className="text-2xl text-gray-800 font-semibold">
          Get timely, cost-effective, and high-quality diagnostic care
        </h2>
        <p className="text-gray-700 mt-2">
          Book tests with top labs, get sample pick up, share reports with doctors online
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {testData.map((test, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-transform duration-200 cursor-pointer flex flex-col"
            onClick={() => handleTestClick(test.path)}
          >
            <img
              src={test.image}
              alt={test.name}
              className="w-full h-32 object-contain rounded-lg mb-2 mx-auto block"
            />
            <div className="flex items-center justify-center flex-col"> 
              <h3 className="text-base text-gray-800 font-semibold mb-1 text-center">{test.name}</h3>  
              <p className="text-blue-500 text-sm hover:underline mt-2">
                Check Prices
             </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticCare;