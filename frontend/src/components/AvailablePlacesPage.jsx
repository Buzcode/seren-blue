
 import React from 'react';
 import { Link } from 'react-router-dom';

 const AvailablePlacesPage = ({ testName, testCategory, diagnosticTests }) => {

     if (!testCategory || !testName || !diagnosticTests) {
         return null;
     }

     const tests = diagnosticTests[testCategory] || [];
     const selectedTestDetails = tests.find((test) => test.name === testName);


     return (
         <div className="container mx-auto p-4">
             <div className="flex justify-between items-center mb-4">
                 <h1 className="text-2xl font-bold">Available Places</h1>
             </div>
             {selectedTestDetails && selectedTestDetails.availablePlaces ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {selectedTestDetails.availablePlaces.map((place, index) => (
                         <div
                             key={index}
                             className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between"
                         >
                             <div>
                                 <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
                                 <p className="text-gray-700 mb-4">{place.address}</p>
                             </div>
                             <div className="flex justify-between items-center mt-2">
                                 <p className="text-gray-600"> +{place.branches} more branches</p>
                                 <Link
                                     to={`/center-details/${encodeURIComponent(place.name)}?testCategory=${encodeURIComponent(testCategory)}&testName=${encodeURIComponent(testName)}&diagnosticTests=${encodeURIComponent(JSON.stringify(diagnosticTests))}`}
                                     className="bg-blue-100 text-blue-700 rounded px-4 py-2 hover:bg-blue-200"
                                 >
                                     View
                                 </Link>
                             </div>
                         </div>
                     ))}
                 </div>
             ) : <p> No available centers for this test </p>}
         </div>
     );
 };

 export default AvailablePlacesPage;