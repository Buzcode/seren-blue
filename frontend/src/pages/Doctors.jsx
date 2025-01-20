import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div className="md:mx-10">
            <p className="text-gray-600">Browse through the doctors specialist.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                    <p
                        onClick={() =>
                            speciality === 'General physician'
                                ? navigate('/doctors')
                                : navigate('/doctors/General physician')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'General physician'
                                ? 'bg-indigo-100 text-black'
                                : ''
                        }`}
                    >
                        General physician
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Gynecologist'
                                ? navigate('/doctors')
                                : navigate('/doctors/Gynecologist')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''
                        }`}
                    >
                        Gynecologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Dermatologist'
                                ? navigate('/doctors')
                                : navigate('/doctors/Dermatologist')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'Dermatologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                        }`}
                    >
                        Dermatologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Pediatrician'
                                ? navigate('/doctors')
                                : navigate('/doctors/Pediatrician')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'Pediatrician'
                                ? 'bg-indigo-100 text-black'
                                : ''
                        }`}
                    >
                        Pediatrician
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Neurologist'
                                ? navigate('/doctors')
                                : navigate('/doctors/Neurologist')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'Neurologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                        }`}
                    >
                        Neurologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Gastroenterologist'
                                ? navigate('/doctors')
                                : navigate('/doctors/Gastroenterologist')
                        }
                        className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === 'Gastroenterologist'
                                ? 'bg-indigo-100 text-black'
                                : ''
                        }`}
                    >
                        Gastroenterologist
                    </p>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
                    {filterDoc.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white shadow-md rounded-lg p-4 hover:border-blue-500 transition-colors duration-200 border-2 border-gray-300 cursor-pointer"
                            onClick={() => navigate(`/appointment/${item._id}`)}
                        >
                            {/* Image container with border, hover and padding and sizing */}
                            <div className="w-full h-48 mb-4 rounded-md overflow-hidden p-2 bg-gray-100 flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            {/* Info Container with flex, centering and text styling */}
                            <div className="flex items-center gap-2 text-sm text-center text-gray-900 flex-col items-start">
                                <div>
                                    <p>
                                        <small className="text-green-600 font-semibold">
                                            Available
                                        </small>
                                    </p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">
                                    {item.name}
                                </p>
                                <p className="text-gray-600 text-sm">{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;