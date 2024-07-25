import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LoginContext } from '../../LoginContext';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {singleUser,setSingleUser}=useContext(LoginContext)
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3020/api/all-users/admin`, {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                });
                const data = await response.json();
                if (data.status) {
                    setUsers(data.data);
                    setAllUsers(data.data); 
                }
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching users");
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (search) {
            const filteredUsers = allUsers.filter(user =>
                user.userName.toLowerCase().includes(search.toLowerCase())
            );
            setUsers(filteredUsers);
        } else {
            setUsers(allUsers);
        }
    }, [search, allUsers]);

    const handleDeleteUser = async (userId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    
        if (isConfirmed) {
            console.log(`Deleting user with ID: ${userId}`);
            try {
                const response = await fetch(`http://localhost:3020/api/deleteUser/admin/${userId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });
                const result = await response.json();
    
                if (result.status) {
                    toast.success(result.message);
                    setUsers(users.filter(user => user._id !== userId));
                    setAllUsers(allUsers.filter(user => user._id !== userId));
                } else {
                    toast.error("Error deleting user");
                }
            } catch (error) {
                toast.error("Error deleting user");
            }
        } else {
            console.log('Deletion canceled');
        }
    };
    
    const renderSkeletons = () => (
        <Box sx={{ width: '100%' }}>
            {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Skeleton variant="text" width="5%" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="15%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="15%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="rectangular" width="15%" height={30} />
                    <Skeleton variant="rectangular" width="5%" height={30} />
                </Box>
            ))}
        </Box>
    );

    return (
        <div className="h-[100vh] overflow-y-scroll">
            <div className="p-4">
                <div className="mb-4">
                    <input
                        type='search'
                        className='mt-10 mb-4 border-2 border-black rounded-lg p-2'
                        placeholder='Search User By Name'
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                {loading ? (
                    renderSkeletons()
                ) : (
                    <table className='table-auto w-full text-center'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th>SNo</th>
                                <th>Profile</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Account Created On</th>
                                <th>Actions</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className='bg-gray-100'>
                                        <td className='pt-4'>{index + 1}.</td>
                                        <td className='pt-4'>
                                            <img
                                                src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                                alt={user.userName}
                                                className='w-10 h-10 rounded-full'
                                            />
                                        </td>
                                        <td className='pt-4'>{user.userName}</td>
                                        <td className='pt-4'>{user.email}</td>
                                        <td className='pt-4'>{user.phone}</td>
                                        <td className='pt-4'>{new Date().toLocaleDateString()}</td>
                                        <td className='pt-4'>
                                            <Link
                                                onClick={() => { setSingleUser(user) }}
                                                to={`/users/userDetail/${user._id}?user=${user}`}
                                                className='btn p-1 bg-green-500 text-white rounded'
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                        <td className='pt-3'>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className='btn p-1 bg-red-500 text-white rounded'
                                            >
                                                <DeleteIcon style={{ fontSize: "24px" }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Users;
