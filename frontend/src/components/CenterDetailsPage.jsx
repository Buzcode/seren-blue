// src/components/CenterDetailsPage.jsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

const CenterDetailsPage = () => {
    const { centerName } = useParams();
     const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const testName = searchParams.get('testName');
    const testCategory = searchParams.get('testCategory');

    const diagnosticTests = {
          'blood-tests': [
            {
                name: '1 hour postprandial Plasma glucose',
                description: 'The 1-hour postprandial plasma glucose (PPG) test measures blood sugar levels one hour aft...',
                price: 'BDT 200',
                providers: 13,

            },
             {
                name: '1.5 hrs postprandial Plasma glucose',
                 description: 'The 1.5-hour postprandial plasma glucose (PPG) measurement evaluates blood sugar levels 90...',
                price: 'BDT 200',
                 providers: 13,
             },
              {
                name: '17a - OH Progesterone',
                 description: '17α-Hydroxyprogesterone  (17α-OH Progesterone) is a blood test used to measure the levels o...',
                price: 'BDT 2200',
                 providers: 12,
           },
           {
                name: '2 hrs postprandial Plasma glucose',
                description: '2 Hours Postprandial Plasma Glucose is a blood test used to measure the level of glucose l...',
                 price: 'BDT 200',
                 providers: 14,
           },
            {
                 name: '24 hrs Ambulatory BP',
                 description: 'A 24-hour ambulatory blood pressure (BP) monitoring test involves wearing a small, portabl...',
                price: 'BDT 200',
                 providers: 12,
            },
         ],
        'ct-scan': [
            {
                name: 'CT Scan of the Head',
                description: 'A computed tomography (CT) scan of the head uses special X-ray equipment to help evaluate...',
                price: 'BDT 1500',
                 providers: 8,
           },
              {
                 name: 'CT Scan of the Neck',
                description: 'A computed tomography (CT) scan of the neck uses special X-ray equipment to help evaluate...',
                 price: 'BDT 1800',
                   providers: 6,
            },
             {
                 name: 'CT Scan of the Chest',
                  description: 'A computed tomography (CT) scan of the chest uses special X-ray equipment to help evaluate...',
                 price: 'BDT 2000',
                  providers: 10,
            },
             {
                 name: 'CT Scan of the Abdomen and Pelvis',
                description: 'A computed tomography (CT) scan of the abdomen and pelvis uses special X-ray equipment to help evaluate...',
                price: 'BDT 2200',
                  providers: 9,
             },
              {
                 name: 'CT Scan of the Spine',
                 description: 'A computed tomography (CT) scan of the spine uses special X-ray equipment to help evaluate...',
                 price: 'BDT 2500',
                  providers: 7,
            }
        ],
         'endoscopy': [
            {
                name: 'Upper Endoscopy (Esophagogastroduodenoscopy)',
                description: 'An upper endoscopy is a procedure used to visually examine your upper digestive system.',
                 price: 'BDT 3500',
                providers: 5,
           },
           {
                name: 'Colonoscopy',
                description: 'A colonoscopy is an exam used to detect changes or abnormalities in the large intestine (colon).',
                 price: 'BDT 4000',
                providers: 7,
             },
           {
                name: 'Flexible Sigmoidoscopy',
                 description: 'A flexible sigmoidoscopy is a procedure to examine the lower part of the large intestine.',
                 price: 'BDT 3000',
                providers: 4,
            },
           {
               name: 'Endoscopic Ultrasound (EUS)',
               description: 'An endoscopic ultrasound combines endoscopy with ultrasound to obtain detailed images.',
                 price: 'BDT 4500',
                  providers: 6
             }
         ],
         'ultrasound': [
             {
                 name: 'Abdominal Ultrasound',
                description: 'An abdominal ultrasound is a noninvasive test used to examine the internal organs of the abdomen.',
                 price: 'BDT 1200',
                 providers: 10,
            },
             {
                 name: 'Pelvic Ultrasound',
                 description: 'A pelvic ultrasound is a noninvasive test used to examine the organs and structures in the pelvis.',
                 price: 'BDT 1000',
                providers: 9,
           },
             {
                 name: 'Thyroid Ultrasound',
                description: 'A thyroid ultrasound is a noninvasive test used to examine the thyroid gland located in your neck.',
                price: 'BDT 1000',
                providers: 7,
            },
               {
                 name: 'Renal Ultrasound',
                 description: 'A renal ultrasound is a noninvasive test to examine the kidneys and related structures.',
                 price: 'BDT 900',
                  providers: 10,
             },
            {
                name: 'Obstetric Ultrasound',
                 description: 'An obstetric ultrasound is a noninvasive test used during pregnancy to check on the fetus.',
                price: 'BDT 1100',
                 providers: 12
           }
        ],
         'x-ray': [
             {
                name: 'Chest X-Ray',
                 description: 'A chest X-ray is a common imaging test used to examine your lungs, heart and airway.',
                 price: 'BDT 800',
                 providers: 15
           },
            {
                 name: 'Bone X-Ray',
                description: 'A bone X-ray is an imaging test used to diagnose fractured bone or other abnormality.',
                price: 'BDT 700',
                providers: 14
            },
           {
                 name: 'Sinuses X-Ray',
                description: 'A sinuses X-Ray is an imaging test used to diagnose problems with your sinuses.',
                 price: 'BDT 600',
                  providers: 12
            },
             {
                name: 'Abdomen X-Ray',
                description: 'An abdominal X-ray is an imaging test used to examine the organs within your abdomen.',
                 price: 'BDT 650',
                   providers: 10
              },
           {
                 name: 'Extremities X-Ray',
                description: 'An extremities X-ray examines bones and tissues of the extremities, such as arms, legs, hands, and feet.',
                   price: 'BDT 750',
                providers: 12
            }
         ],
        'microbiology': [
             {
                 name: 'Blood Culture',
                description: 'A blood culture is a laboratory test used to check for bacteria or other germs in a blood sample.',
                 price: 'BDT 500',
                providers: 15,
             },
              {
                 name: 'Urine Culture',
                description: 'A urine culture is a lab test to identify bacteria and other germs in a urine sample.',
                 price: 'BDT 400',
                providers: 18
           },
           {
               name: 'Sputum Culture',
                description: 'A sputum culture is a test to find germs that can cause infection in your lungs or airways.',
                 price: 'BDT 600',
                providers: 17
            },
             {
                 name: 'Wound Culture',
                 description: 'A wound culture test identifies the type of infection affecting a wound.',
                 price: 'BDT 700',
                providers: 14
           },


            {
                name: 'Stool Culture',
                 description: 'A stool culture is a lab test to identify bacteria in a stool sample that can cause infection.',
                 price: 'BDT 450',
                providers: 15
           }
        ]
    };
    const centerData = {
        "Popular Diagnostic Centre Ltd. | Dhanmondi": {
            name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
            yearsInService: '28 Years in service',
            services: ['Dialysis', 'ICU', 'Vaccination'],
            hotline: '+8809666 787801',
            email: 'info@populardiagnostic.com',
            mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.294590323445!2d90.37374007472007!3d23.73074039410046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85b2f262b5d%3A0xe24c97c61d1885f7!2sPopular%20Diagnostic%20Centre%20Ltd.%20(Dhanmondi)!5e0!3m2!1sen!2sbd!4v1716621825171!5m2!1sen!2sbd',
        },
        "Labaid Diagnostic Ltd": {
            name: 'Labaid Diagnostic Ltd',
            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
            yearsInService: '20 Years in service',
            services: ['Pathology', 'Imaging', 'Cardiology'],
            hotline: '+8801711111111',
            email: 'info@labaiddiagnostic.com',
            mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.297516323234!2d90.37733447471996!3d23.73066219410067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b859c5380515%3A0x3eb4c085355a1298!2sLabaid%20Diagnostic%20Ltd%20(Dhanmondi)!5e0!3m2!1sen!2sbd!4v1716622440845!5m2!1sen!2sbd',
        }
    };


    const selectedCenter = centerData[centerName];
       const selectedTest = diagnosticTests[testCategory]?.find(test => test.name === testName);

    if (!selectedCenter) {
        return <p>Center Not Found</p>;
    }

      return (
        <div className="container mx-auto p-4">
            {/* Center Details */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{selectedCenter.name}</h1>
                <p className="text-gray-600">{selectedCenter.yearsInService}</p>
            </div>
            <div className="flex mb-6 items-start">
                <div className="mr-8 flex-1">
                    <div className="flex items-center mb-2">
                        <span className="material-symbols-outlined text-blue-500 mr-1">call</span>
                        <div>
                            <p className="font-semibold inline-block"> Hotline (Open 24/7)</p>
                            <p className='ml-[20px] inline-block align-top'>{selectedCenter.hotline}</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold">Contact us via email</p>
                        <p><a href={`mailto:${selectedCenter.email}`} className='text-blue-500'>{selectedCenter.email}</a></p>
                        <a href='#' className='text-blue-500 mt-2 block'>More ways to contact</a>
                    </div>
                </div>
               <div className='flex-1'>
                    <div className="flex items-start mb-2">
                         <div>
                           <span className="material-symbols-outlined text-blue-500 mr-1">location_on</span>
                          <p className='text-left inline-block'>Location On</p>
                         <p className='ml-[20px]  inline-block align-top'>{selectedCenter.address}</p>
                        </div>
                    </div>
                 </div>
                 {/* Map Container */}
                 <div className="w-[40%] flex flex-col relative">
                      <div className="absolute top-0 left-0 p-2">
                        <a href={selectedCenter.mapLink} target='_blank' rel="noopener noreferrer" className='flex items-center'>
                           <span className="material-symbols-outlined text-blue-500 mr-2">
                            map
                          </span>
                         <span className='text-blue-500 hover:underline'> View larger map</span>
                       </a>
                   </div>
                    <iframe
                        title="Diagnostic Center Map"
                       width="100%"
                        height="300"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={selectedCenter.mapLink}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        {selectedTest && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                       <h2 className="text-xl font-semibold">Diagnostic Services</h2>
                         <Link to="/check-prices" className="text-blue-500 hover:underline">
                                   Back to Diagnostic Services
                            </Link>
                        </div>
                         <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between mb-4">
                            <div className='flex flex-col'>
                                 <h3 className="text-lg font-semibold">{selectedTest.name}</h3>
                                <p className="text-gray-700">
                                  {selectedTest.description}
                               </p>
                            </div>
                            <div className='flex items-center'>
                                  <span className="text-gray-700 mr-2">
                                   <span className="material-symbols-outlined align-bottom text-gray-700">local_offer</span>{selectedTest.price}</span>
                                  <button  className="bg-blue-100 text-blue-700 rounded px-4 py-2 hover:bg-blue-200">
                                      Add to Cart
                                </button>
                            </div>
                        </div>
                  </div>
                )}

            <div className='flex justify-start'>
                   <button className='bg-blue-500 text-white rounded px-4 py-2 mt-6 inline-flex items-center'>
                       <span className='material-symbols-outlined mr-1'>send</span>
                       <span>Message</span>
                     </button>
           </div>
        </div>
    );
};

export default CenterDetailsPage;