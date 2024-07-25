import { useParams } from "react-router-dom";
import NavBar from "../../Component/Slidebar/Navbar";
import Slidebar from "../../Component/Slidebar/Slidebar";
import ViewUserDetail from "../../Component/UserDetail/ViewUserDetail";
import { useContext } from "react";
import { LoginContext } from "../../LoginContext";

function ViewUser() {
    const {singleUser,setSingleUser} =useContext(LoginContext)
    console.log(singleUser)
    // console.log(user)
    return (
        <>
            <div className=" flex w-[100%]  ">
                <Slidebar />
                <div className="w-[85%] ">
                    <ViewUserDetail user={singleUser}/>
                </div>

            </div>
        </>

    );
}

export default ViewUser;