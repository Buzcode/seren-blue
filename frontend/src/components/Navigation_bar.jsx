import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const Navigation_bar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [token, setToken] = useState(true);

    const handleLogout = () => {
        setToken(false);
        setShowProfileMenu(false);
        navigate('/login');
    };
    const handleProfileClick = () => {
        setShowProfileMenu(!showProfileMenu);
        setShowMenu(false)
    }

    const isActive = (path) => {
        return location.pathname === path;
    };
     const stickyHeaderStyle = {
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'white', //  header's background color

        };

    return (
        <header style={stickyHeaderStyle}>
            <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
                <img onClick={() => navigate('/')} className='w-16 h-auto cursor-pointer' src={assets.logo} alt="" />
                <ul className='hidden md:flex md:items-center gap-5 font-medium'>
                    <NavLink to='/' className={isActive('/') ? 'text-primary' : ''}> {/* Apply text-primary for active link */}
                        <li className={`py-1 ${isActive('/') ? 'text-primary' : ''}`}>HOME</li> {/* Apply text-primary for active link */}
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/') ? 'block' : 'hidden'}`} /> {/* Show hr for active link */}
                    </NavLink>
                    <NavLink to='/doctors' className={isActive('/doctors') ? 'text-primary' : ''}> {/* Apply text-primary for active link */}
                        <li className={`py-1 ${isActive('/doctors') ? 'text-primary' : ''}`}>ALL DOCTORS</li> {/* Apply text-primary for active link */}
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/doctors') ? 'block' : 'hidden'}`} /> {/* Show hr for active link */}
                    </NavLink>
                    <NavLink to='/find-ambulance' className={isActive('/find-ambulance') ? 'text-primary' : ''}> {/* FIND AMBULANCE NavLink with active style */}
                        <li className={`py-1 ${isActive('/find-ambulance') ? 'text-primary' : ''}`}>FIND AMBULANCE</li> {/* FIND AMBULANCE Li with active style */}
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/find-ambulance') ? 'block' : 'hidden'}`} /> {/* Show hr for active link */}
                    </NavLink>
                    <NavLink to='/about' className={isActive('/about') ? 'text-primary' : ''}> {/* Apply text-primary for active link */}
                        <li className={`py-1 ${isActive('/about') ? 'text-primary' : ''}`}>ABOUT</li> {/* Apply text-primary for active link */}
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/about') ? 'block' : 'hidden'}`} /> {/* Show hr for active link */}
                    </NavLink>
                    <NavLink to='/contact' className={isActive('/contact') ? 'text-primary' : ''}> {/* Apply text-primary for active link */}
                        <li className={`py-1 ${isActive('/contact') ? 'text-primary' : ''}`}>CONTACT</li> {/* Apply text-primary for active link */}
                        <hr className={`border-none outline-none h-0.5 bg-primary w-3/5 m-auto ${isActive('/contact') ? 'block' : 'hidden'}`} /> {/* Show hr for active link */}
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
                    <HiMenu onClick={() => { setShowMenu(!showMenu); setShowProfileMenu(false) }} className='h-6 w-6 text-zinc-700 md:hidden' />
                    {/**----mobile menu----- */}
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
                                    <NavLink onClick={() => setShowMenu(false)} to='/find-ambulance' className={isActive('/find-ambulance') ? 'text-primary' : ''}><p className={`px-4 py-2 rounded  inline-block ${isActive('/find-ambulance') ? 'text-primary' : ''}`}>FIND AMBULANCE</p></NavLink> {/* FIND AMBULANCE NavLink in Mobile Menu */}
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