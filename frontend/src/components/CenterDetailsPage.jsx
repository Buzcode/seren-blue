// components/CenterDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

const CenterDetailsPage = () => {
    const { centerName } = useParams();
    const location = useLocation();
    const [centerDetails, setCenterDetails] = useState(null);
    const [selectedTestDetails, setSelectedTestDetails] = useState(null);
    const [contactEmail, setContactEmail] = useState('info@populardiagnostic.com');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const testCategory = searchParams.get('testCategory');
        const testName = searchParams.get('testName');
        const diagnosticTestsParam = searchParams.get('diagnosticTests');

        if (testCategory && testName && diagnosticTestsParam) {
            try {
                const diagnosticTests = JSON.parse(decodeURIComponent(diagnosticTestsParam));
                let foundCenter = null;
                let foundTestDetails = null;

                const tests = diagnosticTests[testCategory] || [];
                foundTestDetails = tests.find((test) => test.name === testName);

                if (foundTestDetails && foundTestDetails.availablePlaces) {
                    const place = foundTestDetails.availablePlaces.find(place => place.name === decodeURIComponent(centerName));
                    if (place) {
                        foundCenter = place;
                    }
                }
                setSelectedTestDetails(foundTestDetails);
                setCenterDetails(foundCenter);

                if (foundCenter && foundCenter.name) {
                    const namePart = foundCenter.name.toLowerCase().split(' | ')[0].split(' ').join('');
                    setContactEmail(`info@${namePart}.com`)
                }
                else
                    setContactEmail('info@populardiagnostic.com')


            } catch (error) {
                console.error('Error parsing diagnosticTests:', error);
                setCenterDetails(null);
                setSelectedTestDetails(null);
                setContactEmail('info@populardiagnostic.com')
            }

        } else {
            setCenterDetails(null);
            setSelectedTestDetails(null);
            setContactEmail('info@populardiagnostic.com')
        }
    }, [centerName, location.search]);

    if (!centerDetails || !selectedTestDetails) {
        return <div>Loading or Center not found...</div>;
    }

    const handleBookTest = () => {
        alert('Booking feature is coming soon!');
        // Implement booking logic here
    };


    return (
        <div className="container mx-auto p-4">
            {/* First part: Center Information, Contact & Address/Map */}
            <div className="bg-white rounded-lg shadow-md mb-8">
                <div className="p-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Section: Center Info & Contact */}
                        <div className="flex flex-col p-2 w-full lg:w-1/4">
                            <h1 className="text-2xl font-bold mb-2">{centerDetails.name}</h1>
                            <p className="text-gray-600 mb-4">28 Years in service</p>
                            <div className='mb-4'>
                                <div className='flex items-center mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    <div className='flex flex-col ml-2'>
                                        <p className="text-gray-700 font-semibold">Hotline (Open 24/7)</p>
                                        <p className='text-blue-600'>+8809666 787801</p>
                                    </div>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.077 1.98l-8.478 5.233a1.5 1.5 0 01-1.422 0l-8.478-5.233A2.25 2.25 0 012.25 6.993V6.75m19.5 0a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25" />
                                    </svg>
                                    <div className='flex flex-col ml-2'>
                                        <p className="text-gray-700 font-semibold">Contact us via email</p>
                                        <p className='text-blue-600'>{contactEmail}</p>
                                    </div>

                                </div>
                                <Link to='#' className="text-blue-500 font-semibold hover:underline">More ways to contact</Link>
                            </div>
                            <button
                                onClick={handleBookTest}
                                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mt-2 w-[80%]"
                            >
                                <span className='flex items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.769 59.769 0 0121.485 12a59.77 59.77 0 01-2.736 8.876L18 12m-6 6h.01m6-6h.01m-3 6V6a3 3 0 00-3-3H9a3 3 0 00-3 3v12m6 0h.01m-3-6h.01" />
                                    </svg>
                                    Message
                                </span>
                            </button>

                        </div>


                        {/* Middle Section: Address and Map */}
                        <div className="flex flex-col lg:flex-row w-full lg:w-3/4">
                            <div className="w-full lg:w-1/2 p-2">
                                <div className='flex items-start mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <div className="ml-2">
                                        <p className="text-gray-700 font-semibold">Address</p>
                                        <p className='text-gray-600'> {centerDetails.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 p-2">
                                <div className="relative">
                                    <iframe
                                        width="100%"
                                        height="250"  // Reduced height of the map
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCcutCaFBCT0I6hilC0wCcBoNZyP6p7yl0
                                        &q=${encodeURIComponent(centerDetails.address)}`}>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Second Part: Diagnostic Service & Booking */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4">
                    <div className='flex mb-4 items-center'>
                        <Link to="#" className='flex items-center  text-blue-600 font-bold'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>

                            Back to Diagnostic Test Services
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">{selectedTestDetails.name}</h2>
                        <p className="text-gray-700 mb-4">
                            {selectedTestDetails.description}
                        </p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className="text-gray-700 font-bold">{selectedTestDetails.name}</p>
                        <span className='flex items-center text-blue-700 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.079.879 4.25 0l.879-.66M12 21a9 9 0 110-18 9 9 0 010 18z" />
                            </svg>
                            {selectedTestDetails.price}
                        </span>
                        <button onClick={handleBookTest} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 ">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CenterDetailsPage;