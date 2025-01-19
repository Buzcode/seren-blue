import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      {/* Container for the doctors list with grid layout */}
      <div className='grid grid-cols-5 gap-8'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className='flex flex-col bg-white shadow-md rounded-lg p-4 hover:border-blue-500 transition-colors duration-200 border-2 border-gray-300 cursor-pointer'
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            {/* Image container with border, hover and padding and sizing */}
            <div
              className='w-full h-48 mb-4 rounded-md overflow-hidden p-2 bg-gray-100'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-full object-cover'
              />
            </div>
            {/* Info Container with flex, centering and text styling */}
            <div className="flex items-center gap-2 text-sm text-center text-gray-900 flex-col items-start">
              <div>
                <p>
                  <small className='text-green-600 font-semibold'>Available</small>
                </p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'  onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}>
        more
      </button>
    </div>
  );
};

export default TopDoctors;