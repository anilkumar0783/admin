import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  
  const navigate=useNavigate();

  const handleLogout = () => {
    const confirmLogOut=window.confirm("Are you sure you want to logout");
    if(confirmLogOut){
      localStorage.removeItem("adminId");
    localStorage.removeItem("token");
    localStorage.removeItem("loginStatus");
    navigate('/login');
    }
    
  };
    
    return ( 
        <>
        <div className="flex justify-between items-center text-black text-xl px-2 bg-[#d7dbd9] py-2">
          <div>
            <h1 style={{color:"#1D5257"}}>Hello Admin
<WavingHandIcon style={{color:"#1D5257"}} className="ml-3 mb-2"/>
            </h1>
          </div>
          <div className='text-black mr-2'>
          <NavLink
          style={{color:"#1D5257"}}
              to="/profile"
            >
             <AccountCircleIcon className='cursor-pointer' style={{fontSize:"40px"}}/>
              
            </NavLink>
            <NavLink
            style={{color:"#1D5257"}}
              to="#"
              onClick={handleLogout}
            >
              <LogoutIcon className='ml-4 cursor-pointer' style={{fontSize:"35px"}}/>
              
            </NavLink>
            
          
          </div>
        </div>
        </>
     );
}

export default NavBar;