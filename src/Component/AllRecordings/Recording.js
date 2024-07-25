import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Recordings() {
    const [recordings, setRecordings] = useState([]);
    const [allRecordings, setAllRecordings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecordings = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3020/api/allRecordings/admin');
                const data = await response.json();

                if (data.status) {
                    setRecordings(data.data);
                    setAllRecordings(data.data);
                } else {
                    console.error('Error fetching recordings:', data.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchRecordings();
    }, []);

    useEffect(() => {
        if (search) {
            const filteredRecordings = allRecordings.filter(recording =>
                recording?.trackName.toLowerCase().includes(search.toLowerCase()) ||
                recording?.userName.toLowerCase().includes(search.toLowerCase())
            );
            setRecordings(filteredRecordings);
        } else {
            setRecordings(allRecordings);
        }
    }, [search, allRecordings]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const deleteRecording = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this recording?');

        if (isConfirmed) {
            console.log(`Deleting recording with ID: ${id}`);
            try {
                const response = await fetch(`http://localhost:3020/api/deleteRecording/admin/${id}`, {
                    method: 'DELETE',
                    headers: { "Content-Type": "application/json" }
                });

                const data = await response.json();
                console.log('Response:', data);

                if (data.status) {
                    setRecordings((prevRecordings) => prevRecordings.filter(recording => recording._id !== id));
                    setAllRecordings((prevRecordings) => prevRecordings.filter(recording => recording._id !== id));
                } else {
                    console.error('Error deleting recording:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Deletion canceled');
        }
    };

    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };

    const renderSkeletons = () => (
        <Box sx={{ width: '100%', padding: 2 }}>
            {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Skeleton variant="text" width="5%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="rectangular" width="10%" height={30} />
                    <Skeleton variant="rectangular" width="10%" height={30} />
                </Box>
            ))}
        </Box>
    );

    return (
        <div className="h-[100vh] overflow-y-scroll">
            <div className="">
                <div className="">
                    <>
                        <div className='search-recording'>
                            <input
                                type='search'
                                className='mt-14 ml-3 sticky top-0 w-[20%] mb-3 border-2 border-black rounded-lg p-2'
                                placeholder='Search Recording or Username '
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className='table-banner'>
                            {loading ? (
                                renderSkeletons()
                            ) : (
                                <table className='table ml-3 table-borderless text-center table-banner w-[98%]'>
                                    <thead className='mb-2 sticky top-0'>
                                        <tr className='bg-gray-200' style={{ height: "55px" }}>
                                            <th>SNo</th>
                                            <th>Recording Name</th>
                                            <th>Created By</th>
                                            <th>Record On</th>
                                            <th>Action</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className='leading-none'>
                                        {recordings.length > 0 ? (
                                            recordings.map((recording, index) => (
                                                <tr key={recording._id} className='bg-gray-100' style={{ height: "35px" }}>
                                                    <td>{index + 1}.</td>
                                                    <td>{truncateString(recording.trackName, 20)}</td>
                                                    <td>{recording.userName}</td>
                                                    <td>{new Date(recording.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <Link to={recording.trackUrl} className='btn p-1' style={{ fontWeight: "bold", borderRadius: "5px" }}>
                                                            <DownloadForOfflineIcon style={{ fontSize: "35px", color: "green" }} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className='btn p-1'
                                                            style={{ fontWeight: "bold", borderRadius: "5px" }}
                                                            onClick={() => deleteRecording(recording._id)}
                                                        >
                                                            <DeleteIcon style={{ fontSize: "35px", color: "red" }} />
                                                        </button>
                                                    </td>
                                                    
                                                </tr>

                                                
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No recordings found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default Recordings;
