// src/pages/DiagnosticTestsPage.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AvailablePlacesPage from '../components/AvailablePlacesPage';

const DiagnosticTestsPage = () => {
  const { testCategory } = useParams();
  const [selectedTest, setSelectedTest] = useState(null);

  const handleAvailablePlacesClick = (testName) => {
      console.log("handleAvailablePlacesClick: testName", testName, "testCategory", testCategory);
      setSelectedTest(testName);
  };

  const handleCloseModal = () => {
      setSelectedTest(null);
  };

  const diagnosticTests = {
        'blood-tests': [
            {
                name: '1 hour postprandial Plasma glucose',
                description: 'The 1-hour postprandial plasma glucose (PPG) test measures blood sugar levels one hour aft...',
                price: 'BDT 200',
                providers: 13,
                availablePlaces: [

                    {
                        name: 'Labaid Diagnostic Ltd',
                        address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                        branches: 10
                    }
                ]
            },
            {
                name: '1.5 hrs postprandial Plasma glucose',
                description: 'The 1.5-hour postprandial plasma glucose (PPG) measurement evaluates blood sugar levels 90...',
                price: 'BDT 200',
                providers: 13,
                availablePlaces: [
                   {
                        name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                        address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                        branches: 12
                    }
                ]
            },
            {
                name: '17a - OH Progesterone',
                description: '17α-Hydroxyprogesterone  (17α-OH Progesterone) is a blood test used to measure the levels o...',
                price: 'BDT 2200',
                providers: 12,
                  availablePlaces: [
                        {
                            name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                             address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                        },
                        {
                           name: 'Labaid Diagnostic Ltd',
                             address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                        }
                    ]
           },
           {
                name: '2 hrs postprandial Plasma glucose',
                description: '2 Hours Postprandial Plasma Glucose is a blood test used to measure the level of glucose l...',
                price: 'BDT 200',
                providers: 14,
                availablePlaces: [

                     {
                           name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 10
                       }
                ]
            },
            {
                 name: '24 hrs Ambulatory BP',
                 description: 'A 24-hour ambulatory blood pressure (BP) monitoring test involves wearing a small, portabl...',
                price: 'BDT 200',
                providers: 12,
                availablePlaces: [
                   {
                         name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                          address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 12
                       },
                     {
                           name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 10
                       }
                ]
           },
         ],
        'ct-scan': [
            {
                name: 'CT Scan of the Head',
                description: 'A computed tomography (CT) scan of the head uses special X-ray equipment to help evaluate...',
                price: 'BDT 1500',
                 providers: 8,
                  availablePlaces: [
                    {
                        name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                          address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 12
                       }
                    ]
           },
            {
                name: 'CT Scan of the Neck',
                description: 'A computed tomography (CT) scan of the neck uses special X-ray equipment to help evaluate...',
                 price: 'BDT 1800',
                   providers: 6,
                    availablePlaces: [
                       {
                            name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                              address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                        },
                     {
                          name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                      }
                  ]
              },
            {
                name: 'CT Scan of the Chest',
                description: 'A computed tomography (CT) scan of the chest uses special X-ray equipment to help evaluate...',
                price: 'BDT 2000',
                providers: 10,
                availablePlaces: [

                    {
                        name: 'Labaid Diagnostic Ltd',
                          address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 10
                      }
                   ]
            },
             {
               name: 'CT Scan of the Abdomen and Pelvis',
               description: 'A computed tomography (CT) scan of the abdomen and pelvis uses special X-ray equipment to help evaluate...',
                 price: 'BDT 2200',
                providers: 9,
                availablePlaces: [
                     {
                          name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       }
                  ]
           },
           {
                name: 'CT Scan of the Spine',
                description: 'A computed tomography (CT) scan of the spine uses special X-ray equipment to help evaluate...',
                price: 'BDT 2500',
                providers: 7,
                 availablePlaces: [
                       {
                            name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                        },
                      {
                           name: 'Labaid Diagnostic Ltd',
                             address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                       }
                 ]
           }
       ],
       'endoscopy': [
            {
                name: 'Upper Endoscopy (Esophagogastroduodenoscopy)',
                description: 'An upper endoscopy is a procedure used to visually examine your upper digestive system.',
                price: 'BDT 3500',
                 providers: 5,
                 availablePlaces: [
                     {
                          name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       },
                     {
                           name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                        }
                ]
           },
            {
                name: 'Colonoscopy',
                description: 'A colonoscopy is an exam used to detect changes or abnormalities in the large intestine (colon).',
                price: 'BDT 4000',
                 providers: 7,
                 availablePlaces: [
                      {
                           name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                       }
                 ]
           },
            {
                name: 'Flexible Sigmoidoscopy',
                description: 'A flexible sigmoidoscopy is a procedure to examine the lower part of the large intestine.',
                 price: 'BDT 3000',
                 providers: 4,
                  availablePlaces: [
                      {
                            name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                             address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       },
                      {
                            name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                       }
                ]
            },
           {
                name: 'Endoscopic Ultrasound (EUS)',
                description: 'An endoscopic ultrasound combines endoscopy with ultrasound to obtain detailed images.',
                 price: 'BDT 4500',
                providers: 6,
                availablePlaces: [
                      {
                           name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                        }
                    ]
           }
       ],
        'ultrasound': [
           {
                 name: 'Abdominal Ultrasound',
                description: 'An abdominal ultrasound is a noninvasive test used to examine the internal organs of the abdomen.',
                 price: 'BDT 1200',
                providers: 10,
                availablePlaces: [
                     {
                         name: 'Labaid Diagnostic Ltd',
                           address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                        }
                   ]
           },
           {
               name: 'Pelvic Ultrasound',
               description: 'A pelvic ultrasound is a noninvasive test used to examine the organs and structures in the pelvis.',
                 price: 'BDT 1000',
                providers: 9,
                 availablePlaces: [
                     {
                        name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                           address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                      },
                     {
                         name: 'Labaid Diagnostic Ltd',
                           address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                        }
                  ]
           },
            {
                 name: 'Thyroid Ultrasound',
                description: 'A thyroid ultrasound is a noninvasive test used to examine the thyroid gland located in your neck.',
                 price: 'BDT 1000',
                 providers: 7,
                  availablePlaces: [
                    {
                        name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                          address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                      }
                  ]
            },
             {
                 name: 'Renal Ultrasound',
                 description: 'A renal ultrasound is a noninvasive test to examine the kidneys and related structures.',
                 price: 'BDT 900',
                providers: 10,
                  availablePlaces: [
                     {
                          name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                       }
                   ]
             },
           {
                 name: 'Obstetric Ultrasound',
                 description: 'An obstetric ultrasound is a noninvasive test used during pregnancy to check on the fetus.',
                  price: 'BDT 1100',
                  providers: 12,
                  availablePlaces: [
                      {
                         name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                           address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                             branches: 12
                        },
                     {
                          name: 'Labaid Diagnostic Ltd',
                            address: 'House #10, Road # 1, Dhanmondi R/A, 10, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 10
                        }
                    ]
           }
        ],
        'x-ray': [
            {
                name: 'Chest X-Ray',
                 description: 'A chest X-ray is a common imaging test used to examine your lungs, heart and airway.',
                 price: 'BDT 800',
                 providers: 15,
                availablePlaces: [
                     {
                           name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                             address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                         },
                     {
                           name: 'Ibn Sina Diagnostic Center',
                            address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 7
                       }
                 ]
            },
            {
                 name: 'Bone X-Ray',
                 description: 'A bone X-ray is an imaging test used to diagnose fractured bone or other abnormality.',
                 price: 'BDT 700',
                providers: 14,
                 availablePlaces: [
                     {
                         name: 'Ibn Sina Diagnostic Center',
                            address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 7
                        }
                   ]
            },
             {
                name: 'Sinuses X-Ray',
                 description: 'A sinuses X-Ray is an imaging test used to diagnose problems with your sinuses.',
                 price: 'BDT 600',
                 providers: 12,
                availablePlaces: [
                     {
                         name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                           address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       }
                 ]
            },
            {
                name: 'Abdomen X-Ray',
                 description: 'An abdominal X-ray is an imaging test used to examine the organs within your abdomen.',
                price: 'BDT 650',
                 providers: 10,
                  availablePlaces: [
                     {
                         name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                           address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       },
                    {
                         name: 'Ibn Sina Diagnostic Center',
                          address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 7
                        }
                   ]
            },
          {
               name: 'Extremities X-Ray',
                description: 'An extremities X-ray examines bones and tissues of the extremities, such as arms, legs, hands, and feet.',
                 price: 'BDT 750',
                providers: 12,
                availablePlaces: [
                   {
                        name: 'Ibn Sina Diagnostic Center',
                          address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 7
                       }
                  ]
            }
        ],
        'microbiology': [
           {
                name: 'Blood Culture',
                description: 'A blood culture is a laboratory test used to check for bacteria or other germs in a blood sample.',
                 price: 'BDT 500',
                providers: 15,
                 availablePlaces: [
                     {
                           name: 'Popular Diagnostic Centre Ltd. | Dhanmondi',
                            address: 'House #16, Road # 2, Dhanmondi R/A, 6, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 12
                       },
                   {
                       name: 'Ibn Sina Diagnostic Center',
                         address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 7
                       }
                   ]
            },
            {
               name: 'Urine Culture',
                description: 'A urine culture is a lab test to identify bacteria and other germs in a urine sample.',
                 price: 'BDT 400',
                providers: 18,
                 availablePlaces: [
                   {
                         name: 'Ibn Sina Diagnostic Center',
                           address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 7
                      }
                 ]
           },
          {
               name: 'Sputum Culture',
               description: 'A sputum culture is a test to find germs that can cause infection in your lungs or airways.',
                 price: 'BDT 600',
                providers: 17,
                availablePlaces: [
                    {
                        name: 'Ibn Sina Diagnostic Center',
                          address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 7
                        }
                   ]
           },
            {
                name: 'Wound Culture',
                description: 'A wound culture test identifies the type of infection affecting a wound.',
                 price: 'BDT 700',
               providers: 14,
                availablePlaces: [
                   {
                         name: 'Ibn Sina Diagnostic Center',
                           address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                           branches: 7
                     }
                 ]
            },
             {
                name: 'Stool Culture',
                 description: 'A stool culture is a lab test to identify bacteria in a stool sample that can cause infection.',
                 price: 'BDT 450',
                 providers: 15,
                   availablePlaces: [
                    {
                       name: 'Ibn Sina Diagnostic Center',
                         address: 'House #100, Road # 11, Dhanmondi R/A, 100, Dhanmondi, Dhaka-1205, Bangladesh',
                            branches: 7
                    }
                ]
            }
        ]
    };

  const tests = diagnosticTests[testCategory] || [];

    return (
        <div className="container mx-auto p-4 relative">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Diagnostic Tests</h1>
            </div>
            {tests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tests.map((test, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between relative">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{test.name}</h3>
                                <p className="text-gray-700 mb-4">
                                    {test.description}
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-gray-700">From</p>
                                    <p className="font-bold">{test.price}</p>
                                </div>
                                <button
                                    onClick={() => handleAvailablePlacesClick(test.name)}
                                    className="bg-blue-100 text-blue-700 rounded px-4 py-2 hover:bg-blue-200"
                                >
                                    Available Places
                                </button>
                            </div>
                            <p className="text-gray-600 mt-2"> {test.providers} providers available</p>
                             {selectedTest === test.name && (
                                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className='bg-white shadow-md p-6 rounded-md w-[80%] md:w-[50%] relative'>
                                        <AvailablePlacesPage
                                          testName={selectedTest}
                                          testCategory={testCategory}
                                          diagnosticTests={diagnosticTests}
                                        />
                                       <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 absolute top-2 right-2 text-2xl cursor-pointer">
                                            ×
                                        </button>
                                    </div>
                                  </div>
                              )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tests available for this category.</p>
            )}
        </div>
    );
};

export default DiagnosticTestsPage;