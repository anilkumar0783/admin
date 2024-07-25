import { BrowserRouter as Router ,Route ,Routes } from "react-router-dom"
import './App.css';
import DashBoard from "./Pages/Home/Home";
import Slidebar from "./Component/Slidebar/Slidebar";
import AllUsers from "./Pages/Users/AllUsers";
import AllRecording from "./Pages/Recordings/AllRecording";
import ViewUser from "./Pages/Users/ViewUser";
import AppSetting from "./Pages/AppSetting/AppSetting";
import AdminProfile from "./Pages/AdminProfile/Profile";
import AdminLogin from "./Pages/LoginPage/Login";
import { LoginContext } from "./LoginContext";
import { useState } from "react";
import Protected from "./Protected";

function App() {
  const [singleUser,setSingleUser]=useState({})
  return (
    <>
    <LoginContext.Provider value={{singleUser,setSingleUser}}>
    <Router>
  <Routes>
    <Route path="/" element={<Protected Component={DashBoard}/>}></Route>
    <Route path="/users" element={<Protected Component={AllUsers}/>}></Route>
    <Route path="/users/userDetail/:userId/" element={<Protected Component={ViewUser}/>}></Route>
    <Route path="/recordings" element={<Protected Component={AllRecording}/>}></Route>
    <Route path="/setting" element={<Protected Component={AppSetting}/>}></Route>
    <Route path="/profile" element={<Protected Component={AdminProfile}/>}></Route>
    <Route path="/login" element={<Protected Component={AdminLogin}/>}></Route>
  </Routes>
</Router>
    </LoginContext.Provider>

    </>
  );
}

export default App;
