import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id="speciality">
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our website and appoint doctor as per your requirements.</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-scroll'>
        {specialityData.map((item, index) => (
          <Link 
              key={index} 
              to={`/doctors/${item.speciality}`} 
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          >
              <div className="w-24 h-24 overflow-hidden rounded-full">
                  <img src={item.image} alt={item.speciality} className="w-full h-full object-cover" />
              </div>
            <p className="text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;