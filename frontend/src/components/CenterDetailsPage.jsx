    // components/CenterDetailsPage.jsx
    import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { BsFillTelephoneFill } from 'react-icons/bs';
    import { HiOutlineLocationMarker } from 'react-icons/hi';
    import { BiMessageSquareDetail } from 'react-icons/bi';

    const CenterDetailsPage = () => {
      const { centerName } = useParams();
      const [centerData, setCenterData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchCenterDetails = async () => {
          setLoading(true);
          setError(null);

          try {
            const response = await fetch(
              `/api/centers?centerName=${encodeURIComponent(centerName)}`
            );

            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Center not found');
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCenterData(data);
          } catch (err) {
            setError(err.message);
            console.error('Error fetching center details:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchCenterDetails();
      }, [centerName]);


      if (loading) {
        return <div className="text-center my-8">Loading center details...</div>;
      }

      if (error) {
        return <div className="text-center my-8 text-red-500">{error}</div>;
      }

      if (!centerData) {
        return <div className="text-center my-8 text-red-500">Center not found</div>;
      }

        return (
            <div className="container mx-auto p-4 font-sans">

                <div className="flex flex-wrap  mb-8">

                <div className="w-full md:w-2/3 p-4  ">
                     <h1 className="text-2xl font-bold">{centerData.name}</h1>
                     <p className="text-gray-600 mt-2">{centerData.yearsInService} Years in service</p>
                </div>


                  <div className="flex w-full md:w-1/3 p-4 gap-4 justify-around items-center ">
                         <div className="flex flex-col items-center">
                             <BsFillTelephoneFill  className="h-6 w-6 "/>
                            <p className="text-sm text-center">Hotline (Open 24/7)</p>
                           <p className="text-gray-700 font-medium text-center">{centerData.hotline}</p>
                         </div>
                         <div className="flex flex-col items-center">
                             <HiOutlineLocationMarker className="h-6 w-6 "/>
                           <p className="text-gray-700 text-sm text-center">{centerData.address}</p>
                         </div>
                   </div>


                 <div className="flex w-full  md:w-2/3 p-4 gap-4 ">
                    {centerData.services.map((service, index) => (
                      <button key={index} className="bg-blue-100 text-blue-700 rounded px-4 py-2 ">{service}</button>
                    ))}

                </div>

                    <div className="w-full md:w-1/3 p-4 gap-4 ">
                        <a  href = {`mailto: ${centerData.email}`} className="block text-sm text-blue-500 hover:underline text-center">{centerData.email}</a>
                        <a href="/contact" className="block text-sm text-blue-500 hover:underline text-center">More ways to contact</a>
                    </div>

                  <div className="w-full  flex justify-center  p-4  ">
                   <Link to="#" className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <BiMessageSquareDetail className="h-5 w-5 mr-2" />
                       Message
                    </Link>
                  </div>

                    <div className="w-full flex justify-center md:justify-end  p-4 mb-4 ">
                         <iframe
                             title="Google Map"
                             width="300"
                             height="200"
                            src={centerData.googleMapEmbedUrl}
                            allowFullScreen=""
                             loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                         ></iframe>
                    </div>

            </div>


            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Diagnostic Services</h2>
                <Link to="/diagnostic-tests/blood-tests"  className="text-blue-500 hover:underline mb-4 block">
                     ← Back to Diagnostic Services
                 </Link>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {centerData.diagnosticServices.map((service, index) => (
                         <div key={index} className="bg-white rounded-lg p-4 shadow-md flex flex-col relative">
                            <div className="flex justify-center  mb-4">
                                  <img
                                  src={service.image}
                                 alt={service.name}
                                  className="w-24 h-24 object-contain  mx-auto block"
                             />
                            </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                                      <p className="text-gray-700 mb-4">{service.description}</p>
                                </div>
                               <div className="flex items-center justify-between mt-auto">
                                    <div className="font-bold">{service.price}</div>
                                   <button
                                     className="bg-blue-100 text-blue-700 rounded px-4 py-2 hover:bg-blue-200"
                                     >
                                           Add to Cart
                                    </button>
                              </div>
                        </div>
                    ))}
                 </div>
            </div>
            </div>

        );
    };

    export default CenterDetailsPage;