import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [state, setState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { login } = useAuth(); //  useAuth hook

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const userData = {
            username: email,
            password: password,
        };

        try {

            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                alert('Login failed. Wrong username or password.');
                return;
            }

            const responseData = await response.json();
            // Corrected console.log location: AFTER responseData is obtained from response.json()
            console.log('Login successful - Response Data:', responseData); // <-- CORRECT console.log LOCATION
            login(responseData);
            alert('Login successful!');

        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please try again.');
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book your appointment</p>
                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}
                {state === 'Login' && <div className='w-full'></div>}
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type='text'  // type is "text" now
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                {state === 'Sign Up' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;