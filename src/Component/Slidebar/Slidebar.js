import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SettingsIcon from '@mui/icons-material/Settings';


function Slidebar() {
  return (
    <>
      <div className="w-[15%] h-[100vh]   bg-[#1D5257]  max-sm:hidden ">
        <div className="flex justify-center mb-4 pt-2">
          <h1 className="pt-1 font-bold text-white text-xl">TranceForm</h1> 
          <img src={`${process.env.PUBLIC_URL}/adminLogo.png`} alt="Admin Logo" className="w-8 h-8 ml-2" />
        </div>
        <Divider className="bg-white" />
        <ul className="text-white ms-2 text-md font-bold">
          <li className="group mt-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 mt-6 rounded transition-all duration-300 ${isActive ? "active text-blue-500" : "group-hover:text-white-500"
                } `
              }
            >
              <DashboardIcon className="mb-2 mr-1" />
              DashBoard
              
            </NavLink>
          </li>
          <li className="group mt-5">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block p-2 mt-6 rounded transition-all duration-300 ${isActive ? "active text-blue-500" : "group-hover:text-blue-500"
                }  `
              }
            >
              <GroupIcon className="mb-1  mr-1" />
              Users
              
            </NavLink>
          </li>
          <li className="group mt-5">
            <NavLink
              to="/recordings"
              className={({ isActive }) =>
                `block p-2 mt-6 rounded transition-all duration-300 ${isActive ? "active text-blue-600" : "group-hover:text-blue-500"
                } `
              }
            >
              <RecordVoiceOverIcon className="mb-2  mr-1" />
              Recordings
              
            </NavLink>
          </li>
          <li className="group mt-5">
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `block p-2 mt-6 rounded transition-all duration-100 ${isActive ? "active text-blue-600" : "group-hover:text-blue-500"
                } `
              }
            >
              <SettingsIcon className="mb-1  mr-1" />
              App Settings
              
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Slidebar;
