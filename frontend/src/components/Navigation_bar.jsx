import React, { useState, useEffect, useCallback } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const Navigation_bar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { token, logout } = useAuth();

    const handleLogout = useCallback(() => {
        logout();
        setShowProfileMenu(false);
    }, [logout, setShowProfileMenu]);

    const handleProfileClick = useCallback(() => {
        setShowProfileMenu((prev) => !prev);
        setShowMenu(false);
    }, [setShowMenu,setShowProfileMenu]);

    const isActive = useCallback((path) => {
        return location.pathname === path;
    }, [location.pathname]);

    useEffect(() => {
         document.body.scrollIntoView({ behavior: 'instant' });
         setShowMenu(false);
         setShowProfileMenu(false)
     }, [location,setShowMenu, setShowProfileMenu]);

     const stickyHeaderStyle = {
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'white',
        };

    return (
        <header style={stickyHeaderStyle}>
            <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
                <img onClick={() => navigate('/')} className='w-16 h-auto cursor-pointer' src={assets.logo} alt="" />
                <ul className='hidden md:flex md:items-center gap-5 font-medium'>
                    <NavLink to='/' className={isActive('/') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/') ? 'text-primary' : ''}`}>HOME</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/') ? 'block' : 'hidden'}`} />
                    </NavLink>
                    <NavLink to='/doctors' className={isActive('/doctors') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/doctors') ? 'text-primary' : ''}`}>ALL DOCTORS</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/doctors') ? 'block' : 'hidden'}`} />
                    </NavLink>
                    <NavLink to='/find-ambulance' className={isActive('/find-ambulance') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/find-ambulance') ? 'text-primary' : ''}`}>FIND AMBULANCE</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/find-ambulance') ? 'block' : 'hidden'}`} />
                    </NavLink>
                    {/* Reviews link added here */}
                    <NavLink to='/reviews' className={isActive('/reviews') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/reviews') ? 'text-primary' : ''}`}>REVIEWS</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/reviews') ? 'block' : 'hidden'}`} />
                    </NavLink>
                    <NavLink to='/about' className={isActive('/about') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/about') ? 'text-primary' : ''}`}>ABOUT</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/about') ? 'block' : 'hidden'}`} />
                    </NavLink>
                    <NavLink to='/contact' className={isActive('/contact') ? 'text-primary' : ''}>
                        <li className={`py-1 ${isActive('/contact') ? 'text-primary' : ''}`}>CONTACT</li>
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/contact') ? 'block' : 'hidden'}`} />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-4'>
                    {token ? (
                        <div onClick={handleProfileClick} className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={assets.profilepic1} alt="" />
                            <img className='w-2.5' src={assets.dropdownicon} alt="" />
                            {showProfileMenu && (
                                <div className='absolute top-0 right-0 mt-14 text-base font-medium text-gray-600 z-20'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                       <p onClick={() => { navigate('/MyProfile'); setShowProfileMenu(false); }} className='hover:text-black cursor-pointer'>
                                            My Profile
                                        </p>
                                        <p onClick={() => { navigate('/my-appointments'); setShowProfileMenu(false); }} className='hover:text-black cursor-pointer'>
                                            My Appointments
                                        </p>
                                        <p onClick={handleLogout} className='hover:text-black cursor-pointer'>
                                            Logout
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className='bg-primary text-black px-8 py-3 rounded-full font-semibold hidden md:block'>
                            Create account
                        </button>
                    )}
                    <HiMenu onClick={() => { setShowMenu((prev) => !prev); setShowProfileMenu(false) }} className='h-6 w-6 text-zinc-700 md:hidden' />
                    {showMenu && (
                        <div className={'fixed right-0 top-0 bottom-0 z-20  bg-white transition-all w-80 shadow-md md:hidden'}>
                            <div className='flex flex-col h-full'>
                                <div className='flex items-center justify-between px-5 py-6'>
                                    <img className='w-36' src={assets.logo} alt="" />
                                    <AiOutlineClose onClick={() => setShowMenu(false)} className='w-8 h-8 text-black cursor-pointer' />
                                </div>
                                <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium'>
                                    <NavLink onClick={() => setShowMenu(false)} to='/' className={isActive('/') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/') ? 'text-primary' : ''}`}>HOME</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={isActive('/doctors') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/doctors') ? 'text-primary' : ''}`}>ALL DOCTORS</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/find-ambulance' className={isActive('/find-ambulance') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/find-ambulance') ? 'text-primary' : ''}`}>FIND AMBULANCE</p></NavLink>
                                    {/* Reviews link added here for mobile menu */}
                                    <NavLink onClick={() => setShowMenu(false)} to='/reviews' className={isActive('/reviews') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/reviews') ? 'text-primary' : ''}`}>REVIEWS</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/about' className={isActive('/about') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/about') ? 'text-primary' : ''}`}>ABOUT</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/contact' className={isActive('/contact') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/contact') ? 'text-primary' : ''}`}>CONTACT</p></NavLink>
                                </ul>
                            </div>
                        </div>
                    )}
                    {showMenu && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 md:hidden" onClick={() => setShowMenu(false)}></div>}
                </div>
            </div>
        </header>
    );
};

export default Navigation_bar;