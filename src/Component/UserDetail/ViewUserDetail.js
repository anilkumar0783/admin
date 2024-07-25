import React, { useEffect, useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import ControlledAccordions from './Accordian';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import moment from "moment";

function ViewUserDetail(props) {
    const [singleUser, setSingleUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setSingleUser(props.user);
    }, [props.user]);

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <>
            <div className='text-xl mt-2 underline cursor-pointer' onClick={handleBackClick}>
                <ArrowBackIcon />
                Back
            </div>
            <div className='px-10 mt-14'>
                <div>
                    <h1 className='font-bold text-2xl'>User Detail <InfoOutlinedIcon style={{ fontSize: "25px", marginBottom: "6px", marginLeft: "5px" }} /> </h1>
                </div>
                <div className='flex py-4 gap-20 items-center'>
                    <div>
                        <img className='w-[150px] h-[150px] rounded-full' src={singleUser.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile" />
                    </div>
                    <div>
                        <h1 className='font-bold text-xl'>{singleUser.firstName} {singleUser.lastName}</h1>
                        <h1>{singleUser.userName}</h1>
                    </div>
                </div>
                <div className='flex gap-80'>
                    <div className='space-y-5'>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500'>First Name</h1>
                            <h1>{singleUser.firstName}</h1>
                        </div>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500'>Last Name</h1>
                            <h1>{singleUser.lastName}</h1>
                        </div>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500'>Username</h1>
                            <h1>{singleUser.userName}</h1>
                        </div>
                    </div>
                    <div className='space-y-5'>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500 text-start'>Mobile</h1>
                            <h1>{singleUser.phone}</h1>
                        </div>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500'>Gmail</h1>
                            <h1>{singleUser.email}</h1>
                        </div>
                        <div className='flex gap-20'>
                            <h1 className='text-gray-500'>Joined On</h1>
                            <h1>{moment(new Date()).format("MMMM Do YYYY")}</h1>
                        </div>
                    </div>
                </div>
                <div className='mt-10 w-full flex gap-10'>
                    <div className='w-1/2 overflow-y-scroll h-[230px]'>
                        <ControlledAccordions name="Recording" data={singleUser.tracks} />
                    </div>
                    <div className='w-1/2 overflow-y-scroll h-[230px]'>
                        <ControlledAccordions
                            name="Connection"
                            data={singleUser.connections} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewUserDetail;
