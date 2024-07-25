import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    usersAddedThisMonth:10,
    totalRecordings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
        const response = await fetch('http://localhost:3020/api/dashboard/admin');
        const data = await response.json();

        if (data.status) {
          setStats(data.data);
        } else {
          console.error('Error fetching dashboard data:', data.message);
        }
      } 
 

    fetchDashboardData();
  }, []);

  return (
    <div  className="flex px-2 py-5 gap-5">
      <div style={{color:"#1D5257"}} className="flex-none px-2 py-5 rounded-3xl text-center text-black h-[150px] w-[350px] bg-[#e9f0ec]">
        <h1>Total Users</h1>
        <h1 className="text-2xl mt-5">{stats.totalUsers.toLocaleString()}</h1>
      </div>
      <div style={{color:"#1D5257"}} className="flex-none px-2 py-5 rounded-3xl text-center text-black w-[350px] bg-[#e9f0ec]">
        <h1>Users Added This Month</h1>
        <h1 className="text-2xl mt-5">{stats.usersAddedThisMonth.toLocaleString()}</h1>
      </div>
      <div style={{color:"#1D5257"}} className="flex-none px-2 py-5 rounded-3xl text-center text-black w-[350px] bg-[#e9f0ec]">
        <h1>Total Recordings</h1>
        <h1 className="text-2xl mt-5">{stats.totalRecordings.toLocaleString()}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
