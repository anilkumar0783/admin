import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';



function AdminProfile() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Admin Profile</h2>
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <img 
                            className="w-24 h-24 rounded-full" 
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                            alt="Admin Profile"
                        />
                    </div>
                    <div>
                        <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input 
                            id="adminName" 
                            name="adminName" 
                            type="text" 
                            value="Anil" 
                            disabled
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            id="adminEmail" 
                            name="adminEmail" 
                            type="email" 
                            value="anil@example.com" 
                            disabled
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input 
                                id="adminPassword" 
                                name="adminPassword" 
                                type={passwordVisible ? "text" : "password"} 
                                value="anil123" 
                                disabled
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button 
                                type="button" 
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
